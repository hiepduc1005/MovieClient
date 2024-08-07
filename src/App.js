import './App.css';
import './responsive.css'
import {Routes , Route,  useLocation} from "react-router-dom"
import Layout from './Layout';
import Header from './components/header/Header';
import Homepage from './components/homepage/Homepage';
import { get5TopRatedMovie, getTop10RatedMovie } from './api/MovieApi';
import { useEffect, useState } from 'react';
import Movies from './components/moviesgenre/Movies';
import Footer from './components/footer/Footer';
import MovieDetails from './components/moviedetails/MovieDetails';
import MoviePlay from './components/movieplay/MoviePlay';
import Cookies from 'js-cookie';
import { getAuthenticatedUser } from './api/UserApi';
import AccountInfo from './components/account/AccountInfo';
import Search from './components/search/Search';
import { useCookies } from 'react-cookie';

function App() {
  const [top5Movies, setTop5Movies] = useState();
  const [top10Movies, setTop10Movies] = useState();
  const [user,setUser] = useState()
  const [cookies, setCookie] = useCookies(['token']);
  const location = useLocation();
  const [token,setToken] = useState()

  useEffect(() => {
    const tokenFromCookies = Cookies.get("token");
    
    if (tokenFromCookies) {
      setToken(tokenFromCookies);
      console.log(tokenFromCookies)
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const encodedToken = searchParams.get('t');

    if (encodedToken) {
      try {
        const decodedToken = decodeURIComponent(atob(encodedToken));
        setCookie('token', decodedToken, { path: '/', secure: true, sameSite: 'none', maxAge: 86400 * 30 ,httpOnly:false});
        searchParams.delete('t');
        const newUrl = `${location.pathname}${searchParams.toString() ? `? ${searchParams.toString()}` : ''}`;
        window.history.replaceState({}, document.title, newUrl); 
        setToken(decodedToken)
      } catch (error) {
        console.error('Error decoding or setting token:', error);
      }
    }
  },[location.search, setCookie])
  
  const fetchAuthenticatedUser= async (token) => {
      try {
          let userData = await getAuthenticatedUser(token);
          if(userData) {
              setUser(userData.data)
          }
      } catch (error) {
          console.error("Error fetching authenticated user:", error);
      }
  };
  
  useEffect(() => {
    if(token){
      fetchAuthenticatedUser(token)
    }  
  }, [token]);
 
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
      <Header user={user}></Header>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Homepage top5Movies={top5Movies}
                                             top10Movies={top10Movies}
                                             user={user}
                                             token={token} />}/>
          
          <Route path="/:genre" element={<Movies/>}></Route>
            
          <Route path="/album/:slug" element={<MovieDetails
                                              user={user}
                                              token={token}/>}/>

          <Route path='/play/:slugEpisode' element={<MoviePlay top10Movies={top10Movies}
                                                               token={token}
                                                               user={user}  
                                                    ></MoviePlay>}></Route>
          <Route path='/account' element={<AccountInfo
                                          user={user}
                                          token={token}
                                         />}></Route>
          <Route path='/search' element={<Search></Search>}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
