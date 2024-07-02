import {Component} from 'react'
// import Cookies from 'js-cookie'

import './index.css'

class Account extends Component {
  handleLogout = () => {
    // Cookies.remove('jwt_token')
    // this.props.history.push('/login')
  }

  render() {
    const username = 'testuser' // Retrieve username from login

    return (
      <div className="account-container">
        <h2>Welcome, {username}</h2>
        <p>Your account details:</p>
        <div className="account-details">
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Password:</strong> ********
          </p>{' '}
          {/* Display masked password */}
        </div>
        <button onClick={this.handleLogout} alt="button" type="button">
          Logout
        </button>
      </div>
    )
  }
}

export default Account
