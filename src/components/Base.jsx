import React, { Fragment } from "react";
import Header from "./Header";

function Base(props) {
  return (
    <Fragment>
      <Header />
      {/* <main className={classes.Base}>{props.children}</div> */}
      <div className='flex items-center justify-center h-screen w-screen overflow-hidden '>{props.children}</div>
    </Fragment>
  );
}

export default Base;
