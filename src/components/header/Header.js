import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faArrowDownShortWide, faBriefcaseClock, faClock, faClockFour, faClockRotateLeft, faDoorClosed, faDoorOpen, faDropletSlash, faFilm, faGlobe, faSearch, faSignOut, faSignOutAlt, faUser, faUserAlt, faUserAltSlash, faUserCircle, faUserClock } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'
import Cookies from 'js-cookie'

const Header = ({ user }) => {
    const [isHovered, setIsHovered] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const [moviesHistory, setMoviesHistory] = useState([])
    const [query,setQuery] = useState('')

    let currentPath = location.pathname

    const handleLogout = () => {
        Cookies.remove("token")

        window.location.href='http://localhost:3000'
    }

    const fetchMovieHistory = () => {
        if (user) {
            const episode = user?.watchHistoryResponses
            if (episode) {
                const data = episode.map(ep => ({
                    movieId: ep?.movieHistoryResponse?.id,
                    movieTitle: ep?.movieHistoryResponse?.title,
                    episodeNumber: ep?.episodeNumber,
                    backDropUrl: ep?.movieHistoryResponse?.backDropUrl,
                    slug: ep?.movieHistoryResponse?.slug
                }))?.slice(-4);
                setMoviesHistory(data)
            }
        } else {
            let watchHistoryJson = localStorage.getItem("watchHistory");
            let watchHistory = watchHistoryJson ? JSON.parse(watchHistoryJson) : []
            setMoviesHistory(Array.isArray(watchHistory) ? watchHistory : [])
        }
    }

    useEffect(() => {
        fetchMovieHistory()
        setQuery('')
    }, [currentPath,user])

    useEffect(() => {
        const handleScroll = () => {
            let headerContainer = document.querySelector('.header-container');
            if (headerContainer) {
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
        <div className='header-container'>
            <div className='header-left-container'>
                <NavLink className='header-logo' to="/">
                    <div>
                        <FontAwesomeIcon style={{ height: "30px" }} icon={faFilm} />
                    </div>
                    <span className='header-logo-title'>HMovie</span>
                </NavLink>
                <NavLink className='header-home' to="/">Trang chủ</NavLink>
                <div className='header-genres'>
                    <span className='header-genres-title'>Thể loại</span>
                    <span className='arrow'></span>
                    <span className='arrow-green'></span>
                    <div className='box genre-box'>
                        <a href='/drama' className='genre-box-item'>Drama</a>
                        <a href='/action' className='genre-box-item' >Action</a>
                        <a href='/anime' className='genre-box-item'>Anime</a>
                        <a href='/comedy' className='genre-box-item'>Comedy</a>
                        <a href='/romance' className='genre-box-item'>Romance</a>
                    </div>
                </div>
            </div>
            <div className='header-right-container'>
                <div className='header-search'>
                    <form className='header-search-warp' onSubmit={(e) => {e.preventDefault(); navigate(`/search?s=${query}`)}}>
                        <input 
                            type='text'
                            placeholder='Nhập để tìm...' 
                            className='header-search-input'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            >   
                        </input>
                    </form>
                    <span className='line'></span>
                    <div className='icon-search-container' onClick={() => navigate(`/search?s=${query}`)}>
                        <FontAwesomeIcon 
                            className='search-icon'
                            style={{ padding: "0 14px", height: "20px", color: "white" }}
                            icon={faSearch}>
                            
                        </FontAwesomeIcon>
                    </div>
                </div>
                <div className='header-history'>
                    <span className='header-history-title'>History</span>
                    <FontAwesomeIcon className="header-history-icon" icon={faClock} />
                    <div className='box history-box'>
                        {
                            Array.isArray(moviesHistory) && moviesHistory.length === 0
                                ?
                                (<div className='empty-history'>Your watch history is empty. Start watching your favorite movies now!</div>)
                                : (
                                    moviesHistory?.map((movie) => {
                                        return (
                                            <div className='history-box-item' key={`movieHistoryBox${movie.movieId}`}>
                                                <div className='img-container'>
                                                    <img src={movie?.backDropUrl} alt={movie?.movieTitle}></img>
                                                </div>
                                                <div className='info-container'>
                                                    <div className='title'>{movie?.movieTitle}</div>
                                                    <div className='episode-number'>Watched Up to Ep {movie?.episodeNumber}</div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )
                        }
                        {(moviesHistory.length === 4 && user)
                            ?
                            <div className='history-box-footer'>
                                <span>More
                                    <FontAwesomeIcon className='more-icon' icon={faAngleRight}></FontAwesomeIcon>
                                </span>
                            </div>
                            : ''
                        }
                        {(moviesHistory.length === 4 && !user)
                            ?
                            <div className='history-box-footer-unauth'>
                                <span className='title'>Sign in to store a more extensive movie watch history.</span>
                            </div>
                            : ''
                        }
                    </div>
                </div>
                <div className='header-language'>
                    <span className='header-language-title'>Language</span>
                    <FontAwesomeIcon className='header-language-icon' icon={faGlobe} />
                    <div className='box language-box'>
                        <div className='language-box-item'>Tiếng Việt</div>
                        <div className='language-box-item'>English</div>
                    </div>
                </div>
                <div className='header-account'>
                    {user ?
                        <div className='header-account-icon' onClick={() => navigate('/account')}>
                            <img src={user?.avatarUrl} alt="User Avatar"></img>
                        </div>
                        :
                        <>
                            <span className='header-account-title'>Me</span>
                            <FontAwesomeIcon className='header-account-icon' icon={faUserAlt} />
                        </>
                    }
                    <div className='account-box box'>
                        {user ?
                            <>
                                <div className='account-box-header'>
                                    <div className='img-container'>
                                        <img src={user?.avatarUrl} alt="User Avatar"></img>
                                    </div>
                                    <div className='username'>{user?.username}</div>
                                </div>
                                <div
                                    className='account-box-item-auth'
                                    onMouseLeave={() => setIsHovered(false)}
                                    onMouseEnter={() => setIsHovered(true)}>
                                    <div className='item-right'>
                                        <svg
                                            fill={`${isHovered ? 'rgb(28, 199, 73)' : 'rgb(169, 169, 172)'}`}
                                            width="18px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <path
                                                d="M10.5,3 C10.7761424,3 11,3.22385763 11,3.5 L11,4.45307024 C11,4.72921261 10.7761424,4.95307024 10.5,4.95307024 L6,4.95307024 L6,18.4917531 L10.0397234,15.2052459 C10.5562588,14.7849001 11.2898613,14.7548754 11.8374063,15.1151718 L11.9602766,15.2052459 L16,18.4927297 L16,14.2418863 C16,13.9657439 16.2238576,13.7418863 16.5,13.7418863 L17.5,13.7418863 C17.7761424,13.7418863 18,13.9657439 18,14.2418863 L18,19.5351606 C18,20.3441435 17.3284325,21 16.5,21 C16.1992161,21 15.9066001,20.9116977 15.6593788,20.7483322 L15.5397234,20.6604532 L11,16.9654287 L6.4602766,20.6604532 C5.86363721,21.1459859 4.99503637,21.1025314 4.45180014,20.5831176 L4.34766808,20.4729044 C4.15511629,20.2472641 4.03722367,19.9712393 4.0074697,19.6811872 L4,19.5351606 L4,4.95307024 C4,3.92344892 4.81587779,3.07991463 5.85073766,3.00535701 L6,3 L10.5,3 Z M17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L17.999,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 L21,7.5 C21,7.7761424 20.7761424,8 20.5,8 L17.999,8 L18,10.5 C18,10.7761424 17.7761424,11 17.5,11 L16.5,11 C16.2238576,11 16,10.7761424 16,10.5 L15.999,8 L13.5,8 C13.2238576,8 13,7.77614237 13,7.5 L13,6.5 C13,6.22385763 13.2238576,6 13.5,6 L15.999,5.999 L16,3.5 C16,3.22385763 16.2238576,3 16.5,3 L17.5,3 Z">
                                            </path>
                                        </svg>
                                        <div className='item-right-title'>Watch Later</div>
                                    </div>
                                    <div className='item-left'>
                                        <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                                    </div>
                                </div>
                                <div className='account-box-item-auth' onClick={() => navigate('/account')}>
                                    <div className='item-right'>
                                        <div className='icon-container'>
                                            <FontAwesomeIcon width="18px" size='1x' icon={faUserAlt}></FontAwesomeIcon>
                                        </div>
                                        <div  className='item-right-title'>My Account</div>
                                    </div>
                                    <div className='item-left'>
                                        <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                                    </div>
                                </div>
                                <div className='account-box-item-auth' onClick={() => handleLogout()}>
                                    <div className='item-right'>
                                        <div className='icon-container'>
                                            <FontAwesomeIcon width="18px" size='1x' icon={faSignOut}></FontAwesomeIcon>
                                        </div>
                                        <div  className='item-right-title'>Logout</div>
                                    </div>
                                    <div className='item-left'>
                                        <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                                    </div>
                                </div>
                            </>
                            :
                            <div className="account-box-item">
                                <div className='account-box-item-title'>Đăng nhập để theo dõi các nội dung mới nhất.</div>
                                <div className='account-box-item-button'>
                                    <button onClick={() => navigate("/login")}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
