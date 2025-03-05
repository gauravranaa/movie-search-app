import React, { useState } from "react";
import axios from "axios";

const API_KEY = "YOUR_OMDB_API_KEY";  // Replace with your OMDb API Key
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies based on search query
  const searchMovies = async () => {
    if (!query) return;
    try {
      const response = await axios.get(`${API_URL}&s=${query}`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  // Fetch movie details
  const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}&i=${id}`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Movie Search App</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchMovies}>Search</button>

      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID} onClick={() => getMovieDetails(movie.imdbID)}>
              <img src={movie.Poster} alt={movie.Title} width="100" />
              <p>{movie.Title} ({movie.Year})</p>
            </li>
          ))}
        </ul>
      )}

      {selectedMovie && (
        <div>
          <h2>{selectedMovie.Title}</h2>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
        </div>
      )}
    </div>
  );
}

export default App;
