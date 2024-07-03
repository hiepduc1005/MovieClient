import React, { useEffect, useState } from 'react'
import './Search.css'
import { getMovieBySearch } from '../../api/MovieApi'
import { useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [movies, setMovies] = useState([])

    const [searchParams] = useSearchParams();
    const query = searchParams.get('s');

    const handleGetMovieByQuery = async (query, page) => {
        try {
            const response = await getMovieBySearch(query, page, 10);
            if (response) {
                setMovies(response.data.content)
                setTotalPage(response?.data?.page?.totalPages) // assuming totalPages is the correct field from your API response
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleClickNext = () => {
        if(currentPage < totalPage){
            setCurrentPage(currentPage+1)
        }
    }

    const handleClickPrev = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage-1)
        }
    }

    const handleClickPage = (page) => {
        console.log(page)
        setCurrentPage(page);
    }

    useEffect(() => {
        if (query) {
            handleGetMovieByQuery(query, currentPage)
        } else {
            handleGetMovieByQuery('', currentPage)
        }
    }, [query, currentPage])

    return (
        <div className='search-container'>
            <div className='search-title'>The following results are found based on your search “{query}”.</div>
            <div className='movie-list'>
                <div className='movie-search-list'>
                    {movies?.map((movie, index) => (
                        <div className='item' key={`movie-search${movie.id}`}>
                            <img className='img' src={movie?.postUrl} alt={movie?.title}></img>
                            <div className='item-info'>
                                <div className='title'>{movie?.title}</div>
                                <div className='date'><span>Year:</span>{movie?.releaseDate}</div>
                                <div className='director'><span>Director:</span>Updating</div>
                                <div className='cast'><span>Cast:</span>Updating</div>
                                <div className='episode-container'>
                                    {movie?.episodes?.map((episode, index) => (
                                        <div key={`episode-search-item${episode?.id}`} className='episode-item'>{episode?.episodeNumber}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='movie-hot-list'></div>
            <div className='pagination-container'>
                <FontAwesomeIcon onClick={() => handleClickPrev()} size='1x' className='page-item-icon' icon={faAngleLeft}></FontAwesomeIcon>
                {Array.from({length: totalPage} , (_,index) => {
                    return (
                        <div className={`page-item ${(currentPage === index+1) ? 'page-active' : ''}`} onClick={() => handleClickPage(index+1)}>{index+1}</div>
                    )
                })}
                <FontAwesomeIcon onClick={() => handleClickNext()} size='1x' className='page-item-icon' icon={faAngleRight}></FontAwesomeIcon>
            </div>
            </div>
        </div>
    )
}

export default Search
