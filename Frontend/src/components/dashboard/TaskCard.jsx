import {
  FaCheckCircle,
  FaRegCircle,
  FaCalendarAlt,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import dayjs from "dayjs";
import { useTask } from "../../context/TaskContext";

function TaskCard({ task, onEdit }) {
  const { removeTask } = useTask();

  const statusColor = {
    Pending: "bg-orange-100 text-orange-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-emerald-100 text-emerald-700",
  };

  const handleDelete = async () => {
    const ok = window.confirm(
      "Delete this task?"
    );

    if (!ok) return;

    await removeTask(task._id);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

        {/* Left */}

        <div className="flex gap-4 flex-1">

          <div className="mt-1">

            {task.status === "Completed" ? (
              <FaCheckCircle className="text-emerald-500 text-2xl" />
            ) : (
              <FaRegCircle className="text-slate-400 text-2xl" />
            )}

          </div>

          <div className="flex-1">

            <h3 className="text-xl font-bold text-slate-900">

              {task.title}

            </h3>

            <p className="text-slate-500 mt-2 leading-relaxed">

              {task.description || "No description"}

            </p>

            {task.dueDate && (

              <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">

                <FaCalendarAlt />

                {dayjs(task.dueDate).format(
                  "DD MMM YYYY"
                )}

              </div>

            )}

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col lg:items-end gap-4">

          <div className="flex gap-2 flex-wrap">

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor[task.status]}`}
            >
              {task.status}
            </span>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${priorityColor[task.priority]}`}
            >
              {task.priority}
            </span>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => onEdit(task)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
            >
              <FaEdit />
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <FaTrash />
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TaskCard;