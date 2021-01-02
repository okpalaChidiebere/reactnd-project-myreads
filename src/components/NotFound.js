import React from 'react'
import { Link } from 'react-router-dom'

class NotFound extends React.PureComponent {
  render() {
    return (
        <div>
            <h1>Sorry, we can’t find the page you were looking for.</h1>
            <Link to="/">Return home and try again</Link>
        </div>
    )
  }
}

export default NotFound