import TVShowCardList from "../../components/TVShowCardList";
import Footer from "../../components/Footer";
import TVShowHero from "../../components/HeroComponents/TVShowsHero";

const TVShowHomepage = () => {
  return (
    <div className="p-5">
      <TVShowHero />
      <TVShowCardList title="Airing Today" category="airing_today" />
      <TVShowCardList title="On the Air" category="on_the_air" />
      <TVShowCardList title="Popular" category="popular" />
      <TVShowCardList title="Top Rated" category="top_rated" />
      <Footer />
    </div>
  );
};

export default TVShowHomepage;
