
import React, { useState } from 'react'

const login = ({onLogin}) => {
  let handleClick = () => {
    onLogin();
  }
  return (
    <>
    <button className="btn btn-google" onClick={handleClick}>
        Continue with Google
      </button>
    </>
  )
}

export default login
