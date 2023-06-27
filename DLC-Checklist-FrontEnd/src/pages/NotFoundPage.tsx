import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {

  const navigate = useNavigate()

  const goToLogInPage = () => {
    navigate('/')
  }
  return(
    <div><h1>Session Time Expired</h1><button onClick={goToLogInPage}>Log In Again</button></div>
  )
}

export default NotFoundPage
