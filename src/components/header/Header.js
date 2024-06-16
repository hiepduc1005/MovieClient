import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcaseClock, faClock, faClockFour, faClockRotateLeft, faFilm, faGlobe, faSearch, faUser, faUserAlt, faUserAltSlash, faUserCircle, faUserClock } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
const Header = () => {

    useEffect(() => {
        const handleScroll = () => {
            let headerContainer = document.querySelector('.header-container');
            if (headerContainer) {
                console.log(window.scrollY)
                if (window.scrollY > 120) {
                    headerContainer.style.backgroundColor = "rgb(10, 12, 15)";
                } else {
                    headerContainer.style.backgroundColor = "transparent";
                }
            }
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <div className='header-container' >
        <div className='header-left-container'>
            <div className='header-logo'>
                <div>
                    <FontAwesomeIcon style={{height:"30px"}} icon={faFilm}/>
                </div>
                
                <span className='header-logo-title'>HMovie</span> 
            </div>
            <NavLink className='header-home' to="/">Trang chủ</NavLink>
            <div className='header-genres'>
                <span className='header-genres-title'>Thể loại</span>
                <span className='arrow'></span>
                <span className='arrow-green'></span>
                <div className='box genre-box'>
                    <div className='genre-box-item'>Drama</div>
                    <div className='genre-box-item'>Action</div>
                    <div className='genre-box-item'>Anime</div>
                    <div className='genre-box-item'>Comedy</div>
                    <div className='genre-box-item'>Romance</div>
                </div>
            </div>
        </div>
        <div className='header-right-container'>
            <div className='header-search'>
                <div className='header-search-warp'>
                    <input placeholder='Nhập để tìm...' className='header-search-input'></input>
                </div>
                <span className='line'></span>
                <FontAwesomeIcon className='search-icon' style={{padding:"0 14px" , height: "20px" , color: "white"}} icon={faSearch}></FontAwesomeIcon>
            </div>
            <div className='header-history'>
                <span className='header-history-title'>History</span>
                <FontAwesomeIcon className="header-history-icon" icon={faClock} />
                <div className='box history-box'>
                    <div className='history-box-item'>
                        <div className='history-box-item-title'>Bạn phải đăng nhập để có thể lưu trữ lịch sử xem.</div>
                        <div className='history-box-item-button'>
                            <button>
                            Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='header-language'>
                <span className='header-language-title'>Language</span>
                <FontAwesomeIcon className='header-language-icon' icon={faGlobe}/>
                <div className='box language-box'>
                    <div className='language-box-item'>Tiếng Việt</div>
                    <div className='language-box-item'>English</div>
                </div>
            </div>
            <div className='header-account'>
                <span className='header-account-title'>Me</span>
                <FontAwesomeIcon className='header-account-icon' icon={faUserAlt}/>
                <div className='account-box box'>
                    <div className="account-box-item">
                        <div className='account-box-item-title'>Đăng nhập để theo dõi các nội dung mới nhất.</div>
                        <div className='account-box-item-button'>
                            <button>
                                Login
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header