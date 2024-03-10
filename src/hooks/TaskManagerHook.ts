import { useState } from "react";

type Task = {
    id: string,
    title: string
}

export const useTaskManger = () =>{
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchKeywords, setSearchKeywords] = useState("");

    const saveNewTask = (task : Task) => {
        setTasks(prev => [...prev,task])
    }
    
    const updateTask = (id: string, updatedTask: Task) => {
        setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
       }

    const searchTask = (keyword: string) => {
        setSearchKeywords(keyword);
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    const filterTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchKeywords.toLowerCase())
    );
    return {
        searchTask,
        updateTask,
        deleteTask,
        filterTasks,
        saveNewTask
    }
}