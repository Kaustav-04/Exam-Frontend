import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../../components/Button';
import {Link} from 'react-router-dom'

const ShareCode = () => {
    const id = useSelector((state) => state.exampaper.id);
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen'>
        <h2 className='text-5xl font-medium mb-6'>Your Exam Id is:</h2>
        <h2 className='text-4xl text-red-600 font-extrabold font-chimono'>{id}</h2>
        <Link to='/'><Button className="mx-5 sm:mx-0">Back to Main Page</Button></Link>
    </div>
  )
}

export default ShareCode