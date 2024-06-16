import './App.css';
import {Routes , Route} from "react-router-dom"
import Layout from './Layout';
import Header from './components/header/Header';
import Homepage from './components/homepage/Homepage';
import { get5TopRatedMovie } from './api/MovieApi';
import { useEffect, useState } from 'react';

function App() {
  const [top5Movies, setTop5Movies] = useState();

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

 useEffect(()=>{
  fetchTop5RatedMovie();
 },[])

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Homepage top5Movies={top5Movies}/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
