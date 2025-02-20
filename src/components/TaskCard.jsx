import React, { useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Modal from "react-modal";
import { authContext } from "../AuthProvider/AuthProvider";

Modal.setAppElement("#root");

export default function TaskCard({ task, setTasks }) {
  const { user } = useContext(authContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: active ? "grabbing" : "grab",
  };

  // 🔥 Delete Task & Refresh UI
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosPublic.delete(`/tasks/${id}`);

        if (data.deletedCount) {
          Swal.fire("Deleted!", "Your Task has been deleted.", "success");
          // 🔥 Remove from UI
          setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the task.", "error");
      }
    }
  };

  // 🔥 Update Task & Refresh UI
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    const updatedTask = { title, description };

    try {
      const { data } = await axiosPublic.put(`/tasks/${task._id}`, updatedTask);

      if (data.modifiedCount) {
        Swal.fire("Success!", "Task updated successfully.", "success");

        // 🔥 Update UI in real-time
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === task._id ? { ...t, title, description } : t
          )
        );

        closeModal();
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update task.", "error");
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white text-black p-4 mb-4 rounded-lg shadow-md cursor-grab"
    >
      <div className="flex justify-between" style={{ touchAction: "none" }}>
        <div>
          <h4 className="font-semibold">{task?.title}</h4>
          <p className="text-sm text-gray-600">{task?.description}</p>
          <p className="text-xs text-gray-500">
            Created: {new Date(task?.timestamp).toLocaleString()}
          </p>
          <p
            className={`text-sm  ${
              task?.category === "In Progress"
                ? "text-amber-400"
                : task?.category === "Done"
                ? "text-green-500"
                : task?.category === "To-Do"
                ? "text-blue-500"
                : "text-gray-600"
            }`}
          >
            {task?.category}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={openModal}
            className="btn bg-gradient-to-r from-primary to-secondary text-white"
          >
            <FaPen />
          </button>
          <button
            onClick={() => handleDelete(task?._id)}
            className="btn bg-gradient-to-r from-primary to-secondary text-white"
          >
            <FaTrashAlt />
          </button>
        </div>

        {/* 🔥 Modal for Editing Task */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Task"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg w-full shadow-lg"
          overlayClassName="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black/20 flex items-center justify-center"
        >
          <form onSubmit={handleSubmit} className="card-body">
            <h2 className="text-xl font-semibold mb-2">Edit Task Info</h2>

            {/* Title Input */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="title"
                defaultValue={task.title}
                required
              />
            </div>

            {/* Description Input */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="3"
                defaultValue={task.description}
                name="description"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
