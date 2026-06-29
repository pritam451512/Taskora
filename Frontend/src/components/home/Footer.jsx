import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-5 py-16">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold">
              Taskora
            </h2>

            <p className="mt-4 text-slate-400 leading-7">
              A modern task management application
              built using the MERN Stack.
            </p>

          </div>

          {/* Links */}

          <div>

            <h3 className="font-semibold text-xl mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link to="/">Home</Link>

              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="font-semibold text-xl mb-5">
              Connect
            </h3>

            <div className="flex gap-5 text-2xl">

              <FaGithub className="hover:text-emerald-400 cursor-pointer transition" />

              <FaLinkedin className="hover:text-emerald-400 cursor-pointer transition" />

              <FaTwitter className="hover:text-emerald-400 cursor-pointer transition" />

            </div>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">

          © {new Date().getFullYear()} Taskora. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;