import React, { useState, useEffect } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        createUser();
        getTasks();

    }, [])

    const getTasks= () => {
        fetch("https://playground.4geeks.com/todo/users/juan")
            .then((resp) => resp.json())
            .then((data) => setTasks(data.todos))
            .catch((error) => console.error("Error fetching tasks:", error));
    }

    const createUser = () => {
        fetch('https://playground.4geeks.com/todo/users/juan', {
            method: "POST",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                if (!resp.ok) throw new Error("Error create user");
                return resp.json();
            })
            .then(() => getTasks())
            .catch((error) => console.error(error));
    };

    const updateTasksOnServer = (newTask) => {
        fetch('https://playground.4geeks.com/todo/todos/juan', {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                if (!resp.ok) throw new Error("Error updating tasks on server");
                return resp.json();
            })
            .then(() => getTasks())
            .catch((error) => console.error(error));
    };

    const deleteTask = (id) => {
        fetch('https://playground.4geeks.com/todo/todos/'+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                if (!resp.ok) throw new Error("Error updating tasks on server");
                return resp.text();
            })
            .then(() => getTasks())
            .catch((error) => console.error(error));
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const newTask = { label: inputValue, is_done: false };
            //const updatedTasks = [...tasks, newTask];
            updateTasksOnServer(newTask);
            setInputValue("");
            console.log(tasks);
        }
    };

    return (
        <div className="container">
            <h1>Todos</h1>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

            </form>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <li key={index} className="task">
                            {task.label}
                            <span
                                className="delete"
                                onClick={() => deleteTask(task.id)}
                            >
                                ×
                            </span>
                        </li>
                    ))
                ) : (
                    <li>No tasks, add tasks</li>
                )}
            </ul>
            <div>{tasks.length} item{tasks.length !== 1 ? "s" : ""} left</div>
        </div>
    );
};

export default Home;


