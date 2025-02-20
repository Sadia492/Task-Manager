import React, { useEffect } from "react";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";

export default function TaskBoard({ tasks, setTasks }) {
  const axiosPublic = useAxiosPublic();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
    useSensor(TouchSensor)
  );

  const getPosition = (id) => tasks.findIndex((task) => task._id === id);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((task) => task._id === active.id);
    const overTask = tasks.find((task) => task._id === over.id);
    if (!activeTask) return;

    const newCategory = overTask ? overTask.category : over.id;

    if (activeTask.category === newCategory) {
      // ✅ Reorder within the same column
      const oldIndex = getPosition(active.id);
      const newIndex = overTask ? getPosition(over.id) : oldIndex;
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    } else {
      // 🔄 Move to a different column
      const updatedTasks = tasks.map((task) =>
        task._id === active.id ? { ...task, category: newCategory } : task
      );
      setTasks(updatedTasks);

      try {
        await axiosPublic.patch(`/tasks/${active.id}`, {
          category: newCategory,
        });

        toast.success("Task moved successfully");
      } catch (error) {
        toast.error("Failed to move task");
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-10">
        {["To-Do", "In Progress", "Done"].map((category) => (
          <SortableContext
            key={category}
            items={tasks
              .filter((task) => task.category === category)
              .map((task) => task._id)}
            strategy={rectSwappingStrategy}
          >
            <TaskColumn
              setTasks={setTasks}
              category={category}
              tasks={tasks.filter((task) => task.category === category)}
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
