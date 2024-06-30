import React from 'react'
import './ModalAuth.css'

const ModalAuth = () => {
    const handleLogin = () => {
        // Thực hiện đăng nhập bằng OAuth2
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };
  return (
    
    <div className='modal-auth-container'>
        <h1>My App</h1>
        <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  )
}

export default ModalAuth