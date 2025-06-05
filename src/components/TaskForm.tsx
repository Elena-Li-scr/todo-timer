"use client";
import { useState } from "react";
import { useTaskStore } from "@/store/taskStore";

export default function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(title, duration);
    setTitle("");
    setDuration(25);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        value={title}
        placeholder="Task title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        className="time-input"
        value={duration}
        placeholder="minutes"
        onChange={(e) => setDuration(Number(e.target.value))}
        min={1}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
