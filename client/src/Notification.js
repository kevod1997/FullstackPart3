import React from 'react'

function Notification({message, errorMessage}) {
    if (message === null) {
        return null
      }
  return (
    <>
    <h2 style={{color: 'green', border: '2px solid green', padding: '5px' }}>
        {message}
    </h2>
    </>
  )
}

export default Notification