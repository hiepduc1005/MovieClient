import React, { useEffect, useRef, useState } from 'react'
import './Movies.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMost5MoviesByGenreName, getMoviesByGenreName } from '../../api/MovieApi'

const Movies = () => {
    const [active, setActive] = useState(0)
    const [lengthItems, setLengthItems] = useState()
    const intervalRef = useRef(null);

    const [moviesArray,setMoviesArray] = useState([])
    const location = useLocation();
    const [genre,setGenre] = useState(location.pathname.slice(1))
    const [movies,setMovies] = useState()
    const [top5Movies, setTop5Movies] = useState()

    const navigate = useNavigate()


    const fetchMovie = async () => {
        try{
            const most5MoviesByGenre = await getMost5MoviesByGenreName(genre)
            const moviesByGenre = await getMoviesByGenreName(genre) 

            if(most5MoviesByGenre){
                setTop5Movies(most5MoviesByGenre.data)
            }

            if(moviesByGenre){
                setMovies(moviesByGenre.data)
            }

        }catch(err){
            console.log(err)
        }      
    } 

    useEffect(()=>{
        fetchMovie();
    },[])

    useEffect(() => {
        setLengthItems(top5Movies?.length - 1);
    }, [top5Movies]);

    useEffect(() => {
        const reFreshSlider = () => {
            let items = document.querySelectorAll('.movie-slider .movie-slider-list .movie-slider-item');
            if (items.length > 0) {
                let checkLeft = items[active].offsetLeft;
                document.querySelector('.movie-slider .movie-slider-list').style.left = -checkLeft + 'px';
            }

            let lastActiveDot = document.querySelector('.movie-slider-dot li.active');
            if (lastActiveDot) lastActiveDot.classList.remove('active');

            let newActiveDot = document.querySelectorAll('.movie-slider-dot li')[active];
            if (newActiveDot) newActiveDot.classList.add('active');
        };

        reFreshSlider();

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
        if(genre != "Popular on HMovie"){
           let pathName = genre.charAt(0).toLowerCase() + genre.slice(1)
           window.location.href = `http://localhost:3000/${pathName}`
        }
    }

  return ( 
    <div className='movies-container'>      
        <div className="movie-slider">
           <div className='movie-slider-list'>
            {top5Movies?.map((movie,index) => {
                return (
                    <div key={index+movie.imdbId} className='movie-slider-item'>
                        <img src={movie.backDropUrl}></img>
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
                <div className='movie-slider-title' onClick={() => navigate(`/album/${top5Movies[active]?.slug}`)}>{top5Movies ? top5Movies[active]?.title : ''}</div>
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
                    <div className='movie-slider-playbutton'>
                        <FontAwesomeIcon size='3x' icon={faPlayCircle}></FontAwesomeIcon>
                    </div>

                    <div className='movie-slider-watchlater'>
                        <svg width="48px" height="48px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="Btn/Add/Normal" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <circle id="bg" fillOpacity="0.8" fill="#FFFFFF" cx="30" cy="30" r="30"></circle>
                                    <path d="M29.3055556,17.25 C29.6890866,17.25 30,17.5609134 30,17.9444444 L30,19.3888889 C30,19.77242 29.6890866,20.0833333 29.3055556,20.0833333 L22.9166667,20.0833333 L22.9166667,39.724 L28.6396082,34.9562398 C29.3713667,34.346441 30.4106369,34.302884 31.1863257,34.8255686 L31.3603918,34.9562398 L37.0833333,39.7254167 L37.0833333,33.5277778 C37.0833333,33.1442467 37.3942467,32.8333333 37.7777778,32.8333333 L39.2222222,32.8333333 C39.6057533,32.8333333 39.9166667,33.1442467 39.9166667,33.5277778 L39.9166667,41.2376789 C39.9166667,42.4112764 38.9652794,43.3627321 37.7916667,43.3627321 C37.3655561,43.3627321 36.9510168,43.2346313 36.6007867,42.9976358 L36.4312748,42.8701491 L30,37.50975 L23.5687252,42.8701491 C22.7234861,43.574515 21.4929682,43.5114751 20.7233835,42.7579578 L20.5758631,42.5980707 C20.3030814,42.2707327 20.1360669,41.8703014 20.0939154,41.4495208 L20.0833333,41.2376789 L20.0833333,20.0833333 C20.0833333,18.5896541 21.2391602,17.3659327 22.7052117,17.2577715 L22.9166667,17.25 L29.3055556,17.25 Z M39.2222222,17.25 C39.6057533,17.25 39.9166667,17.5609134 39.9166667,17.9444444 L39.9163333,21.499 L43.4722222,21.5 C43.8557533,21.5 44.1666667,21.8109134 44.1666667,22.1944444 L44.1666667,23.6388889 C44.1666667,24.02242 43.8557533,24.3333333 43.4722222,24.3333333 L39.9163333,24.333 L39.9166667,27.8888889 C39.9166667,28.27242 39.6057533,28.5833333 39.2222222,28.5833333 L37.7777778,28.5833333 C37.3942467,28.5833333 37.0833333,28.27242 37.0833333,27.8888889 L37.0823333,24.333 L33.5277778,24.3333333 C33.1442467,24.3333333 32.8333333,24.02242 32.8333333,23.6388889 L32.8333333,22.1944444 C32.8333333,21.8109134 33.1442467,21.5 33.5277778,21.5 L37.0823333,21.499 L37.0833333,17.9444444 C37.0833333,17.5609134 37.3942467,17.25 37.7777778,17.25 L39.2222222,17.25 Z" fill="#111319" fillRule="nonzero"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                
        </div>

        <div className='movie-polular-list-container' id='myDiv2'>
                    <h2 className='movie-polular-title'>{genre?.charAt(0).toUpperCase() + genre?.slice(1)}</h2>
                    <div className='movie-polular-list'>
                        {movies && movies?.map((movie) => {
                            return(
                        <div key={`moviesgenre${movie.imdbId}`} className='movie-polular-item'>            
                            <div className='movie-polular-item-image'>
                            <img src={movie?.postUrl}>
                                
                            </img>
                            <div className='movie-polular-item-rate'>
                                    <FontAwesomeIcon className='icon' size='2xs' icon={faStar}></FontAwesomeIcon>
                                    {movie?.rating}
                                </div>
                            </div>           
                                                            
                            <div className='movie-polular-item-title'>{movie?.title}</div>   
                            
                            <div className='movie-polular-item-detail'>
                            <div className='details-image-container'>
                                <img src={movie?.backDropUrl}></img>
                            </div>
                            <div className='details-info'>
                                <div className='details-info-title' onClick={() => {navigate(`/album/${movie.slug}`);console.log(movie.slug)}}>{movie.title}</div>
                                <div className='extra-details-info'>
                                    <div className='rate'>
                                        <FontAwesomeIcon size='xs' icon={faStar}></FontAwesomeIcon>
                                        {movie.rating}
                                    </div>
                                    <div className='date'>{movie.releaseDate}</div>
                                    <div className='duration'>{movie.duration}</div>
                                </div>
                                <div className='details-info-genres'>
                                    {movie?.genres && movie?.genres?.map((genre) => {
                                        return(
                                            <div className='item' onClick={() => handleNavigateMoviesGenre(genre)}>{genre}</div>
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
         
    </div>
  )
}

export default Movies