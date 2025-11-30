// Run the script only after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Helper: get tasks from Local Storage (returns an array)
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem("tasks") || "[]");
    }

    // Helper: save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again
    }

    // Add a new task (optionally saving to Local Storage)
    function addTask(taskText = null, save = true) {
        // If no taskText passed (normal use), read from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
        } else {
            taskText = taskText.trim();
        }

        // If empty, alert the user
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create the list item
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create the Remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // When Remove is clicked: remove from DOM and Local Storage
        removeButton.onclick = function () {
            // Remove from DOM
            taskList.removeChild(listItem);

            // Remove from Local Storage
            let storedTasks = getStoredTasks();
            storedTasks = storedTasks.filter(task => task !== taskText);
            saveTasks(storedTasks);
        };

        // Attach button to item, item to list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear input field
        taskInput.value = "";

        // Save to Local Storage (skip if we are loading from storage)
        if (save) {
            const storedTasks = getStoredTasks();
            storedTasks.push(taskText);
            saveTasks(storedTasks);
        }
    }

    // Click on "Add Task" button
    addButton.addEventListener("click", function () {
        addTask();
    });

    // Press Enter key inside the input to add task
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load existing tasks when the page is first opened
    loadTasks();
});
