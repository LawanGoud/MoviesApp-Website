import {Component} from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="social-icons">
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            testid="google-icon"
          >
            <FaGoogle className="icon" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            testid="twitter-icon"
          >
            <FaTwitter className="icon" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            testid="instagram-icon"
          >
            <FaInstagram className="icon" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            testid="youtube-icon"
          >
            <FaYoutube className="icon" />
          </a>
        </div>
        <p>Contact Us</p>
      </footer>
    )
  }
}

export default Footer
