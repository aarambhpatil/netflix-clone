import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import MoviePage from './pages/MoviePage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homepage />}/>
        <Route path={"/movie/:id"} element={<MoviePage />}/>
        <Route path={"/signin"} element={<SignIn />}/>
        <Route path={"/signup"} element={<SignUp />}/>
      </Routes>
    </div>
  )
}

export default App