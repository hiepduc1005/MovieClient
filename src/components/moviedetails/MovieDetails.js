import React, { useEffect, useRef, useState } from 'react'
import './MovieDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faFlag, faPlay, faShare, faShareAlt, faShareAltSquare, faShareFromSquare, faTasks } from '@fortawesome/free-solid-svg-icons'
import { getMovieBySlug } from '../../api/MovieApi'
import { useLocation, useNavigate, useParams } from 'react-router'
import { addMovieToWatchList, checkMovieInWatchList } from '../../api/WatchListApi'

const MovieDetails = ({user,token}) => {
  const [isCollapse,setIsCollapse] = useState(false)
  const [isEpisodeTapSelected,setIsEpisodeTapSelected] = useState(true)
  const [isTrailerTapSelected,setIsTrailerTapSelected] = useState(false)
  const [needCollapse,setNeedCollapse] = useState(false)
  const [isInWatchList,setIsInWatchList] = useState(false)
  const [movie,setMovie] = useState()
  const navigate = useNavigate()
  const [show,setShow] = useState(false)
  const location = useLocation()

  const descriptionRef = useRef(null)
  const descriptionContainerRef = useRef(null)

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false)
      }, 3000);
      return () => clearTimeout(timer);
    }
  },[show])

  const handelAddMovieToWatchLater = async (watchlistId,movieId) => {
    if(user && token){
      try{
        const data = await addMovieToWatchList(watchlistId,movieId,token);
  
        const check =  handleCheckMovieInWatchList(user?.watchList?.id,movie?.id)
        if(check && data){
          setShow(true)
        }
  
      }catch(err){
          console.log(err)
      }

    }else{
      window.location.href = 'http://localhost:3000/login'
    }
 }  

  const handleCheckMovieInWatchList = async (watchlistId,movieId) => {
    try{
        const data = await checkMovieInWatchList(watchlistId,movieId,token);
        if(data){
          setIsInWatchList(data.data)
          return data;
        }
    }catch(err){
        console.log(err)
    }
  }  

  useEffect(() => {
    if(movie && user){
      handleCheckMovieInWatchList(user?.watchList?.id,movie?.id)
    }
    const desHeight = descriptionRef.current.offsetHeight
    const desContainerHeight = descriptionContainerRef.current.offsetHeight
    if(desHeight > desContainerHeight){
      setNeedCollapse(true)
    } 
    
  },[movie])

  const handleClickEpisodeTap = () => {
    setIsEpisodeTapSelected(true)
    setIsTrailerTapSelected(false)
  }

  const handleClickTrailerTap = () => {
    setIsTrailerTapSelected(true)
    setIsEpisodeTapSelected(false)
  }

  const fetchMovieBySlug = async (slug) => {
    try{
      const movieData = await getMovieBySlug(slug)
      if(movieData){
        setMovie(movieData.data)
      }
    }catch(err){
      console.log(err)
    }
} 
  
  useEffect(() => {
    fetchMovieBySlug(location.pathname.slice(7))
},[])
  return (
    <div className='movie-details-container'>
      <div className='movie-details-imgage'>
        <div className='img-container'>
          <img src={movie?.backDropUrl}></img>
        <div className='left-layer'></div>
        <div className='bottom-layer'></div>
        </div>
      </div>
      <div className='movie-details-info'>
        <div className='movie-details-content'>
          <div className='title'>{movie?.title}</div>
          <div className='extra-info'>
            <div className='rate'>{movie?.rating}</div>
            <div className='date'>{movie?.releaseDate}</div>
            <div className='duration'>{movie?.duration}m</div>
          </div>
          <div className='genres'>
            {movie && movie.genres?.map((genre,index) => {
              return (
                <div className='genre-item'>{genre}</div>
              )
            })}
          </div>
          <div className='cast'>
            <span><b>Director:</b>Updating</span>
          </div>
          <div className='cast'>
            <span><b>Cast:</b>Updating</span>
          </div>
          <div ref={descriptionContainerRef} className={`description ${isCollapse ? 'showInfo' : 'hideInfo'}`}>
            <span ref={descriptionRef}>
              <b>Description:</b>
              {movie?.description}
              </span>
            {needCollapse ? 

            <div onClick={() => {setIsCollapse(!isCollapse)}} className='btn-collapse'>{isCollapse ? 'Collapse' : "More"}
              <FontAwesomeIcon icon={isCollapse ? faAngleUp : faAngleDown}></FontAwesomeIcon>
            </div>
                         : ''
          }
          </div>
          <div className='movie-details-btn'>
            <div className='btn btn-play' onClick={() => navigate(`/play/${movie?.episodes[0].slug}`)}>
              <FontAwesomeIcon size='xl' icon={faPlay}></FontAwesomeIcon>
              <span>Play</span>
            </div>
            <div className='btn btn-share'>
            <FontAwesomeIcon size='xl' icon={faShareFromSquare}></FontAwesomeIcon>
              <span>Share</span>
            </div>
            <div className='btn btn-watchlater' onClick={() => handelAddMovieToWatchLater(user?.watchList?.id,movie?.id)}>
            {isInWatchList ? 

              <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"><path fill="currentColor" d="m10.95 14l4.95-4.95l-1.425-1.4l-3.525 3.525L9.525 9.75L8.1 11.175zM5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3zm2-3.05l5-2.15l5 2.15V5H7zM7 5h10z"/></svg>  
              
              :

              <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18V5H7v13l5-2.18zm0-15a2 2 0 0 1 2 2v16l-7-3l-7 3V5a2 2 0 0 1 2-2zm-6 4h2v2h2v2h-2v2h-2v-2H9V9h2z"/></svg>       
            }
            <span>Watch Later</span>
            </div>
          </div>
        </div>
        <div className='movie-details-episode'>
          <div className='tap-top'>
            <div onClick={() => handleClickEpisodeTap()} className={`tap-list ${isEpisodeTapSelected ? "selected" : ""}`}>Episodes</div>
            <div onClick={() => handleClickTrailerTap()} className={`tap-list ${isTrailerTapSelected ? "selected" : ""}`}>Trailer</div>
            {/* <div className='tap-list selected'>Recommend</div> */}
          </div>
          <div className='tap-bottom-line'></div>
          <div className='tap-contents'>
            <div className={`tap-episodes ${isEpisodeTapSelected ? 'showEpisodeTap' : ''}`}>
              <div className='episode-info'>Episodes {movie?.episodes[0]?.totalEpisode > 1 ? `1 - ${movie?.episodes[0]?.totalEpisode}` : '1'}</div>
              <div className='episodes'>
                {movie && movie?.episodes?.map((episode,index) => {
                  return (
                  <div className='item' onClick={() => navigate(`/play/${episode.slug}`)}>
                    <div className='img-container'>
                      <img src={movie?.backDropUrl}></img>
                    </div>
                    <div className='episode-title'>{movie?.title} Episode {episode?.episodeNumber}</div>
                  </div>
                  )
                })}
                
              </div>
            </div>

            <div className={`tap-trailer ${isTrailerTapSelected ? 'showTrailerTap' : ''}`}>
              <iframe
                width="900"
                height="550"
                src={`https://www.youtube.com/embed/gpv7ayf_tyE?si=UBmmqrnS_0Fy__EZ`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                ></iframe>            
            </div>
          </div>
        </div>
      </div>
          <div className={`notification ${show ? 'show-block' : ''}`}>
            {isInWatchList ? "Added to Watch Later" : "Remove from Watch Later"}
          </div>
    </div>
  )
}

export default MovieDetails