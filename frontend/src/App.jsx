import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Homepage from './pages/RootHomePage/Homepage'
import MoviePage from './pages/RootHomePage/MoviePage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MovieHomepage from './pages/Movies/MovieHomepage'
import SpecificMoviePage from './pages/Movies/SpecificMoviePage'
import TVShowHomepage from './pages/TVShows/TVShowHomepage'
import SpecificTVShowPage from './pages/TVShows/SpecificTVShowPage'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homepage />}/>
        <Route path={"/movies"} element={<MovieHomepage />}/>
        <Route path={"/movie/:id"} element={<SpecificMoviePage />}/>
        <Route path={"/tvshows"} element={<TVShowHomepage />}/>
        <Route path={"/tvshows/:id"} element={<SpecificTVShowPage />}/>
        <Route path={"/signin"} element={<SignIn />}/>
        <Route path={"/signup"} element={<SignUp />}/>
      </Routes>
    </div>
  )
}

export default App