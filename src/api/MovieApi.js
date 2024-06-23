import axios from './axiosCustomize.js'

const get5TopRatedMovie = () => {
    return axios.get("/api/v1/movie/top5");
}

const getTop10RatedMovie = () => {
    return axios.get("/api/v1/movie/top10")
}

const getTop14RatedMovie = () => {
    return axios.get("/api/v1/movie/top14")
}

const getAnimeMovies = () => {
    return axios.get("/api/v1/movie/anime")
}

const getActionMovies = () => {
    return axios.get("/api/v1/movie/action")
}

const getComedyMovies = () => {
    return axios.get("/api/v1/movie/comedy")
}

const getDramaMovies = () => {
    return axios.get("/api/v1/movie/drama")
}

const getMoviesByGenreName = (genreName) => {
    return axios.get(`/api/v1/movie/genre/${genreName}`);
}

const getMost5MoviesByGenreName = (genreName) => {
    return axios.get(`/api/v1/movie/genre/${genreName}/top5`);
}

const getMovieBySlug = (slug) => {
    return axios.get(`/api/v1/movie/slug/${slug}`)
}

const getMovieEpisodeBySlug = (slug) => {
    return axios.get(`/api/v1/episode/slug/${slug}`)
}

export {get5TopRatedMovie ,
        getTop10RatedMovie ,
        getActionMovies ,
        getAnimeMovies,
        getComedyMovies,
        getDramaMovies, 
        getMoviesByGenreName,getMost5MoviesByGenreName,getMovieBySlug,getMovieEpisodeBySlug,getTop14RatedMovie}