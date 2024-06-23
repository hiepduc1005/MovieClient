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
    </footer>
  )
}

export default Footer