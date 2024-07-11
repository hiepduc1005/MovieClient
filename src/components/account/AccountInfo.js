import React, { useEffect, useState } from 'react'
import './AccountInfo.css'
import { faCheckCircle, faPlayCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addMovieToWatchList, getAuthenticatedUserWatchList } from '../../api/WatchListApi';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const AccountInfo = ({user,token}) => {
    const [isAccountSeleted, setAccountSeleted] = useState(true)
    const [isHistorySeleted, setHistorySeleted] = useState(false)
    const [isWatchLaterSeletec, setWatchLaterSeleted] = useState(false)

    const [clickEdit, setClickEdit] = useState(false)
    const [isSelectAll,setIsSelectAll] = useState(false)

    const [watchListDeleteSelected,setWatchListDeleteSelected] = useState([])
    const [listMovieWatchList,setListMovieWatchList] = useState([])

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const setting = searchParams.get('s');

    useEffect(() => {
        if(setting !== 'history'){
            if(!user || !token){
                window.location.href="https://hmovie1005.netlify.app"
            }
        }
    },[token,user])

    const handleAccountClick = () => {
        setAccountSeleted(true)
        setHistorySeleted(false)
        setWatchLaterSeleted(false)
    }

    const handleHistoryClick = () => {
        setHistorySeleted(true)
        setAccountSeleted(false)        
        setWatchLaterSeleted(false)
    }

    const handleWatchLaterClick = () => {
        setWatchLaterSeleted(true)
        setAccountSeleted(false)
        setHistorySeleted(false)
    }

    const handleClickSelectAll = () => {
        let newWatchListSelected = listMovieWatchList?.movieResponses?.map(item => item?.id)
        if(isSelectAll === true){
            setWatchListDeleteSelected([])
        }
        else{
            setWatchListDeleteSelected(newWatchListSelected)
        }
    }

    const handleClickItem = (movieId) => {
        let currentWatchList = watchListDeleteSelected.includes(movieId) 
            ? watchListDeleteSelected.filter(item => item !== movieId)
            : [...watchListDeleteSelected,movieId]

        setWatchListDeleteSelected(currentWatchList)
    }

    const handleGetWatchList = async () => {
        try{
            const dataMovie = await getAuthenticatedUserWatchList(token);
            if(dataMovie){
                setListMovieWatchList(dataMovie.data)
            }
        }catch(err){
            console.log(err)
        }
    }


    useEffect(() => {
        handleGetWatchList()
    },[])

    const handleClickDelete = async () => {
        const itemsToDelete = [...watchListDeleteSelected];
                    await setWatchListDeleteSelected([]);
        if (itemsToDelete.length > 0) {
            for (const item of itemsToDelete) {
                await addMovieToWatchList(listMovieWatchList.id, item, token);
            }
        }
    
        handleGetWatchList();
    }

    useEffect(() => {
        if(watchListDeleteSelected.length === listMovieWatchList?.movieResponses?.length){
            setIsSelectAll(true)
        }
        else setIsSelectAll(false)

    },[watchListDeleteSelected,listMovieWatchList?.movieResponses?.length])

    const [moviesHistory,setMoviesHistory] = useState([])

    const getMovieHistoryFromLocalStorage = () => {
        let watchHistoryJson = localStorage.getItem("watchHistory");
        let watchHistory = watchHistoryJson ? JSON.parse(watchHistoryJson) : []
        setMoviesHistory(Array.isArray(watchHistory) ? watchHistory : [])
    }

    useEffect(() => {
        getMovieHistoryFromLocalStorage()
        if(setting === 'history'){
            setHistorySeleted(true)
            setAccountSeleted(false)        
            setWatchLaterSeleted(false)
        }else if(setting === 'watchlater'){
            setWatchLaterSeleted(true)
            setAccountSeleted(false)
            setHistorySeleted(false)
        }else{
            setWatchLaterSeleted(false)
            setAccountSeleted(true)
            setHistorySeleted(false)
        }
    },[setting])

    return (
        <div className='account-info-container'>
            <div className='account-sidebar'>
                <div className='account-sidebar-header'>
                    <div className='avatar'>
                        <img alt='' src={user?.avatarUrl}></img>
                    </div>
                    <div className='username'>{user?.username}</div>
                </div>
                <div className='account-sidebar-body'>
                    <div 
                        className={`account-sidebar-body-item ${isAccountSeleted ? 'primary-color' : ''}`}
                        onClick={() => handleAccountClick()}
                    >My Account</div>
                    <div className='horizone-line margin-zero'></div>
                    <div 
                        className={`account-sidebar-body-item ${isHistorySeleted ? 'primary-color' : ''}`}
                        onClick={() => handleHistoryClick()}
                    >History</div>
                    <div
                        className={`account-sidebar-body-item ${isWatchLaterSeletec ? 'primary-color' : ''}`}
                        onClick={() => handleWatchLaterClick()}
                    >WatchLater</div>
                    <div className='horizone-line margin-zero'></div>
                </div>
                <div className='account-sidebar-bottom'>
                    <div className='account-sidebar-body-item'>Logout</div>
                </div>
            </div>
            <div className='account-content-container'>
                <div className={`my-account-content ${isAccountSeleted ? "show-block" : ''}`}>
                    <div className='title'>My Account</div>
                    <div className='setting-container'>
                        <div className='profile-container'>
                            <div className='subtitle'>Profile</div>
                            <div className='profile'>
                                <div className='profile-avatar'>
                                    <img alt='' src={user?.avatarUrl}></img>
                                </div>
                                <div className='profile-info-container'>
                                    <div className='profile-info'>
                                        <div className='username'>{user?.username}</div>
                                    </div>
                                    <div className='profile-other-info'>
                                        <div className='created-date'><span>Create At:</span>{user?.createdAt}</div>
                                        <div className='vertical-line'></div>
                                        <div className='birth'><span>Date of Birth:</span>Not Set</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='profile-safe'>
                            <div className='subtitle'>Account and security</div>
                            <div className='account-security'>
                                <div className='account-security-item'>
                                    <p className='email'>Email</p>
                                    <span className='data oneline'>{user?.email}</span>
                                    <span className='edit'>Set</span>
                                </div>
                                <div className='account-security-item'>
                                    <p className='email'>Mobile number</p>
                                    <span className='data oneline'>Not Set</span>
                                    <span className='edit'>Set</span>
                                </div>
                                <div className='account-security-item'>
                                    <p className='email'>Password</p>
                                    <span className='data oneline'>Not Set</span>
                                    <span className='edit'>Set</span>
                                </div>
                                <div className='account-security-item'>
                                    <p className='email'>Username</p>
                                    <span className='data oneline'>{user?.username}</span>
                                    <span className='edit'>Set</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`history-content ${isHistorySeleted ? "show-block" : ''}`}>
                    <div className='title'>History</div>
                    <div className='horizone-line'></div>
                    <div className='movie-history'>
                        {user ? user?.watchHistoryResponses?.map((movie) => {
                            return (
                        <div className='movie-item' onClick={()=> window.location.href=`https://hmovie1005.netlify.app/play/${movie?.movieHistoryResponse?.slug}-episode-${movie?.episodeNumber}`}>
                            <div className='img'>
                                <img alt='' src={movie?.movieHistoryResponse?.backDropUrl}></img>
                                <div className='episode-number'>Watch to Episode {movie?.episodeNumber}</div>
                                <FontAwesomeIcon className='play-icon' icon={faPlayCircle}></FontAwesomeIcon>
                            </div>
                            <div className='movie-title'>{movie?.movieHistoryResponse?.title}</div>
                        </div>
                            )
                        }) 
                            :
                        
                            moviesHistory?.map((movie) => {
                                return (
                            <div className='movie-item' onClick={()=> window.location.href=`https://hmovie1005.netlify.app/play/${movie?.slug}-episode-${movie?.episodeNumber}`}>
                                <div className='img'>
                                    <img alt='' src={movie?.backDropUrl}></img>
                                    <div className='episode-number'>Watch to Episode {movie?.episodeNumber}</div>
                                    <FontAwesomeIcon className='play-icon' icon={faPlayCircle}></FontAwesomeIcon>
                                </div>
                                <div className='movie-title'>{movie?.movieTitle}</div>
                            </div>
                            )})
                        }

                        {(moviesHistory?.length >= 4 && !user)
                            ?
                            <div className='history-box-footer-unauth'>
                                <span className='title'>Sign in to store a more extensive movie watch history.</span>
                            </div>
                            : ''
                        } 

                    </div>
                </div>

                <div className={`watchlist-content ${isWatchLaterSeletec ? "show-block" : ''} ${clickEdit ? "edit-mode" : ""}`}> {/* Chỉnh sửa ở đây */}
                    <div className='title'>Watch Later</div>
                    <div className='edit-btn-container'>
                        {
                        clickEdit ? 
                            <div className='button-container'>
                                <button className='cancle' onClick={() => setClickEdit(false)}>Cancel</button>
                                {watchListDeleteSelected.length > 0 
                                    ? 
                                    <button className='delete enable' onClick={() => handleClickDelete()}>Delete</button>
                                    :
                                    <button className='delete'>Delete</button>

                                }
                               
                            </div>

                            :
                            
                            <button className='edit-btn' onClick={() => setClickEdit(!clickEdit)}>Edit</button>
                        }
                    </div>
                    <div className='horizone-line p-t-0'></div>
                    <div className={`select-all-container ${clickEdit ? 'p-b-40' : ''}`} onClick={() => handleClickSelectAll()}>                
                        <div className={`select-all ${!clickEdit ? 'hide' : ''}`}>
                        {isSelectAll 

                            ? 
                            <FontAwesomeIcon  icon={faCheckCircle} className='circle-icon-color'></FontAwesomeIcon>
                            :
                            <div className='circle-icon'></div>
                        }
                        
                        <span className='select-all-title'>Select All</span>
                        </div>
                    </div>
                    <div className='movie-watchlater'>
                        {listMovieWatchList?.movieResponses?.map((movie,index) => {
                            return (
                                <div className='movie-item' onClick={clickEdit ? () => handleClickItem(movie?.id) : () => navigate(`/album/${movie.slug}`)}>
                                    <div className='img'> 
                                        {(watchListDeleteSelected.includes(movie?.id))
                                            ?
                                            <FontAwesomeIcon className='circle-icon-big-color' icon={faCheckCircle}></FontAwesomeIcon>
                                            :
                                            <div className='circle-icon-big'></div>

                                        }
                                        <img alt='' src={movie?.backDropUrl}></img>                            
                                        <FontAwesomeIcon className='play-icon play-icon-watchlater' icon={faPlayCircle}></FontAwesomeIcon>
                                    </div>
                                    <div className='movie-title'>{movie?.title}</div>
                                </div>
                            )
                        })}
                        {listMovieWatchList?.movieResponses?.length === 0 ? 
                          <div className='empty-watchlist'>
                            <span className='title'>No Watch Later List</span>
                            <span className='desc'>Try adding more videos to your Watch Later!</span>
                            <button className='watch-now'>Watch Now</button>
                          </div>
                          :
                          ''
                        }                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo
