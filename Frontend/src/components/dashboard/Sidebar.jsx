import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import logo from "../../assets/taskora.png";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      >
        {/* Logo */}

        <div className="h-20 border-b border-slate-200 flex items-center justify-between px-7">

          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt="Taskora"
              className="w-11 h-11 rounded-xl shadow-sm"
            />

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Taskora
              </h2>

              <p className="text-xs text-slate-500">
                Manage Everything
              </p>
            </div>

          </div>

          {/* Mobile Close */}

          <button
            onClick={onClose}
            className="lg:hidden text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}

        <nav className="flex-1 px-5 py-8 space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <span className="text-lg">
                {item.icon}
              </span>

              {item.name}
            </NavLink>
          ))}

        </nav>

        {/* User */}

        <div className="border-t border-slate-200 p-5">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-lg">

              {user?.name?.charAt(0).toUpperCase() || "U"}

            </div>

            <div className="overflow-hidden">

              <h3 className="font-semibold text-slate-900 truncate">
                {user?.name || "User"}
              </h3>

              <p className="text-sm text-slate-500 truncate">
                {user?.email}
              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 py-3 font-medium transition"
          >
            <FaSignOutAlt />

            Logout
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;