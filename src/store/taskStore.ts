import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type TaskStatus = "Pending" | "Running" | "Completed";

export interface Task {
  id: string;
  title: string;
  duration: number;
  status: TaskStatus;
}

interface TaskState {
  tasks: Task[];
  activeTaskId: string | null;
  addTask: (title: string, duration: number) => void;
  startTask: (id: string) => void;
  completeTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  activeTaskId: null,
  addTask: (title, duration) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: uuidv4(),
          title,
          duration,
          status: "Pending",
        },
      ],
    })),

  startTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: "Running" };
        }
        if (task.status === "Running") {
          return { ...task, status: "Pending" };
        }
        return task;
      }),
      activeTaskId: id,
    })),
  completeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      ),
      activeTaskId: null,
    })),
}));
