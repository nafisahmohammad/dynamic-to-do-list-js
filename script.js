document.addEventListener("DOMContentLoaded", function () {

    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => createTaskItem(taskText));
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach(item => {
            tasks.push(item.firstChild.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Create task list item with remove functionality
    function createTaskItem(taskText) {
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            saveTasks();
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    // Add task function
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        createTaskItem(taskText);
        saveTasks();
        taskInput.value = "";
    }

    // Event listeners
    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load saved tasks on startup
    loadTasks();
});
