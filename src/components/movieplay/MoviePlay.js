import React, { useEffect, useRef, useState } from 'react'
import './MoviePlay.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMovieEpisodeBySlug } from '../../api/MovieApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight, faAngleUp, faCommentAlt, faShareFromSquare,faStar,} from '@fortawesome/free-solid-svg-icons'
import { addMovieToHistory } from '../../api/WatchHistoriesApi'

const MoviePlay = ({top10Movies,token,user}) => {
  const location = useLocation();
  const pathname = location.pathname.slice(6)
  
  const [isCollapse,setIsCollapse] = useState(false)
  const [hoverIndex,setHoverIndex] = useState(0)
  const [needCollapse,setNeedCollapse] = useState(false)
  
  const [episode,setEpisode] = useState()
  const descriptionRef = useRef(null)
  const desContainerRef = useRef(null)
  const navigate = useNavigate()
  const sliderRef = useRef(null)
  const itemRef = useRef(null)



  const fetchEpisodeBySlug = async (slug) => {
    try{
      const episodeData = await getMovieEpisodeBySlug(slug);
      if(episodeData){
        setEpisode(episodeData.data)
      }
    }catch(err){
      console.log(err)
    }
    
  }

  const addMovieToWatchHistory = async (userId,movieId,episodeNumber,accesstoken) => {
    try{
    await addMovieToHistory(userId,movieId,episodeNumber,accesstoken)
    }catch(err){
      console.log(err)
    }

  }

  const addMovieHistoryUnauthenticatedUser = (movieId,movieTitle,episodeNumber,backDropUrl,slug) => {
    const currentHistoryJSON = localStorage.getItem("watchHistory");
    const currentHistory = currentHistoryJSON ? JSON.parse(currentHistoryJSON) : [];

    const movieIndex = currentHistory.findIndex(movie => movieId === movie.movieId)
    if(movieIndex === -1){
      const data = {
          movieId:movieId,
          movieTitle:movieTitle,
          episodeNumber:episodeNumber,
          backDropUrl:backDropUrl,
          slug:slug
      }
      
      if(currentHistory.length === 4){
         currentHistory.shift();
      }

      currentHistory.push(data)

    }
    else{
      currentHistory[movieIndex].episodeNumber = episodeNumber
    }
    
    localStorage.setItem("watchHistory",JSON.stringify(currentHistory))

  }
  
  useEffect(() => {
    if(token && user && episode){
      addMovieToWatchHistory(user?.id,episode?.movie?.id,episode?.episode?.episodeNumber,token)
    }else if (!user && episode) {
      addMovieHistoryUnauthenticatedUser(
          episode?.movie?.id,
          episode?.movie?.title,
          episode?.episode?.episodeNumber,
          episode?.movie?.backDropUrl,
          episode?.episode?.slug
          )
    }
  },[episode,token,user])
  
  useEffect(() => {
    const desHeight = descriptionRef.current.offsetHeight
    const desContainerHeight = desContainerRef.current.offsetHeight
    if(desHeight > desContainerHeight){
      setNeedCollapse(true)
    } 
    
  },[episode])

  useEffect(() => {
    fetchEpisodeBySlug(pathname)
  },[pathname])

  const handleMouseEnter = (index) => {
    setHoverIndex(index)
  }

  const handleMouseLeave = () => {
    setHoverIndex(0)
  }


  const handleCollapse = () => {
    setIsCollapse(!isCollapse)
  }

  let current = 0

  const handleOnClickArrowRight = () => {
    current++
    let checkleft = (itemRef.current.offsetWidth + 14) * current
    if(current === 4){
      current = -1
    }   
    
    sliderRef.current.style.transform = `translateX(${-checkleft}px)`
  }

  return (
    <div className='movieplay-container'>
      <div className='movieplay-top'>
        <div className='movieplay-left'>
        <iframe
            title={`Episode ${episode?.episode?.episodeNumber}`}
            id='iframe'
            class="iframe"
            src={episode?.episode?.episodeUrl}
            allowFullScreen="true" 
            frameborder="0"
            allow="autoplay; web-share"
            ></iframe>
        <div className='extra-options'>
          <div className='comment'>
            <FontAwesomeIcon style={{paddingRight: '8px'}} size='1x' icon={faCommentAlt}></FontAwesomeIcon>
            Comments</div>
          <div className='watchlater'>
          <svg width="32px" height="32px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path  fill="currentColor" d="M29.3055556,17.25 C29.6890866,17.25 30,17.5609134 30,17.9444444 L30,19.3888889 C30,19.77242 29.6890866,20.0833333 29.3055556,20.0833333 L22.9166667,20.0833333 L22.9166667,39.724 L28.6396082,34.9562398 C29.3713667,34.346441 30.4106369,34.302884 31.1863257,34.8255686 L31.3603918,34.9562398 L37.0833333,39.7254167 L37.0833333,33.5277778 C37.0833333,33.1442467 37.3942467,32.8333333 37.7777778,32.8333333 L39.2222222,32.8333333 C39.6057533,32.8333333 39.9166667,33.1442467 39.9166667,33.5277778 L39.9166667,41.2376789 C39.9166667,42.4112764 38.9652794,43.3627321 37.7916667,43.3627321 C37.3655561,43.3627321 36.9510168,43.2346313 36.6007867,42.9976358 L36.4312748,42.8701491 L30,37.50975 L23.5687252,42.8701491 C22.7234861,43.574515 21.4929682,43.5114751 20.7233835,42.7579578 L20.5758631,42.5980707 C20.3030814,42.2707327 20.1360669,41.8703014 20.0939154,41.4495208 L20.0833333,41.2376789 L20.0833333,20.0833333 C20.0833333,18.5896541 21.2391602,17.3659327 22.7052117,17.2577715 L22.9166667,17.25 L29.3055556,17.25 Z M39.2222222,17.25 C39.6057533,17.25 39.9166667,17.5609134 39.9166667,17.9444444 L39.9163333,21.499 L43.4722222,21.5 C43.8557533,21.5 44.1666667,21.8109134 44.1666667,22.1944444 L44.1666667,23.6388889 C44.1666667,24.02242 43.8557533,24.3333333 43.4722222,24.3333333 L39.9163333,24.333 L39.9166667,27.8888889 C39.9166667,28.27242 39.6057533,28.5833333 39.2222222,28.5833333 L37.7777778,28.5833333 C37.3942467,28.5833333 37.0833333,28.27242 37.0833333,27.8888889 L37.0823333,24.333 L33.5277778,24.3333333 C33.1442467,24.3333333 32.8333333,24.02242 32.8333333,23.6388889 L32.8333333,22.1944444 C32.8333333,21.8109134 33.1442467,21.5 33.5277778,21.5 L37.0823333,21.499 L37.0833333,17.9444444 C37.0833333,17.5609134 37.3942467,17.25 37.7777778,17.25 L39.2222222,17.25 Z"></path>
</svg>


          Watch Later
          </div>
          <div className='share'>
            <FontAwesomeIcon style={{paddingRight: '8px'}}  size='1x' icon={faShareFromSquare}></FontAwesomeIcon>

            Share</div>
        </div>
        </div>
        <div className='movieplay-right'>
          <div className='movieplay-right-title'>{episode?.movie?.title}</div>
          <div className='espisodes'>Episodes</div>
          <div className='espisodes-detail'>Episodes {episode?.episode?.totalEpisode > 1 ? `1-${episode?.episode?.totalEpisode}` : '1'}</div>
          <div className='list-espisodes-container'>
             <ul className='list-espisodes'>
                {Array.from({length : episode?.episode?.totalEpisode} , (_,index) => (
                  <li className={`espisode-item ${episode?.episode?.episodeNumber === (index+1) ? 'primary-color' : ''}`} onClick={() => navigate(`/play/${episode?.movie?.episodes[index].slug}`)}>{index+1}</li>
                ))}
             </ul>
          </div>
        </div>
      </div>
      <div className='movieplay-bottom'>
        <div className='movieplay-bottom-left'>
          <div className='movie-title'>
          {episode?.movie?.title}
          </div>
          <div className='movie-rating'>
            <div className='rate-number'>
              <FontAwesomeIcon style={{paddingRight:'6px'}} size='1' icon={faStar}></FontAwesomeIcon>
              {episode?.movie?.rating}</div>
          </div>
            <div className='genres'>
              {episode && episode?.movie?.genres?.map((genre) => {
                return (
                   <div className='genre'>{genre}</div>
                )
              })}
            </div>
            <div ref={desContainerRef} className={`des-container ${isCollapse ? 'showInfo' : 'hideInfo'}`}>
              <span className='des' ref={descriptionRef}>
                <b style={{color:'rgb(169, 169, 172)'}}>Description:</b>{episode?.movie?.description}
              </span>
              {needCollapse ? 
                  <span className='collapse' onClick={()=>handleCollapse()}>{isCollapse ? 'Collapse' : 'More'}
                  <FontAwesomeIcon style={{marginLeft:'6px'}} icon={isCollapse ? faAngleUp : faAngleDown}></FontAwesomeIcon>
                  </span>
                           : ''
              }
            </div>
            <div className='horizone-line'></div>
            <div className='recommend-container'>
              <div className='recommend-title'>Reconmmended</div>
              <div className='recommend-slider'  >
                <div className='recommend-list' ref={sliderRef}>
                  {top10Movies?.map((movie) => {
                    return (
                        <div className='recomment-item' onClick = {() => navigate(`/album/${movie.slug}`)}>
                          <div className='recomment-item-img' ref={itemRef}>
                            <img alt='' src={movie?.postUrl}/>
                          </div>
                          <div className='recomment-item-title'>{movie?.title}</div>
                        </div>
                    )
                  })}
                </div>

              </div>
              <div className='arrow-right' onClick={() => handleOnClickArrowRight()}>
                  <FontAwesomeIcon size='2x' icon={faAngleRight}></FontAwesomeIcon>
              </div>
            </div>
            <div className='horizone-line'></div>
        </div>
        <div className='movieplay-bottom-right'>
          <div className='topten-title'>Top 10 Movies</div>
          <div className='topten-movies'>
            {top10Movies && top10Movies?.map((movie,index) => {
              return (
                  <div  onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave()}
                        className={`topten-movie-item ${hoverIndex===index ? 'show-bg-item' : ''}`}
                        onClick = {() => navigate(`/album/${movie.slug}`)} 
                        >
                    <div className='topten-movie-title'>
                      <span className={`rank-index ${(index+1) <= 3 ? 'primary-color' : ''}`}>{index+1}</span>
                      <span>{movie?.title}</span>
                    </div>
                    <img alt='' className={`${hoverIndex===index ? 'show-image' : ''}`} src={movie?.postUrl}></img>
                  </div>
              )
            })}
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviePlay