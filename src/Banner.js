import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          // random netflix original chosen for banner
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        {/* {title} */}
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* {div > 2 buttons} */}
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        {/* {description} */}
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>

        <div className="banner-fadeBottom" />
      </div>
    </header>
  );
}

export default Banner;
