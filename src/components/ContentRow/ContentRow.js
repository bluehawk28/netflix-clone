import React, { useState, useEffect } from "react";
import "./content-row.scss";
import axios from "../../axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { WaveLoading } from "react-loadingg";

const base_url = "https://image.tmdb.org/t/p/original/";

function ContentRow({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const request = fetchURL && (await axios.get(fetchURL));
      if (request.data) {
        setShowSpinner(false);
      }
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  };

  const handleClick = movie => {
    if (trailerURL) {
      setTrailerURL("");
    } else {
      movieTrailer(movie.title || movie.name)
        .then(url => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className="row">
      {showSpinner ? (
        <WaveLoading />
      ) : (
        <>
          <div className="title">{title}</div>
          <div className="row__posters">
            {movies.length &&
              movies.map(movie => {
                return (
                  (movie.backdrop_path || movie.poster_path) && (
                    <img
                      key={movie.id}
                      onClick={() => handleClick(movie)}
                      className={`poster ${isLargeRow && "poster-large"}`}
                      src={`${base_url}${
                        isLargeRow
                          ? movie.poster_path
                          : movie.backdrop_path || movie.poster_path
                      }
              `}
                      alt={movie.name}
                    />
                  )
                );
              })}
          </div>
          {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
        </>
      )}
    </div>
  );
}

export default ContentRow;
