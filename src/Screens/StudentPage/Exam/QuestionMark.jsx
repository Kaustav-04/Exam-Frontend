import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { qChangerActions } from "../../../Store/index";

const QuestionMark = (props) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState("#404c56");
  const [bg, setBg] = useState("");
  const [marked, setMarked] = useState(false);
  const start = useSelector((state) => state.qChanger.start);
  useEffect(() => {
    if (props.answered) {
      setColor("#12bf86");
      setBg("#e6f8f2");
    } else {
      setColor("#404c56");
      setBg("");
    }

    if (props.marked) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  }, [start]);

  return (
    <div
      onClick={() => {
        dispatch(qChangerActions.setQ(props.id));
        dispatch(qChangerActions.toggleStart());
      }}
      className="p-5 m-3 text-2xl h-7 w-7 border-2 border-[#3c485291] text-[#404c56] flex justify-center items-center rounded-lg relative"
      style={{
        color: color,
        backgroundColor: bg,
      }}
    >
      {props.num}
      {marked && (
        <FontAwesomeIcon
          style={{
            color: "#ffad3b",
            position: "absolute",
            bottom: "-10px",
            right: "-7px",
            fontSize: "1.1rem",
          }}
          icon={faBookmark}
        />
      )}
    </div>
  );
};

export default QuestionMark;
