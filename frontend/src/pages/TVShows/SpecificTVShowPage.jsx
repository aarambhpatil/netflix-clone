import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const SpecificTVShowPage = () => {
  const { id } = useParams();
  const [tvshow, setTVShow] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  const movieUrl = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  const recommendationUrl = `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`;
  const trailerUrl = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    fetch(movieUrl, options)
      .then((res) => res.json())
      .then((res) => setTVShow(res))
      .catch((err) => console.error(err));

    fetch(recommendationUrl, options)
      .then((res) => res.json())
      .then((res) => setRecommendations(res.results || []))
      .catch((err) => console.error(err));

    fetch(trailerUrl, options)
      .then((res) => res.json())
      .then((res) => {
        const trailer = res.results?.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setTrailerKey(trailer?.key || null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!tvshow) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl text-red-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181818] text-white">
      <div
        className="relative h-[60vh] flex item-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${tvshow.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
        <div className="relative z-10 flex items-end p-8 gap-8">
          <img
            src={`https://image.tmdb.org/t/p/original${tvshow.poster_path}`}
            className="rounded-lg shadow-lg w-48 hidden md:block"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{tvshow.name}</h1>
            <div className="flex items-center gap-4 mb-2">
              <span>Rating: {tvshow.vote_average?.toFixed(1)}</span>
              <span>{tvshow.release_date}</span>
              <span>{tvshow.episode_run_time} episodes</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {tvshow.genres.map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="max-w-2xl text-gray-200">{tvshow.overview}</p>
            <div className="w-37">
              <Link
                to={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
              >
                <button className="flex justify-center items-center bg-[#e50914] hover:bg-gray-200 w-full text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4">
                  <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" />
                  Watch Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>
        <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ul className="text-gray-300 space-y-3">
              <li>
                <span className="font-semibold text-white">Status:</span>
                <span className="ml-2">{tvshow.status}</span>
              </li>
              <li>
                <span className="font-semibold text-white">Release Date: </span>
                <span className="ml-2">{tvshow.release_date}</span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Original Language:{" "}
                </span>
                <span className="ml-2">
                  {tvshow.original_language?.toUpperCase()}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Budget: </span>
                <span className="ml-2">
                  {tvshow.budget ? `$${tvshow.budget.toLocaleString()}` : "NA"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Revenue: </span>
                <span className="ml-2">
                  {tvshow.budget ? `$${tvshow.revenue.toLocaleString()}` : "NA"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Production Companies:{" "}
                </span>
                <span className="ml-2">
                  {tvshow.production_companies &&
                  tvshow.production_companies.length > 0
                    ? tvshow.production_companies.map((c) => c.name).join(", ")
                    : "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Spoken Languages:{" "}
                </span>
                <span className="ml-2">
                  {tvshow.spoken_languages && tvshow.spoken_languages.length > 0
                    ? tvshow.spoken_languages
                        .map((c) => c.english_name)
                        .join(", ")
                    : "N/A"}
                </span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2">Tagline</h3>
            <p className="italic text-gray-400 mb-6">
              {tvshow.tagline || "No tagline available"}
            </p>
            <h3 className="font-semibold text-white mb-2">Overview</h3>
            <p className="text-gray-200">{tvshow.overview}</p>
          </div>
        </div>
      </div>
      {recommendations.length > 0 && (
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">
            You might also like...
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {recommendations.slice(0, 10).map((rec) => (
              <div
                key={rec.id}
                className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition"
              >
                <Link to={`/tvshows/${rec.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${rec.poster_path}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-semibold">{rec.title}</h3>
                    <span className="text-xs text-gray-400">
                      {rec.release_date?.slice(0, 4)}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecificTVShowPage;
