import React from 'react'

const WindowMessages = (props) => {
  if (props.visibility) {
    return (
      <div className='window texts'>
        <div className='text text1'>
          {props.lines.top}
        </div>
        <div className='text text2'>
          {props.lines.bottom}
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default WindowMessages
