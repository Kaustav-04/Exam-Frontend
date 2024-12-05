import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { modalActions } from "../Store";
import { motion } from "framer-motion";

const Header = () => {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(modalActions.loginopen());
  };
  return (
    <header className='h-[60px] w-screen pt-5 pr-3 pl-4 bg-white px-20'>
      <nav className='flex justify-between items-center'>
        <div className='text-2xl font-chimono text-[#3C4852]'>DEPARTMENT OF IT</div>
        <motion.div
          initial={{ backgroundColor: "#ffffff" }}
          whileHover={{ backgroundColor: "#3c485247" }}
          className='text-2xl font-chimono text-[#3C4852] p-1 h-8 flex justify-center items-center w-8 rounded-full overflow-hidden'
        >
          <div className=''><FontAwesomeIcon icon={faUser} onClick={openModal} /></div>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
