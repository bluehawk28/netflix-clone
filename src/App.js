import React from "react";
import "./App.scss";
import requests from "./requests";
import Banner from "./components/Banner/Banner";
import ContentRow from "./components/ContentRow/ContentRow";

function App() {
  return (
    <div className="App">
      <Banner />
      <ContentRow
        title="NETFLIX ORIGINALS"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <ContentRow title="Trending Now" fetchURL={requests.fetchTrendingNow} />
      <ContentRow title="Top Rated" fetchURL={requests.fetchTopRated} />
      <ContentRow title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <ContentRow title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <ContentRow title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <ContentRow
        title="Romance Movies"
        fetchURL={requests.fetchRomanceMovies}
      />
      <ContentRow
        title="Documentaries"
        fetchURL={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default App;
