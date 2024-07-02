import axios from './axiosCustomize.js'


const addMovieToWatchList = (watchlistId,movieId,token) => {
    const data = {
        watchlistId:watchlistId,
        movieId:movieId
    }

    return axios.put('api/v1/watchlist/add',data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

const getAuthenticatedUserWatchList = (token) => {
    return axios.get('api/v1/watchlist/user',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

const checkMovieInWatchList = (watchlistId,movieId,token) => {
    return axios.get(`api/v1/watchlist/check?watchlistId=${watchlistId}&movieId=${movieId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export {addMovieToWatchList,checkMovieInWatchList,getAuthenticatedUserWatchList}