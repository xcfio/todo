export const todo = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 100px; /* Increased padding on all sides */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: calc(100vh - 200px); /* Adjusted height */
        }
        .container {
            background: #fff;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            text-align: center;
            width: 400px; /* Reduced width */
            transition: all 0.3s ease-in-out;
        }
        .container:hover {
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }
        h1 {
            margin-bottom: 15px; /* Reduced margin */
            color: #333;
            font-size: 22px; /* Reduced font size */
        }
        input[type="text"], textarea {
            width: calc(100% - 20px);
            padding: 8px; /* Reduced padding */
            margin: 8px 0; /* Reduced margin */
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px; /* Reduced font size */
        }
        button {
            width: calc(100% - 20px);
            padding: 10px; /* Reduced padding */
            margin: 8px 0; /* Reduced margin */
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            font-size: 14px; /* Reduced font size */
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
        }
        button:hover {
            background-color: #0056b3;
        }
        .task {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f9f9f9;
            margin: 8px 0; /* Reduced margin */
            padding: 8px; /* Reduced padding */
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-size: 14px; /* Reduced font size */
        }
        .task.completed {
            text-decoration: line-through;
            color: gray;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Todo App</h1>
        <input type="text" id="title" placeholder="Title" required>
        <textarea id="description" placeholder="Description" required></textarea>
        <button onclick="addTask()">Add Task</button>
        <div id="tasks"></div>
        <div class="error" id="error"></div>
    </div>

    <script>
        async function addTask() {
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const errorElement = document.getElementById("error");
            errorElement.innerText = "";

            if (!title || !description) {
                return (errorElement.innerText = "Please fill in both fields");
            }

            try {
                const response = await fetch("/tasks", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title, description, status: false })
                });

                if (response.status === 200) {
                    fetchTasks();
                    document.getElementById("title").value = "";
                    document.getElementById("description").value = "";
                } else {
                    errorElement.innerText = "An error occurred. Please try again.";
                }
            } catch (error) {
                console.error("Error:", error);
                errorElement.innerText = "An error occurred. Please try again.";
            }
        }

        async function fetchTasks() {
            try {
                const response = await fetch("/tasks");
                const tasks = await response.json();
                const tasksContainer = document.getElementById("tasks");
                tasksContainer.innerHTML = "";
                tasks.forEach(task => {
                    const taskElement = document.createElement("div");
                    taskElement.className = \`task \${task.status ? "completed" : ""}\`;
                    taskElement.innerHTML = \`
                        <div>
                            <h3>\${task.title}</h3>
                            <p>\${task.description}</p>
                        </div>
                        <div>
                            <button onclick="toggleStatus('\${task.id}')">\${task.status ? "Undo" : "Complete"}</button>
                            <button onclick="deleteTask('\${task.id}')">Delete</button>
                        </div>
                    \`;
                    tasksContainer.appendChild(taskElement);
                });
            } catch (error) {
                console.error("Error:", error);
                document.getElementById("error").innerText = "An error occurred. Please try again.";
            }
        }

        async function deleteTask(id) {
            try {
                const response = await fetch("/tasks", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id })
                });

                if (response.status === 200) {
                    fetchTasks();
                } else {
                    document.getElementById("error").innerText = "An error occurred. Please try again.";
                }
            } catch (error) {
                console.error("Error:", error);
                document.getElementById("error").innerText = "An error occurred. Please try again.";
            }
        }

        async function toggleStatus(id) {
            try {
                const response = await fetch(\`/tasks/\${id}\`);
                const task = await response.json();
                task.status = !task.status;

                const updateResponse = await fetch("/tasks", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(task)
                });

                if (updateResponse.status === 200) {
                    fetchTasks();
                } else {
                    document.getElementById("error").innerText = "An error occurred. Please try again.";
                }
            } catch (error) {
                console.error("Error:", error);
                document.getElementById("error").innerText = "An error occurred. Please try again.";
            }
        }

        window.onload = fetchTasks;
    </script>
</body>
</html>
`