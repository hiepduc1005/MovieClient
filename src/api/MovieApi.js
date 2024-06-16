import axios from './axiosCustomize.js'

const get5TopRatedMovie = () => {
    return axios.get("/api/v1/movie/top5");
}

export {get5TopRatedMovie}