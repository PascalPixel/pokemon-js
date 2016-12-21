import React from 'react'

const WindowItems = (props) => {
  if (props.visibility) {
    return (
      <div className='window item'>
        {props.items.map((item) => {
          return (
            <div
              key={item.name}
              className='button'
              onClick={() => {
                props.use(item)
                props.reframe({ items: false })
              }}>
              <span>
                {item.name}x
              </span>
              <span className='potionCount'>
                {item.amount}
              </span>
            </div>
          )
        })}
        <div
          className='button'
          onClick={() => props.reframe({ items: false })}>
          cancel
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default WindowItems
