// script.js

// Ensure the script runs only after the entire HTML document has loaded.
document.addEventListener('DOMContentLoaded', function() {

    // 1. Select the necessary DOM elements.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 2. Define the addTask function to handle adding a new task.
    // The 'save' parameter prevents re-saving when loading from Local Storage.
    function addTask(taskText, save = true) {
        
        // If the taskText is provided from the function call (i.e. on load)
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

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
        removeButton.onclick = function() {
            // Remove the parent list item (listItem) from the DOM.
            taskList.removeChild(listItem);

            // Update Local Storage after removing the task.
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        // Append the remove button to the list item.
        listItem.appendChild(removeButton);
        // Append the new list item to the task list.
        taskList.appendChild(listItem);
        
        // If the task is new (not being loaded), save it to Local Storage.
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field after adding the task.
        taskInput.value = "";
    }

    // 4. Function to load tasks from Local Storage when the page loads.
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // 5. Attach event listeners.
    addButton.addEventListener('click', () => {
        addTask(taskInput.value.trim());
    });

    taskInput.addEventListener('keypress', function(event) {
        // Check if the 'Enter' key was pressed.
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });
    
    // Load existing tasks on page load.
    loadTasks();
});
