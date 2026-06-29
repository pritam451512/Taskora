import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import logo from "../../assets/taskora.png"; // apna file name

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">

      <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="Taskora"
            className="h-11 w-auto object-contain"
          />

          <h1 className="text-2xl font-bold text-slate-900">
            Taskora
          </h1>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex items-center gap-8">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-500 font-semibold"
                : "text-slate-700 hover:text-emerald-500 transition"
            }
          >
            Home
          </NavLink>

          {location.pathname === "/" ? (
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer text-slate-700 hover:text-emerald-500 transition"
            >
              Features
            </ScrollLink>
          ) : (
            <Link
              to="/"
              className="text-slate-700 hover:text-emerald-500 transition"
            >
              Features
            </Link>
          )}

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-500 font-semibold"
                : "text-slate-700 hover:text-emerald-500 transition"
            }
          >
            Login
          </NavLink>

          <Link
            to="/register"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
          >
            Get Started
          </Link>

        </nav>

        {/* Mobile Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-3xl text-slate-800"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden lg:hidden transition-all duration-300 ${
          isOpen ? "max-h-96 border-t border-slate-200" : "max-h-0"
        }`}
      >
        <div className="bg-white flex flex-col gap-5 px-5 py-6">

          <NavLink
            to="/"
            onClick={closeMenu}
            className="text-slate-700"
          >
            Home
          </NavLink>

          {location.pathname === "/" ? (
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-80}
              onClick={closeMenu}
              className="cursor-pointer text-slate-700"
            >
              Features
            </ScrollLink>
          ) : (
            <Link
              to="/"
              onClick={closeMenu}
              className="text-slate-700"
            >
              Features
            </Link>
          )}

          <NavLink
            to="/login"
            onClick={closeMenu}
            className="text-slate-700"
          >
            Login
          </NavLink>

          <Link
            to="/register"
            onClick={closeMenu}
            className="bg-emerald-500 text-white rounded-xl py-3 text-center font-medium"
          >
            Get Started
          </Link>

        </div>
      </div>

    </header>
  );
}

export default Navbar;