import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useAuth } from "../context/AuthContext";
import { useTask } from "../context/TaskContext";
import { useState } from "react";

function Profile() {
  const { user } = useAuth();
  const { tasks } = useTask();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

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

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

            <div className="flex flex-col md:flex-row items-center gap-8">

              <div className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center text-5xl text-white font-bold">

                {user?.name?.charAt(0).toUpperCase()}

              </div>

              <div>

                <h1 className="text-4xl font-bold">

                  {user?.name}

                </h1>

                <p className="text-slate-500 mt-2">

                  {user?.email}

                </p>

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            <Card title="Total Tasks" value={tasks.length} />

            <Card title="Completed" value={completed} />

            <Card title="Pending" value={pending} />

            <Card
              title="High Priority"
              value={highPriority}
            />

          </div>

        </div>

      </main>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

      <h3 className="text-slate-500">
        {title}
      </h3>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>

    </div>
  );
}

export default Profile;