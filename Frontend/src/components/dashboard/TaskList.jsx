import { useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import { useTask } from "../../context/TaskContext";

function TaskList() {
  const { tasks, loading } = useTask();

  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = () => {
    setSelectedTask(null);
    setOpenModal(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-600">
          Loading Tasks...
        </h2>
      </div>
    );
  }

  return (
    <>
      <section className="mt-10">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              My Tasks
            </h2>

            <p className="text-slate-500 mt-2">
              Total Tasks :{" "}
              <span className="font-semibold">
                {tasks.length}
              </span>
            </p>

          </div>

          <button
            onClick={handleAddTask}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition"
          >
            + Add New Task
          </button>

        </div>

        {/* Empty State */}

        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center shadow-sm">

            <h2 className="text-2xl font-bold text-slate-700">
              No Tasks Found
            </h2>

            <p className="text-slate-500 mt-3 mb-6">
              Start by creating your very first task.
            </p>

            <button
              onClick={handleAddTask}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl"
            >
              Create Task
            </button>

          </div>
        ) : (
          <div className="space-y-6">

            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
              />
            ))}

          </div>
        )}

      </section>

      <AddTaskModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        task={selectedTask}
      />
    </>
  );
}

export default TaskList;