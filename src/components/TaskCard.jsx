import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: active ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white p-4 mb-4 rounded-lg shadow-md cursor-grab"
    >
      <div style={{ touchAction: "none" }}>
        <h4 className="font-semibold">{task.title}</h4>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs text-gray-500">
          Created: {new Date(task.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
