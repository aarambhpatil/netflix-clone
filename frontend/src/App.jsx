import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Homepage from "./pages/RootHomePage/Homepage";
import MoviePage from "./pages/RootHomePage/MoviePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MovieHomepage from "./pages/Movies/MovieHomepage";
import SpecificMoviePage from "./pages/Movies/SpecificMoviePage";
import TVShowHomepage from "./pages/TVShows/TVShowHomepage";
import SpecificTVShowPage from "./pages/TVShows/SpecificTVShowPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import AIRecommendations from "./pages/AIRecommendations";

const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/movies"} element={<MovieHomepage />} />
        <Route path={"/movie/:id"} element={<SpecificMoviePage />} />
        <Route path={"/tvshows"} element={<TVShowHomepage />} />
        <Route path={"/tvshows/:id"} element={<SpecificTVShowPage />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/ai-recommendations"} element={<AIRecommendations />} />
      </Routes>
    </div>
  );
};

export default App;
