// Make sure the script runs only after the HTML content has fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim input value

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create the list item
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Remove task functionality
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Append button to item and item to list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear the input
        taskInput.value = "";
    }

    // Button click event to add task
    addButton.addEventListener("click", addTask);

    // Allow pressing "Enter" to add task
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

});
