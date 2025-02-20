import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";
import TaskBoard from "../components/Taskboard";
// import TaskBoard from "../components/TaskBoard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axiosPublic.get("/tasks");
      setTasks(data);
    };
    fetchTasks();
  }, []);

  // Handle new task submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = "To-Do"; // Default category
    const timestamp = new Date();

    const taskData = { title, description, category, timestamp };

    try {
      const { data } = await axiosPublic.post("/tasks", taskData);
      if (data.insertedId) {
        toast.success("Task added successfully");
        setTasks((prev) => [...prev, { ...taskData, _id: data.insertedId }]);
      }
      form.reset();
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 w-11/12 mx-auto">
      {/* Task Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add a New Task
        </h2>

        {/* Form in Horizontal Layout */}
        <div className="flex md:flex-row justify-center items-center flex-col flex-wrap gap-4 mb-6">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            required
            maxLength={50}
            className="flex-1 px-3 py-2 border w-full border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="description"
            placeholder="Task Description (optional)"
            maxLength={200}
            className="flex-1 px-3 py-2 border w-full border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Task Board */}
      <TaskBoard tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
