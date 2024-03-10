import { nanoid } from "nanoid";
import { useState } from "react";
import "./TaskManager.css";
import { useTaskManger } from "../hooks/TaskManagerHook";

  // Task type
  type Task = {
    id: string,
    title: string
  }

// TODO: create custom hook to manage task state
export const TaskManager = () => {
  const [title, setTitle] = useState("");
  const {
    searchTask,
    updateTask,
    deleteTask,
    filterTasks,
    saveNewTask} = useTaskManger();

  // remove task from list
  const completeTask = (id: string) => {
    deleteTask(id);
  };

  const updateTasks = (id: string, updatedTitle: string) => {
    const updatedTask = {
      id,
      title: updatedTitle
    }
    updateTask(id,updatedTask)
  };

  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      // using nanoid to generate unique id
      id: nanoid(),
      title,
    };
    saveNewTask(newTask);
    setTitle("");
  };

  const handleSearch = (keyword: string) => {
    searchTask(keyword)
  };


  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={e => handleSearch(e.target.value)} placeholder="Search Task" />
      </div>

      <div className="task">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filterTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTasks(task.id, e.target.value )}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
