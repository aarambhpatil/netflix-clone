import MovieCardList from "../../components/MovieCardList";
import Footer from "../../components/Footer";
import MovieHero from "../../components/HeroComponents/MovieHero";

const MovieHomepage = () => {
  return (
    <div className="p-5">
      <MovieHero />
      <MovieCardList title="Now Playing" category="now_playing" />
      <MovieCardList title="Top Rated" category="top_rated" />
      <MovieCardList title="Popular" category="popular" />
      <MovieCardList title="Upcoming" category="upcoming" />
      <Footer />
    </div>
  );
};

export default MovieHomepage;
