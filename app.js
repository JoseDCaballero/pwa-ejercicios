const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Migrar tareas viejas al nuevo formato si es necesario
tasks = tasks.map(task => {
  if (typeof task === 'string') {
    return { text: task, completed: false };
  }
  return task;
});

// Mostrar tareas guardadas
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.className = "task-text";
    
    const doneButton = document.createElement("button");
    doneButton.textContent = "Hecho";
    doneButton.className = "done-button";
    doneButton.addEventListener("click", (e) => {
      e.stopPropagation();
      removeTask(index);
    });
    
    li.appendChild(taskText);
    li.appendChild(doneButton);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
  }
}

function removeTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

form.addEventListener("submit", addTask);
renderTasks();