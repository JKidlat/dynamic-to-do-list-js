// Ensure the script runs only after the entire HTML document has loaded.
document.addEventListener('DOMContentLoaded', function() {

    // 1. Select the necessary DOM elements.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 2. Define the addTask function to handle adding a new task.
    function addTask() {
        // Retrieve and trim the value from the input field.
        const taskText = taskInput.value.trim();

        // Check if the input is empty.
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit the function if the input is empty.
        }

        // 3. Create the task and remove button elements.
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Set the onclick event for the remove button.
        // This function will remove the parent list item (listItem).
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the list item.
        listItem.appendChild(removeButton);
        // Append the new list item to the task list.
        taskList.appendChild(listItem);

        // Clear the input field after adding the task.
        taskInput.value = "";
    }

    // 4. Attach event listeners to the button and the input field.
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        // Check if the 'Enter' key was pressed.
        if (event.key === 'Enter') {
            addTask();
        }
    });

});