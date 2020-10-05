import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./banner.scss";
import requests from "../../requests";
import { WaveLoading } from "react-loadingg";
import NavBar from "../NavBar/NavBar";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      if (request.data) {
        setShowSpinner(false);
      }
      let randomSelection = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      setMovie(request.data.results[randomSelection]);
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str && str.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return showSpinner ? (
    <WaveLoading />
  ) : (
    <>
      <NavBar />
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "center center"
        }}
      >
        <div className="banner__content">
          <h1 className="title">
            {movie.name || movie.title || movie.original_name}
          </h1>
          <div className="banner-buttons">
            <button className="button">Play</button>
            <button className="button">More Info</button>
          </div>
          <h1 className="description">{truncate(movie.overview, 150)}</h1>
        </div>
        <div className="banner-fadeBottom"></div>
      </header>
    </>
  );
}

export default Banner;
