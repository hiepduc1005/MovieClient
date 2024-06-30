import axios from './axiosCustomize.js'

const addMovieToHistory = (userId,movieId,episodeNumber,token) => {
    const data = {
        userId : userId,
        movieId : movieId,
        episodeNumber : episodeNumber
    }

    return axios.put("api/v1/watch-history/movie",data, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export {addMovieToHistory}