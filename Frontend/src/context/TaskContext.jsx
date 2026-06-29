import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/task.service";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // ================= Fetch Tasks =================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await getTasks({
        search,
        status: statusFilter,
        priority: priorityFilter,
      });

      setTasks(res.data.data.tasks);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= Add Task =================

  const addTask = async (taskData) => {
    try {
      const res = await createTask(taskData);

      setTasks((prev) => [res.data.data, ...prev]);

      toast.success(res.data.message);

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create task"
      );

      return false;
    }
  };

  // ================= Edit Task =================

  const editTask = async (id, taskData) => {
    try {
      const res = await updateTask(id, taskData);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? res.data.data : task
        )
      );

      toast.success(res.data.message);

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update task"
      );

      return false;
    }
  };

  // ================= Delete Task =================

  const removeTask = async (id) => {
    try {
      await deleteTask(id);

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );

      toast.success("Task Deleted Successfully");

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete task"
      );

      return false;
    }
  };

  // ================= Effects =================

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter, priorityFilter]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,

        search,
        setSearch,

        statusFilter,
        setStatusFilter,

        priorityFilter,
        setPriorityFilter,

        fetchTasks,
        addTask,
        editTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);