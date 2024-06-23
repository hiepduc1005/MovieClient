import './App.css';
import {Routes , Route} from "react-router-dom"
import Layout from './Layout';
import Header from './components/header/Header';
import Homepage from './components/homepage/Homepage';
import { get5TopRatedMovie, getTop10RatedMovie } from './api/MovieApi';
import { useEffect, useState } from 'react';
import Movies from './components/moviesgenre/Movies';
import Footer from './components/footer/Footer';
import MovieDetails from './components/moviedetails/MovieDetails';
import MoviePlay from './components/movieplay/MoviePlay';

function App() {
  const [top5Movies, setTop5Movies] = useState();
  const [top10Movies, setTop10Movies] = useState();

  const fetchTop5RatedMovie = async () => {
    try{
      const res = await get5TopRatedMovie();
      if(res && res.data){
        setTop5Movies(res.data)
      }
    }
    catch(err){
      console.log(err)
    }
    
 }

 const fetchTop10Movies = async () => {
  try{
  
    const res = await getTop10RatedMovie();
    if(res && res.data){
      setTop10Movies(res.data)
    }
  }
  catch(err){
    console.log(err)
  }
 }

 useEffect(()=>{
  fetchTop5RatedMovie();
  fetchTop10Movies();
 },[])


  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Homepage top5Movies={top5Movies}
                                             top10Movies={top10Movies} />}></Route>
          <Route path="/:genre" element={<Movies/>}></Route>
          <Route path="/album/:slug" element={<MovieDetails/>}></Route>
          <Route path='/play/:slugEpisode' element={<MoviePlay top10Movies={top10Movies}></MoviePlay>}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
