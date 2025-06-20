import { Search } from "lucide-react";
import Logo from "../assets/LETSFLIX_logo.png";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
      <Link to="/">
        <img
          src={Logo}
          alt="Logo"
          className="w-24 cursor-pointer brightness-125"
        />
      </Link>
      <ul className="hidden xl:flex space-x-6">
        <Link to="/">
          <li className="cursor-pointer hover:text-[#e50914]">Home</li>
        </Link>
        <Link to="/tvshows">
          <li className="cursor-pointer hover:text-[#e50914]">TV Shows</li>
        </Link>
        <Link to="/movies">
          <li className="cursor-pointer hover:text-[#e50914]">Movies</li>
        </Link>
        <li className="cursor-pointer hover:text-[#e50914]">Anime</li>
        <li className="cursor-pointer hover:text-[#e50914]">Games</li>
        <li className="cursor-pointer hover:text-[#e50914]">New & Popular</li>
        <li className="cursor-pointer hover:text-[#e50914]">Upcoming</li>
      </ul>
      <div className="flex items-center space-x-4 relative">
        <div className="relative hidden md:inline-flex ">
          <input
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
            type="text"
            placeholder="Search"
          />
          <Search className="absolute top-2 right-4 w-5 h-5" />
        </div>
        <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer">
          Get AI Movie Picks
        </button>
        <Link to={"/signin"}>
          <button className="border border-[#123123] py2 px-4 cursor-pointer">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
