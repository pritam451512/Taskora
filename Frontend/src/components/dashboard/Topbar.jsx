import {
  FaBars,
  FaBell,
  FaSearch,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useTask } from "../../context/TaskContext";

function Topbar({ onMenuClick }) {
  const { user } = useAuth();

  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
  } = useTask();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">

      <div className="h-20 px-6 flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={onMenuClick}
            className="lg:hidden text-2xl text-slate-700"
          >
            <FaBars />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">

              {greeting},{" "}

              <span className="text-emerald-500">
                {user?.name?.split(" ")[0] || "User"}
              </span>

              👋

            </h1>

            <p className="text-sm text-slate-500">
              Stay productive and finish today's tasks.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Search */}

          <div className="hidden lg:flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3 w-72">

            <FaSearch className="text-slate-400" />

            <input
              type="text"
              placeholder="Search task..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="bg-transparent outline-none w-full text-sm"
            />

          </div>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="hidden xl:block bg-slate-100 rounded-xl px-4 py-3 outline-none"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Completed">
              Completed
            </option>
          </select>

          {/* Priority */}

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="hidden xl:block bg-slate-100 rounded-xl px-4 py-3 outline-none"
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Notification */}

          <button className="relative w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 transition">

            <FaBell className="mx-auto text-slate-700" />

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>

          </button>

          {/* Avatar */}

          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold shadow">

            {user?.name?.charAt(0).toUpperCase() || "U"}

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;