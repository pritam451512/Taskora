import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useAuth } from "../context/AuthContext";

function Settings() {
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-72">

        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="p-8">

          <h1 className="text-3xl font-bold text-slate-900 mb-8">
            Settings
          </h1>

          {/* Account */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">

            <h2 className="text-xl font-semibold mb-5">
              Account Information
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <p className="font-semibold">
                  {user?.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-semibold">
                  {user?.email}
                </p>
              </div>

            </div>

          </div>

          {/* Preferences */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">

            <h2 className="text-xl font-semibold mb-5">
              Preferences
            </h2>

            <div className="flex items-center justify-between py-3 border-b">

              <span>Email Notifications</span>

              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 accent-emerald-500"
              />

            </div>

            <div className="flex items-center justify-between py-3">

              <span>Dark Mode</span>

              <input
                type="checkbox"
                disabled
                className="w-5 h-5"
              />

            </div>

          </div>

          {/* Logout */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-5">
              Account
            </h2>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
            >
              Logout
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;