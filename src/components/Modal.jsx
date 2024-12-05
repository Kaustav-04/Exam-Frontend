import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { modalActions } from "../Store";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const Modal = (props) => {
  const dispatch = useDispatch();
  const closeModal = (e) => {
    e.stopPropagation();
    dispatch(modalActions.loginclose());
  };
  const open = useSelector((state) => state.modal.loginopen);
  return (
    <div
      className="h-screen w-screen bg-[#00000060] flex items-center justify-center z-20 absolute top-0 left-0"
      onClick={closeModal}
    >
      <motion.div
        initial={{ x: open ? "35vw" : "0vw" }}
        onClick={(e) => e.stopPropagation()}
        animate={{ x: open ? "0vw" : "35vw" }}
        transition={{ duration: 0.7 }}
        className="absolute top-0 right-0 w-full md:w-1/3 h-screen bg-white pl-4 z-40 rounded-tl-md rounded-bl-md"
        id="mainModal"
      >
        <div className='text-[2rem] mt-4 mb-3 text-[#3c4852]'>
          <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
        </div>
        {props.children}
      </motion.div>
    </div>
  );
};

export default Modal;
