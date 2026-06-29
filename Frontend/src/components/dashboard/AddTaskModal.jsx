import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTask } from "../../context/TaskContext";

function AddTaskModal({ isOpen, onClose, task }) {
  const { addTask, editTask } = useTask();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        dueDate: "",
      });
    }
  }, [task, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    let success = false;

    if (task) {
      success = await editTask(task._id, data);
    } else {
      success = await addTask(data);
    }

    if (success) {
      reset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          {task ? "Edit Task" : "Create Task"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Task Title"
            {...register("title", { required: true })}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <textarea
            rows="4"
            placeholder="Description"
            {...register("description")}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="grid grid-cols-2 gap-4">

            <select
              {...register("status")}
              className="border border-slate-300 rounded-xl px-4 py-3"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <select
              {...register("priority")}
              className="border border-slate-300 rounded-xl px-4 py-3"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

          </div>

          <input
            type="date"
            {...register("dueDate")}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {isSubmitting
                ? task
                  ? "Updating..."
                  : "Creating..."
                : task
                ? "Update Task"
                : "Create Task"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddTaskModal;