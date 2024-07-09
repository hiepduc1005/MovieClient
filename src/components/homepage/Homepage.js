import React, { useEffect, useRef, useState } from 'react'
import './Homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faPlayCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import { getActionMovies, getAnimeMovies, getComedyMovies, getDramaMovies } from '../../api/MovieApi'
import { useNavigate } from 'react-router-dom'
import { addMovieToWatchList, checkMovieInWatchList } from '../../api/WatchListApi'

const Homepage = ({top5Movies,top10Movies,user,token}) => {
    const [active, setActive] = useState(0)
    const [lengthItems, setLengthItems] = useState(top5Movies?.length - 1)
    const intervalRef = useRef(null);
    const [animeMovies, setAnimeMovies] = useState()
    const [actionMovies, setActionMovies] = useState()
    const [comedyMovies, setComedyMovies] = useState()
    const [dramaMovies, setDramaMovies] = useState()
    const [moviesArray,setMoviesArray] = useState([])
    const movieTitle = ['Popular on HMovie','Anime',"Action","Drama","Comedy"]
    const navigate = useNavigate()

    const [show,setShow] = useState(false)
    const [isInWatchList,setIsInWatchList] = useState()

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
        
              const check =  handleCheckMovieInWatchList(watchlistId,movieId)
              if(check && data){
                setShow(true)
              }
        
            }catch(err){
                console.log(err)
            }
        }else{
            window.location.href='https://hmovie1005.netlify.app/login'
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

    const handleScroll = () => {
        const footer = document.getElementById('footer')
        const div = document.getElementById('myDiv1')
        let divHeight = div.clientHeight;
        const position = window.scrollY;
        if((divHeight-200) <= position){
            footer.classList.add('show')
        }
        else {
            footer.classList.remove('show')
        }
        
      };
      
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
      
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);  
    
    const fetchMovie = async () => {
        try{
            const animes = await getAnimeMovies();
            const actions = await getActionMovies();
            const comedies = await getComedyMovies();
            const dramas = await getDramaMovies();
            if(animes){
                setAnimeMovies(animes.data)
            }
            if(actions){
                setActionMovies(actions.data)
            }
            if(comedies){
                setComedyMovies(comedies.data)
            }
            if(dramas){
                setDramaMovies(dramas.data)
            }

        }catch(err){
            console.log(err)
        }      
    } 

    useEffect(()=>{
        fetchMovie();

        // top5Movies.array.forEach(movie => {

        // });

    },[])

    useEffect(()=>{
        if(top10Movies){
            setMoviesArray([top10Movies,animeMovies,actionMovies,dramaMovies,comedyMovies])

        }
    },[top10Movies,animeMovies,actionMovies,comedyMovies,dramaMovies])

    useEffect(() => {
        setLengthItems(top5Movies?.length - 1);
    }, [top5Movies]);

    useEffect(() => {
        const reFreshSlider = () => {
            let items = document.querySelectorAll('.movie-slider .movie-slider-list .movie-slider-item');
            if (items.length > 0) {
                let checkLeft = items[active]?.offsetLeft;
                document.querySelector('.movie-slider .movie-slider-list').style.left = -checkLeft + 'px';
            }

            let lastActiveDot = document.querySelector('.movie-slider-dot li.active');
            if (lastActiveDot) lastActiveDot.classList.remove('active');

            let newActiveDot = document.querySelectorAll('.movie-slider-dot li')[active];
            if (newActiveDot) newActiveDot.classList.add('active');
        };
        
        reFreshSlider();
        if(top5Movies && user){
            handleCheckMovieInWatchList(user?.watchList?.id,top5Movies[active].id)
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [active]);

    const handleNext = () => {
        setActive(prevActive => (prevActive + 1 > lengthItems ? 0 : prevActive + 1));
       
    }

    const handlePrev = () => {
        setActive(prevActive => (prevActive - 1 < 0 ? lengthItems : prevActive - 1));
      
    }

    const handleNavigateMoviesGenre = (genre) => {
        if(genre !== "Popular on HMovie"){
           let pathName = genre.charAt(0).toLowerCase() + genre.slice(1)
           navigate(pathName);
        }
    }
    
    const handleNavigate = (path) => {
        navigate(path)
    } 

    const sliderRefs = useRef([]);
    if (sliderRefs.current.length !== moviesArray.length) {
        sliderRefs.current = Array(moviesArray.length).fill().map((_, i) => sliderRefs.current[i] || React.createRef());
    }

    
    const [movieSliderPopularIndex,setMovieSliderPopularIndex] = useState();

    useEffect(() => {
        if (moviesArray.length > 0) {
            setMovieSliderPopularIndex(new Array(moviesArray.length).fill(0));
        }
    }, [moviesArray]);

    const [popularListWitdth,setPopularListWidth] = useState()
    const [popularItemWidth,setPopularItemWidth] = useState()
    const [popularItemMarginRight,setPopularItemMarginRight] = useState()

    useEffect(() => {
        if(document.querySelector('#popular-list')){
            setPopularListWidth(document.querySelector('#popular-list').offsetWidth)
        }

        if(document.querySelector("#movie-polular-item")){
            const element = document.querySelector("#movie-polular-item")
            setPopularItemWidth(element.offsetWidth)
            setPopularItemMarginRight(getComputedStyle(element).marginRight)
        }
    },[document.querySelector('#popular-list'),document.querySelector("#movie-polular-item")])

    

    const handleOnClickArrowRight = (index) => {
        setMovieSliderPopularIndex(prevState => {
            const newState = [...prevState];
            newState[index]++; 
            const checkLeft = (popularItemWidth + parseInt(popularItemMarginRight)) * newState[index];
            sliderRefs.current[index].current.style.transform = `translateX(${-checkLeft}px)`;
            return newState;
        });
    };

    const handleOnClickArrowLeft = (index) => {
        setMovieSliderPopularIndex(prevState => {
            const newState = [...prevState]
            newState[index]--;
            const checkLeft = (popularItemWidth + parseInt(popularItemMarginRight)) * newState[index];
            sliderRefs.current[index].current.style.transform = `translateX(${-checkLeft}px)`;
            return newState;
        });
    };
        // console.log(document.querySelector('#popular-list'));
    

    const checkShowArrowRight = (movieLength) => {
        if(popularListWitdth){
            return (popularItemWidth + parseInt(popularItemMarginRight)) * movieLength > popularListWitdth ? true : false
        }
    }

    const checkIfHaveItemToShowArrowRight = (movieLength) => {
        const itemLength = (popularItemWidth + parseInt(popularItemMarginRight) )
        if(popularListWitdth){
            return Math.round(((itemLength * movieLength) - popularListWitdth) / itemLength)
        }
    }

  return (  
    <div className='homepage-container'>      
        <div className="movie-slider">
           <div className='movie-slider-list'>
            {top5Movies?.map((movie,index) => {
                return (
                    <div key={index+movie.imdbId} className='movie-slider-item'>
                        <img alt='' src={movie.backDropUrl}></img>
                    </div>
                );
            })} 
            
           </div>

           <div className='movie-slider-buttons'>
                <div onClick={handlePrev} id='movie-slider-prev'>&lt;</div>
                <div onClick={handleNext}id='movie-slider-next'>&gt;</div>             
           </div>

           

           <ul class="movie-slider-dot">
            <li class="active"></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
           </ul>

          

        </div> 
            <div className='movie-slider-details'>
                <div className='movie-slider-title' onClick={()=> handleNavigate(`/album/${top5Movies[active]?.slug}`)}>{top5Movies ? top5Movies[active]?.title : ''}</div>
                <div className='extra-details'>
                    <div className='movie-slider-rate'>
                        <FontAwesomeIcon className='star-icon' icon={faStar}></FontAwesomeIcon>
                        {top5Movies ? top5Movies[active]?.rating : ''}</div>
                    <div className='movie-slider-date'>{top5Movies ? top5Movies[active]?.releaseDate : ''}</div>
                    <div className='movie-slider-duration'>{top5Movies ? top5Movies[active]?.duration : ''}m</div>
                </div>
                <div className='movie-slider-genres'>
                    {top5Movies && top5Movies[active]?.genres?.map((item,index) => { 
                        return (
                            <div key={index+"genreSlider"} className='item' onClick={() => handleNavigateMoviesGenre(item)}>{item}</div>
                        )
                    }) }
                    
                </div>
                <div className='movie-slider-des'>
                {top5Movies ? top5Movies[active]?.description : ''}
                </div>
                <div className='movie-slider-button'>
                    <div className='movie-slider-playbutton' onClick={()=> handleNavigate(`/play/${top5Movies[active].episodes[0].slug}`)}>
                        <FontAwesomeIcon className='icon-play' icon={faPlayCircle}></FontAwesomeIcon>
                    </div>

                    <div className='movie-slider-watchlater' onClick={()=> handelAddMovieToWatchLater(user?.watchList?.id,top5Movies[active].id)}>
                    {isInWatchList ? 

                    <svg className='watchlater-icon' xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="0 0 24 24"><path fill="currentColor" d="m10.95 14l4.95-4.95l-1.425-1.4l-3.525 3.525L9.525 9.75L8.1 11.175zM5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3zm2-3.05l5-2.15l5 2.15V5H7zM7 5h10z"/></svg>  

                    :

                    <svg className='watchlater-icon' xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="0 0 24 24"><path width='12px' height='12px' fill="currentColor" d="M17 18V5H7v13l5-2.18zm0-15a2 2 0 0 1 2 2v16l-7-3l-7 3V5a2 2 0 0 1 2-2zm-6 4h2v2h2v2h-2v2h-2v-2H9V9h2z"/></svg>       
                    }
                    </div>
                </div>
                
            </div>
        <div className='movie-polular-list-container' id='myDiv1'>
            {moviesArray && moviesArray?.map((movies,index) => {
                return(
                <div className='polular-list-wraper' >
                    <h2 onClick={() => handleNavigateMoviesGenre(movieTitle[index])} className='movie-polular-title'>{movieTitle[index]}</h2>
                    <div className='movie-polular-list' id='popular-list'>
                        <div className='slider-move' ref={sliderRefs.current[index]}>
                            {movies && movies?.map((movie,index) => {
                                return(
                            <div className='movie-polular-item' id='movie-polular-item' onClick={()=> handleNavigate(`/album/${movie.slug}`)} key={`movie-polular-item${movie?.imdbId}${index}`}>            
                                <div className='movie-polular-item-image'>
                                <img alt='' src={movie?.postUrl}>
                                    
                                </img>
                                <div className='movie-polular-item-rate'>
                                        <FontAwesomeIcon className='icon' size='2xs' icon={faStar}></FontAwesomeIcon>
                                        {movie?.rating}
                                    </div>
                                </div>           
                                                                
                                <div className='movie-polular-item-title'>{movie?.title}</div>   
                                
                                <div className='movie-polular-item-detail'>
                                <div className='details-image-container'>
                                    <img alt='' src={movie?.backDropUrl}></img>
                                </div>
                                <div className='details-info'>
                                    <div className='details-info-title' onClick={()=> handleNavigate(`/album/${movie.slug}`)}>{movie?.title}</div>
                                    <div className='extra-details-info'>
                                        <div className='rate'>
                                            <FontAwesomeIcon size='xs' icon={faStar}></FontAwesomeIcon>
                                            {movie?.rating}
                                        </div>
                                        <div className='date'>{movie?.releaseDate}</div>
                                        <div className='duration'>{movie?.duration}</div>
                                    </div>
                                    <div className='details-info-genres'>
                                        {movie?.genres && movie?.genres?.map((genre,index) => {
                                            return(
                                                <div key={`details-info-genres${index}`} className='item' onClick={() => handleNavigateMoviesGenre(genre)}>{genre}</div>
                                                )
                                            })}
                                    </div>
                                    <div className='details-info-des'>{movie?.description}</div>
                                    <div className='more-info'>more info <b>&gt;</b></div>
                                            
                                </div>
                                </div>   
                        </div>
                                )
                            })}
                        </div>
                    
                    </div>   
                    {
                    (checkShowArrowRight(movies?.length) && (movieSliderPopularIndex && movieSliderPopularIndex[index] < checkIfHaveItemToShowArrowRight(movies?.length)))
                        ? 
                    <FontAwesomeIcon onClick={() => handleOnClickArrowRight(index)} className='icon-angle-right' icon={faAngleRight}></FontAwesomeIcon>
                        :
                        ''
                    } 

                    {
                    (movieSliderPopularIndex && movieSliderPopularIndex[index] > 0) 
                        ? 
                        <FontAwesomeIcon onClick={() => handleOnClickArrowLeft(index)} className='icon-angle-left' icon={faAngleLeft}></FontAwesomeIcon>
                        : ''
                    }

                </div>
                )
            })}
        </div>
        <div className={`notification ${show ? 'show-block' : ''}`}>
            {isInWatchList ? "Added to Watch Later" : "Remove from Watch Later"}
        </div>
  </div>
  )
}

export default Homepage