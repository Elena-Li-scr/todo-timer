import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function HomePage() {
  return (
    <div className="container">
      <div className="wrapper">
        <h1>Pomodoro-style Task manager</h1>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}
