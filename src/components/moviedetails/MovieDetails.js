import React, { useEffect, useRef, useState } from 'react'
import './MovieDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faFlag, faPlay, faShare, faShareAlt, faShareAltSquare, faShareFromSquare, faTasks } from '@fortawesome/free-solid-svg-icons'
import { getMovieBySlug } from '../../api/MovieApi'
import { useLocation, useNavigate, useParams } from 'react-router'

const MovieDetails = () => {

  const [isCollapse,setIsCollapse] = useState(false)
  const [isEpisodeTapSelected,setIsEpisodeTapSelected] = useState(true)
  const [isTrailerTapSelected,setIsTrailerTapSelected] = useState(false)
  const [needCollapse,setNeedCollapse] = useState(false)

  const [movie,setMovie] = useState()
  const navigate = useNavigate()

  const location = useLocation()

  const descriptionRef = useRef(null)
  const descriptionContainerRef = useRef(null)

  useEffect(() => {
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
            <div className='btn btn-watchlater'>
            <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="icon/Add" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24" />
        <path
          d="M11.5,3 C11.7761424,3 12,3.22385763 12,3.5 L12,4.5 C12,4.77614237 11.7761424,5 11.5,5 L7,5 L7,18.864 L11.0397234,15.4985222 C11.5562588,15.068076 12.2898613,15.0373299 12.8374063,15.4062837 L12.9602766,15.4985222 L17,18.865 L17,14.5 C17,14.2238576 17.2238576,14 17.5,14 L18.5,14 C18.7761424,14 19,14.2238576 19,14.5 L19,19.9324792 C19,20.760901 18.3284325,21.4325168 17.5,21.4325168 C17.1992161,21.4325168 16.9066001,21.3420927 16.6593788,21.1748017 L16.5397234,21.0848111 L12,17.301 L7.4602766,21.0848111 C6.86363721,21.5820106 5.99503637,21.5375119 5.45180014,21.0056172 L5.34766808,20.8927558 C5.15511629,20.6616936 5.03722367,20.3790363 5.0074697,20.0820147 L5,19.9324792 L5,5 C5,3.9456382 5.81587779,3.08183488 6.85073766,3.00548574 L7,3 L11.5,3 Z M18.5,3 C18.7761424,3 19,3.22385763 19,3.5 L18.999,6 L21.5,6 C21.7761424,6 22,6.22385763 22,6.5 L22,7.5 C22,7.77614237 21.7761424,8 21.5,8 L18.999,8 L19,10.5 C19,10.7761424 18.7761424,11 18.5,11 L17.5,11 C17.2238576,11 17,10.7761424 17,10.5 L16.999,8 L14.5,8 C14.2238576,8 14,7.77614237 14,7.5 L14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L16.999,5.999 L17,3.5 C17,3.22385763 17.2238576,3 17.5,3 L18.5,3 Z"
          id="形状结合"
          fill="#FFFFFF"
          fillRule="nonzero"
        />
      </g>
    </svg>        
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
    </div>
  )
}

export default MovieDetails