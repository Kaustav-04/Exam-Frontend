import React, { useRef, useState } from "react";
import Options from "./Options";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown, message, Modal, Slider } from "antd";
import { deleteQuestionForExam } from "../../Utils/api";
import { useDispatch } from "react-redux";
import { questionActions } from "../../Store";

const Questions = (props) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const optionRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [editedV, setEditedV] = useState({
    marks: props.marks,
    negative: props.negative,
    answer: props.answer
  })
  const [qval, setQVal] = useState(props.Qtext);
  const deleteQ = async () => {
    const msg = await deleteQuestionForExam({ question_id: props.Qid });
    if (msg.error) {
      message.error(msg.error);
    } else {
      message.success(msg.message);
      props.reload();
    }
  };
  return (
    <div className="bg-[#F1F3F6] rounded-2xl w-full h-auto p-5 mb-5 relative">
      <div className="flex justify-end items-center mb-2">
        <Dropdown
          menu={{
            items: edit
              ? [
                  {
                    key: "1",
                    label: <span onClick={()=>setOpenModal(true)}>Change Markings</span>,
                  },

                  { key: "2", label: <span>Save</span> },
                ]
              : [
                  {
                    key: "1",
                    label: <MdOutlineEdit onClick={() => setEdit(true)} />,
                  },
                  { key: "2", label: <MdDeleteOutline onClick={deleteQ} /> },
                ],
            selectable: true,
          }}
        >
          <BsThreeDotsVertical />
        </Dropdown>
      </div>
      <div className="flex justify-between items-center">
        <div className="font-normal text-3xl mb-3">Question {props.Qnum}</div>
        <div className="font-normal text-[#7F8086] text-xl mb-3">{`+${props.marks}, -${props.negative}`}</div>
      </div>
      <div className="bg-white text-left rounded-2xl text-2xl p-4  text-[#7F8086]">
        {edit ? (
          <input
            className="h-[40px] border-none text-lg bg-transparent w-[70%] mt-3 focus:outline-none placeholder:text-[#828384]"
            type="text"
            value={qval}
            onChange={(e) => setQVal(e.target.value)}
            placeholder={`Type Question Here`}
          />
        ) : (
          props.Qtext
        )}
      </div>
      <div className="">
        {props.options.map((option, index) => (
          <Options
            Onum={index + 1}
            Otext={option.option}
            correctAnswer={props.correctAnswer}
            edit={edit}
          />
        ))}
        {edit && (
          <div>
            <label>Option {props.options.length + 1} </label>
            <input
              className="h-[40px] border-none text-lg bg-transparent w-[70%] mt-3 focus:outline-none placeholder:text-[#828384]"
              type="text"
              ref={optionRef}
              placeholder={`Type Option ${props.options.length + 1} Here`}
            />
            <button
              className="font-bold text-2xl p-3 my-5 border-none text-[#4C84EA] bg-[#EAF0FD] rounded-md w-full"
              onClick={() => {
                if (optionRef.current.value.trim() === "") return;
                else {
                  dispatch(
                    questionActions.addOption({
                      Qindex: props.Qnum - 1,
                      option: { option: optionRef.current.value },
                    })
                  );
                  optionRef.current.value = "";
                }
              }}
            >
              Add Option
            </button>
          </div>
        )}
      </div>
      <Modal
        title="20px to Top"
        style={{
          top: 20,
        }}
        open={openModal}
        footer={null}
        onCancel={() => setOpenModal(false)}
      >
        <label>{`Correct Marks: +${editedV.marks}`}</label>
        <Slider defaultValue={props.marks} max={10} min={1} onChange={(e)=>setEditedV((prev) => {const n = prev; n.marks = e; return n;})} />
        <br/>
        <label>{`Negative Marks: -${editedV.negative}`}</label>
        <Slider defaultValue={props.negative} max={10} min={0} onChange={(e)=>setEditedV((prev) => {const n = prev; n.negative = e; return n;})}/>
      </Modal>
    </div>
  );
};

export default Questions;
