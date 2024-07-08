import React, { useEffect, useRef, useState } from 'react'
import './SideBar.css'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router'
import userDefault from '../../assert/img/user.png'

const SideBar = ({user,showSideBar,setShowSideBar}) => {
    const navigate = useNavigate()
    const sideBarRef = useRef(null)
    const menuSideBarRef = useRef(null)
    const [showAbout,setShowAbout] = useState(false)
    const [showHelp,setShowHelp] = useState(false)
    const [showPolicy,setShowPolicy] = useState(false)

    const handleClickAboutContent = (e) => {
        e.stopPropagation();
        setShowAbout(!showAbout)
    }

    const handleClickHelpContent = (e) => {
        e.stopPropagation();
        setShowHelp(!showHelp)
    }

    const handleClickPolicyContent = (e) => {
        e.stopPropagation();
        setShowPolicy(!showPolicy)
    }

    useEffect(() =>{
        if(showSideBar){
            document.body.classList.add('no-scroll');
        }
        else{
            document.body.classList.remove('no-scroll');
        }
    },[showSideBar])
    
  return (
    <div ref={sideBarRef} className={`header-sidebar ${showSideBar ? 'show-sidebar' : ''}`} onClick={() => setShowSideBar(false)}>
        <div className='header-sidebar-container' ref={menuSideBarRef}>
            <div className='account-sidebar-header'>
                <div    className='avatar'>
                    <img alt='' src={user?.avatarUrl ? user?.avatarUrl : userDefault}></img>
                </div>
                <div className='username'>{user ? user?.username : 'Login/SignUp'}</div>
            </div>
            <div className='account-sidebar-body'>
                <div 
                    className={`account-sidebar-body-item`}
                    onClick={() => {user ? navigate('/account') : navigator('/login')}}
                >My Account</div>
                <div className='horizone-line margin-zero'></div>
                <div 
                    className={`account-sidebar-body-item`}
                    onClick={() => {user ? navigate('/account?s=history') : navigator('/login')}}
                >History</div>
                <div
                    className={`account-sidebar-body-item`}
                    onClick={() => {user ? navigate('/account?s=watchlater') : navigator('/login')}}
                >WatchLater</div>
                <div className='about-sidebar-body-item' onClick={(e) => handleClickAboutContent(e)}>
                    <div className='title'>About Hmovie</div>
                    {
                    showAbout 
                        ? 
                        <FontAwesomeIcon className='icon' icon={faAngleDown}></FontAwesomeIcon>
                        :
                        <FontAwesomeIcon className='icon' icon={faAngleUp}></FontAwesomeIcon>
                    }
                </div>
                <div className={`about-sidebar-content ${showAbout ? 'show-content-sidebar' : ''}`}>
                    <div className='item'>About us</div>
                    <div className='item'>Products and Services</div>
                    <div className='item'>Ways to Watch</div>
                    <div className='item'>Invertor Relations</div>
                </div>
                <div className='help-sidebar-body-item' onClick={(e) => handleClickHelpContent(e)}>
                    <div className='title'>Help and support</div>
                    {
                    showHelp 
                        ? 
                        <FontAwesomeIcon className='icon' icon={faAngleDown}></FontAwesomeIcon>
                        :
                        <FontAwesomeIcon className='icon' icon={faAngleUp}></FontAwesomeIcon>
                    }                
                </div>
                <div className={`help-sidebar-content ${showHelp ? 'show-content-sidebar' : ''}`}>
                    <div className='item'>Feedback</div>
                    <div className='item'>Security Response Center</div>
                    <div className='item'>FAQ</div>
                </div>
                <div className='termofservice-sidebar-body-item' onClick={(e) => handleClickPolicyContent(e)}>
                    <div className='title'>Terms of Service</div>
                    {
                    showPolicy 
                        ? 
                        <FontAwesomeIcon className='icon' icon={faAngleDown}></FontAwesomeIcon>
                        :
                        <FontAwesomeIcon className='icon' icon={faAngleUp}></FontAwesomeIcon>
                    }               
                </div>
                <div className={`termofservice-sidebar-content ${showPolicy ? 'show-content-sidebar' : ''}`}>
                    <div className='item'>Privacy Policy</div>
                    <div className='item'>Terms of Service</div>
                </div>
                <div className='horizone-line margin-zero'></div>
                        
            </div>
            <div className='account-sidebar-bottom'>
                <div className='account-sidebar-body-item'>Logout</div>
            </div>
        </div>
    </div>
  )
}

export default SideBar