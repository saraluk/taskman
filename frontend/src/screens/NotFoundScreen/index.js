import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundScreen = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to="/" exact style={{ color: 'black',  textDecoration: 'underline'}}>Go to Dashboard</Link>
    </div>
  )
}

export default NotFoundScreen
