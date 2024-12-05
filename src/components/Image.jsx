import React from 'react'
import IEMLogo from '../../Images/IEMLogo.png'

function Image(props) {
  return (
    <img src={IEMLogo} style={{...props.style}} alt='IEM' className={props.className}/>
  )
}

export default Image