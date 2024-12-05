import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerActions, qChangerActions } from "../../Store";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as hollow } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Options = (props) => {
  const id = `option${props.optionNumber}`;
  const dispatch = useDispatch();
  const [color, setColor] = useState("#404c56");
  const [icon, setIcon] = useState(hollow);
  const sectionList = useSelector((state) => state.paper.paper);
  const ans = useSelector((state) => state.answer.answer);
  const start = useSelector((state) => state.qChanger.start);

  useEffect(() => {
    if (ans[props.Qno]?.ans === props.index) {
      setColor("#08BD80");
      setIcon(faCircle);
    } else {
      setColor("#404c56");
      setIcon(hollow);
    }
  }, [start]);

  return (
    <button
      id={id}
      className="text-2xl m-1 mb-3 shadow-xl border-none  rounded-xl bg-white w-fit h-fit p-3 flex items-center"
      onClick={() => {
        dispatch(
          answerActions.add({
            Qid: props.questionId,
            Qno: props.Qno,
            ans: props.index,
            type: "A",
          })
        );
        dispatch(qChangerActions.toggleStart());
        // const item = localStorage.getItem("answerArray");
        // const answerArray = JSON.parse(item);
        // if (!Object.keys(answerArray).includes(sec)) {
        //   answerArray[sec] = [];
        // }
        // answerArray[sec][props.questionId] = props.index;
        // localStorage.setItem("answerArray", JSON.stringify(answerArray));
      }}
    >
      <span className="mr-3 text-base">
        <FontAwesomeIcon
          style={{
            color: color,
          }}
          icon={icon}
        />
      </span>
      <span className="text-2xl">{`${props.optionDetails}`}</span>
    </button>
  );
};

export default Options;
