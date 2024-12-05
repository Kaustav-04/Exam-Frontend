import React from 'react'
import Header from './Header'
import Overveiw from './Overveiw'

const Results = () => {
  return (
    <div className='overflow-hidden h-screen w-screen flex bg-[#fbfbfc] overflow-y-scroll'>
      <Header/>
      <Overveiw/>
    </div>
  )
}

export default Results