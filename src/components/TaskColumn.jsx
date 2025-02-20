import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function TaskColumn({ category, tasks }) {
  const { setNodeRef } = useDroppable({ id: category });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 p-4 rounded-lg shadow-md min-h-[200px]"
    >
      <h3 className="text-lg font-semibold mb-4">{category}</h3>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
