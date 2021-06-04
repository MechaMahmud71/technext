import React, { useState } from 'react'
import Message from "./Message";
const Test = () => {
  const [isOpen,setIsOpen]=useState(false);
  return (
    <div>
      <button onClick={()=>{setIsOpen(prevState=>!prevState)}}>button</button>
      {isOpen}
      <Message value={isOpen}/>
    </div>
  )
}

export default Test
