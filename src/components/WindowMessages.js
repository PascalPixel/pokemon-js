import React from 'react'

const WindowMessages = (props) => {
  if (props.visibility) {
    return (
      <div className='window texts'>
        {props.lines}
      </div>
    )
  } else {
    return null
  }
}

export default WindowMessages
