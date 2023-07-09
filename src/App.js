import './App.css';
import {useEffect, useState} from "react";
import SearchIcon from "./search.svg";
import { MovieCard } from './MovieCard';

//83e4f3e
//4c8e762c

const API_URL = "http://www.omdbapi.com?apikey=4c8e762c";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByYear, setSortByYear] = useState(false);
  const [sortByName, setSortByName] = useState(false);

  const sortMoviesByYear = () => {
    let sortedMovies = [...movies];
  
    sortedMovies.sort((a, b) => {
      const yearA = parseInt(a.Year);
      const yearB = parseInt(b.Year);
  
      if (!sortByYear) {
        return yearA - yearB;
      } else {
        return yearB - yearA;
      }
    });
  
    setMovies(sortedMovies);
  };

  const sortMoviesByName = () => {
    let sortedMovies = [...movies];
  
    sortedMovies.sort((a, b) => {
      const nameA = a.Title.toLowerCase();
      const nameB = b.Title.toLowerCase();
  
      if (!sortByName) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  
    setMovies(sortedMovies);
  };
 
  const searchMovies = async (title) =>{
    const response = await fetch (`${API_URL}&s=${title}`);
    const data = await response.json();
    
    setMovies(data.Search);
  }

  useEffect(()=>{
    searchMovies("batman");
  },[]);

  return (
    <div className="app">
      <h1>Movie</h1>

      <div className="search">
        <input 
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt="searchIcon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      <div className="sortContainer">
          <button className="sortBtn"
            onClick={() => {
              setSortByYear(!sortByYear);
              sortMoviesByYear();
            }}>
            year
          </button>
          <button
              className="sortBtn"
              onClick={() => {
                setSortByName(!sortByName);
                sortMoviesByName();
              }}>
            name
          </button>
        </div>
        
      {
          movies?.length>0? (
          <div className="container">
            {movies.map((movie)=>(
              <MovieCard  movie={movie}/>
            ))}
          </div>): 
          (
          <div className='empty'>
            <h3>No movies found</h3>
          </div>
        )
      }

      
    </div>
  );
}

export default App;
