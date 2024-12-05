import React from "react";
import { motion } from "framer-motion";

function Button(props) {
  return (
    <motion.button
      initial={{ y: 0 }}
      whileHover={{ y: -5 }}
      type={props.type}
      onClick={props.onClick}
      style={{ ...props.style }}
      className={`bg-[#08BD80] text-white border-none  px-4 py-4 text-lg  md:text-2xl rounded-xl relative ${props.className}`}
      id={props.id}
      disabled={props.disabled}
    >
      {props.children}
    </motion.button>
  );
}

export default Button;
