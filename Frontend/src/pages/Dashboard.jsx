import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";
import TaskList from "../components/dashboard/TaskList";
import { useTask } from "../context/TaskContext";
import { useState } from "react";

function Dashboard() {
  const { tasks } = useTask();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
 ).length;

 const [sidebarOpen, setSidebarOpen] = useState(false);
 

  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>

      <main className="lg:ml-72">

        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-5 lg:p-8">

          {/* Heading */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Here's an overview of your productivity today.
            </p>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="Total Tasks"
              value={totalTasks}
              color="text-blue-600"
            />

            <StatCard
              title="Completed"
              value={completedTasks}
              color="text-green-600"
            />

            <StatCard
              title="Pending"
              value={pendingTasks}
              color="text-yellow-500"
            />

            <StatCard
              title="High Priority"
              value={highPriorityTasks}
              color="text-red-500"
            />

          </div>

          {/* Quick Overview */}

          <div className="grid lg:grid-cols-3 gap-6 mt-8">

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

              <h2 className="font-bold text-xl mb-4">
                Productivity
              </h2>

              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width:
                      totalTasks === 0
                        ? "0%"
                        : `${(completedTasks / totalTasks) * 100}%`,
                  }}
                ></div>

              </div>

              <p className="mt-4 text-slate-500">

                {completedTasks} of {totalTasks} tasks completed

              </p>

            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

              <h2 className="font-bold text-xl mb-2">

                Welcome Back 👋

              </h2>

              <p className="text-slate-500">

                Stay focused and finish today's goals. Small progress every day
                leads to big success.

              </p>

            </div>

          </div>

          {/* Task List */}

          <TaskList />

        </div>

      </main>

    </div>
  );
}

export default Dashboard;