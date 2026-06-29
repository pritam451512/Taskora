import api from "../api/axios";

export const getTasks = (params = {}) => {
  return api.get("/tasks", {
    params,
  });
};

export const createTask = (data) =>
  api.post("/tasks", data);

export const updateTask = (id, data) =>
  api.patch(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);