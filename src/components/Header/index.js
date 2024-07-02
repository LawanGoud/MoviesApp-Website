import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import './index.css'

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="logo">
          <Link to="/" testid="logo">
            <img
              src="https://res.cloudinary.com/db3erodfw/image/upload/v1719690749/Group_7399_qb6dk6.png"
              alt="website logo"
            />
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/" testid="home-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/popular" testid="popular-link">
                Popular
              </Link>
            </li>
          </ul>
          <div className="user-container">
            <div>
              <Link to="/search" testid="search-link">
                <FaSearch className="search-icon" />
              </Link>
            </div>
            <div>
              <Link to="/account" testid="account-link">
                Account
              </Link>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
