import React from 'react'
import './Footer.css'
const Footer = () => {

  return (
    <footer className='footer-container' id='footer'>
        <div className='footer-list'>
            <div className='item'>
                <h3 className='item-title'>About HMovie</h3>
                <ul className='sub-items'>
                    <li>About us</li>
                    <li>Products and Services</li>
                    <li>Way to Watchs</li>
                    <li>Investors Relation</li>
                </ul>
            </div>
            <div className='item'>
                <h3 className='item-title'>Cooperation</h3>
                <ul className='sub-items'>
                    <li>Advertise</li>
                    <li>Corporate relations</li>
                    <li>Preinstall Corporate</li>
                </ul>
            </div>
            <div className='item'>
                <h3 className='item-title'>Help and support</h3>
                <ul className='sub-items'>
                    <li>Feedback</li>
                    <li>Security Response Center</li>
                    <li>FAQ</li>
                </ul>
            </div>
            <div className='item'>
                <h3 className='item-title'>Terms of Service</h3>
                <ul className='sub-items'>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                </ul>
            </div>

        </div>
        <div className='copy-right'>
            <div className='item'>Copyright © 2024 Hmovie All Rights Reserved</div>
            <div className='item'>We use cookies to improve your experience on this site. By continuing to use our website, you agree to our use of cookies. Learn more <a>Hmovie Privacy Policy</a></div>
        </div>
    </footer>
  )
}

export default Footer