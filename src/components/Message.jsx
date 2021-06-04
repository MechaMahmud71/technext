import React from 'react'

const Message = ({value}) => {
  return (
    <div>
      {value?"hi":"bye"}    
    </div>
  )
}

export default Message
