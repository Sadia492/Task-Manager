import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

export default function Dashboard() {
  const [category, setCategory] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  console.log(category);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const timestamp = new Date();

    const taskData = { title, description, category, timestamp };

    console.log(taskData);

    const { data } = await axiosPublic.post("/tasks", taskData);
    if (data.insertedId) {
      toast.success("Task added successfully");
    }
    form.reset();
  };

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await axiosPublic.get("/tasks");
      setTasks(data);
    };
    fetchTask();
  }, []);

  const toDoTasks = tasks.filter((task) => task.category === "To-Do");
  const inProgressTasks = tasks.filter(
    (task) => task.category === "In Progress"
  );
  const doneTasks = tasks.filter((task) => task.category === "Done");
  console.log(toDoTasks, inProgressTasks, doneTasks);
  //   console.log(data);
  return (
    <div className="flex flex-col items-center w-full mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add a New Task
        </h2>

        {/* Form in Horizontal Layout */}
        <div className="flex gap-6 mb-6">
          <div className="flex-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              maxLength={50}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (optional)
            </label>
            <textarea
              name="description"
              maxLength={200}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg "
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Task Categories */}
      <div className="w-full max-w-6xl mt-10 grid grid-cols-3 gap-8">
        {/* To-Do Tasks */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">To-Do</h3>
          {toDoTasks.map((task, index) => (
            <div key={index} className="bg-white p-4 mb-4 rounded-lg shadow-sm">
              <h4 className="font-semibold">{task.title}</h4>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">Category: {task.category}</p>
              <p className="text-sm text-gray-500">Created: {task.timestamp}</p>
            </div>
          ))}
        </div>

        {/* In Progress Tasks */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">In Progress</h3>
          {inProgressTasks.map((task, index) => (
            <div key={index} className="bg-white p-4 mb-4 rounded-lg shadow-sm">
              <h4 className="font-semibold">{task.title}</h4>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">Category: {task.category}</p>
              <p className="text-sm text-gray-500">Created: {task.timestamp}</p>
            </div>
          ))}
        </div>

        {/* Done Tasks */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Done</h3>
          {doneTasks.map((task, index) => (
            <div key={index} className="bg-white p-4 mb-4 rounded-lg shadow-sm">
              <h4 className="font-semibold">{task.title}</h4>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">Category: {task.category}</p>
              <p className="text-sm text-gray-500">Created: {task.timestamp}</p>
              <button className="btn btn-primary">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
