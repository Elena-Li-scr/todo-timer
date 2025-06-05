"use client";
import { useState, useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const activeTaskId = useTaskStore((state) => state.activeTaskId);
  const startTask = useTaskStore((state) => state.startTask);
  const completeTask = useTaskStore((state) => state.completeTask);

  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const activeTask = tasks.find((task) => task.id === activeTaskId);
    if (!activeTask) {
      setTimeLeft(null);
      return;
    }

    setTimeLeft(activeTask.duration * 60);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(interval);
          completeTask(activeTask.id);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTaskId]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleClickStatus = (taskId: string, status: string) => {
    if (status === "Pending") {
      startTask(taskId);
    } else if (status === "Running") {
      completeTask(taskId);
    }
  };

  return (
    <div className="list-container">
      <div className="list-title">
        <p>Task Title</p>
        <p>Duration (minutes)</p>
        <p>Status</p>
      </div>

      {tasks.map((task) => {
        const isHovered = hoveredTaskId === task.id;
        const isRunning = task.id === activeTaskId;
        const showStart = task.status === "Pending" && isHovered;

        return (
          <div
            key={task.id}
            className="list-item"
            onMouseEnter={() => setHoveredTaskId(task.id)}
            onMouseLeave={() => setHoveredTaskId(null)}
          >
            <p>{task.title}</p>
            <p>
              {isRunning && timeLeft !== null
                ? ` ${formatTime(timeLeft)}`
                : ` ${task.duration} minutes`}
            </p>
            <div className="timer">
              {isRunning && timeLeft !== null && ` ${formatTime(timeLeft)}`}
            </div>
            <button onClick={() => handleClickStatus(task.id, task.status)}>
              {showStart
                ? "Start"
                : task.status === "Running"
                ? "Running"
                : task.status}
            </button>
          </div>
        );
      })}
    </div>
  );
}
