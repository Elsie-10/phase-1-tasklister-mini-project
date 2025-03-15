document.addEventListener("DOMContentLoaded", loadTasks);
  // your code here
  // Array to store tasks
let tasks = [];
// I create a function to add a new task
//Whenever you add a task, the task needs to be:
//Saved so that it can be loaded back later (using saveTasks()).
//Rendered so that the new task appears on the screen (using renderTasks()).
const PRIORITY = {
  High: 1,
  Medium: 2,
  Low: 3
};

function addTask (textdescription, priority){
  const task = {
      Description : textdescription,
      Priority: PRIORITY[priority] || PRIORITY.Medium,
  }
  tasks.push(task);
  savedTask();
  renderTask();
}
// fuction that saves the date to sessionstorage
//This ensures that even when the page is loaded the task added are still available.
function savedTask(){
  sessionStorage.setItem('tasks',JSON.stringify(tasks));
}

// to ensure that tasks added by the user remain visible even after they refresh the page use loadTasks()
//What Happens With loadTasks():
//The user adds a task.
//The task is saved to sessionStorage using saveTasks().
//When the page reloads (or when the user revisits the page), loadTasks() will run.
//loadTasks() retrieves the tasks from sessionStorage and calls renderTasks().
//The tasks are then displayed on the page.
function loadTasks(){
  const savedTask= JSON.parse(sessionStorage.getItem('tasks'));
  if (savedTask) {
    tasks = savedTask;
  }
  renderTask();
}
//It gives real-time feedback to the user by rendering their actions


function renderTask(){
const taskList = document.getElementById('tasks');
taskList.innerHTML= '';
tasks.forEach((task, index)=> {
  const li = document.createElement('li');
  li.textContent = `${task.Description} (Priority: ${getPriorityString(task.Priority)})`;  // Set task description and priority as list item text
    
    // Add color based on task priority
    if (task.Priority === PRIORITY.High) {
      li.style.backgroundColor = 'red'; // Red for High priority
    } else if (task.Priority === PRIORITY.Medium) {
      li.style.backgroundColor = 'yellow'; // Yellow for Medium priority
    } else if (task.Priority === PRIORITY.Low) {
      li.style.backgroundColor = 'green'; // Green for Low priority
    }

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(index));  // Add click event to edit task
    editButton.style.marginLeft = '10px';  // Space between buttons
    editButton.style.padding = '5px 10px';
    editButton.style.cursor = 'pointer';

// Create a delete button for each task
const deleteButton = document.createElement('button');
deleteButton.textContent = 'x';
deleteButton.addEventListener('click', () => deleteTask(index));  // Add click event to delete task
deleteButton.style.marginLeft = '10px';  // Space between buttons
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.cursor = 'pointer';

li.appendChild(editButton);
li.appendChild(deleteButton);  // Append delete button to the list item
taskList.appendChild(li);  // Append the list item to the task list
});
}

// Function to delete a task
function deleteTask(index) {
tasks.splice(index, 1);  // Remove the task at the given index from the tasks array
savedTask();              // Update sessionStorage with the new tasks array
renderTask();             // Re-render the task list to reflect the deletion
}

 // Function to sort tasks by priority (ascending or descending)
function sortTasks(order = 'asc') {
  tasks.sort((a, b) => {
    if (order === 'asc') {
      return a.Priority - b.Priority;  // Ascending order (Low -> Medium -> High)
    } else {
      return b.Priority - a.Priority;  // Descending order (High -> Medium -> Low)
    }
  });
  savedTask();  // Save the sorted tasks
  renderTask(); // Re-render the tasks
}

// Utility function to convert priority number to string
function getPriorityString(priority) {
  return Object.keys(PRIORITY).find(key => PRIORITY[key] === priority);
}
// Function to edit the task description
function editTask(index) {
  const task = tasks[index];
  const newDescription = prompt("Edit task description:", task.Description);  // Ask user for new description

  if (newDescription && newDescription !== task.Description) {  // If new description is different
    tasks[index].Description = newDescription;  // Update the task description
    savedTask();  // Save the updated task list
    renderTask(); // Re-render the task list
  }
}

// add task on form submission 
const taskForm = document.getElementById('create-task-form');
taskForm.addEventListener('submit', function (event) {
  event.preventDefault();  // Prevent the default form submission (no page reload)
  const taskDescription = document.getElementById('new-task-description').value;  // Get the input value
  const taskPriority = document.getElementById('task-priority').value; 
  
  if (taskDescription) {  // If there's something in the input
    addTask(taskDescription, taskPriority);  // Add the task with priority
    document.getElementById('new-task-description').value = '';  // Clear the input field
  }
});
// Add event listeners for sort buttons (ascending and descending)
const sortAscButton = document.getElementById('sort-asc');
const sortDescButton = document.getElementById('sort-desc');

if (sortAscButton) {
  sortAscButton.addEventListener('click', () => {
    sortTasks('asc');  // Sort tasks in ascending order
  });
}

if (sortDescButton) {
  sortDescButton.addEventListener('click', () => {
    sortTasks('desc');  // Sort tasks in descending order
  });
}