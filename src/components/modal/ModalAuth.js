import React, { useEffect } from 'react'
import './ModalAuth.css'
import google  from '../../assert/img/google_icon-icons.com_62736.png';
import facebook from '../../assert/img/5293-facebook_102565.png'
import background from '../../assert/img/login-background.jpg'
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const ModalAuth = () => {
    const token = Cookies.get('token');
    const navigate = useNavigate()
    const handleLoginGoogle = () => {
        window.location.href = 'https://movie-server-v2.onrender.com/oauth2/authorization/google';
                // window.location.href = 'http://localhost:8080/oauth2/authorization/google';

    };
    
    useEffect(() => {
      if(token){
        navigate('/')
      }
    },[token])
  return (
    
   

    <div className='modal-login-container'>
    <img alt='' src={background} className='img-wrap'></img>
    <div class="form-wrapper">
        <h2>Sign In</h2>
        <form action="#">
            <div class="form-control">
                <input type="text" required/>
                <label>Email or phone number</label>
            </div>
            <div class="form-control">
                <input type="password" required/>
                <label>Password</label>
            </div>
            <button type="submit">Sign In</button>
            <div class="form-help"> 
                <a href="http://localhost:3000/login">Need help?</a>
            </div>
            <h3 className='or'>OR</h3>
            <button onClick={() => handleLoginGoogle()} className='btn-google' type="button">
            <img alt='' className='icon-google' src={google}></img>
              Sign in with Google
            </button>

            <button className='btn-facebook' type="button">
            <img alt='' className='icon-facebook' src={facebook}></img>
              Sign in with Facebook
            </button>
        </form>
        <p>New to Hmovie? <a href="http://localhost:3000/login">Sign up now</a></p>
        <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. 
            <a href="http://localhost:3000/login">Learn more.</a>
        </small>
    </div>
    </div>
  )
}


export default ModalAuth