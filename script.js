const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(({ text, completed }) => createTaskElement(text, completed));
};

const saveTasks = () => {
  const tasks = Array.from(taskList.children).map((li) => ({
    text: li.querySelector("span").textContent,
    completed: li.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const createTaskElement = (text, completed = false) => {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">X</button>
    `;

  taskList.appendChild(li);
};

const addTask = () => {
  const text = taskInput.value.trim();
  if (!text) return;

  createTaskElement(text);
  saveTasks();
  taskInput.value = "";
};

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => e.key === "Enter" && addTask());

taskList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target.tagName === "SPAN") {
    li.classList.toggle("completed");
  } else if (e.target.classList.contains("delete-btn")) {
    li.remove();
  }
  saveTasks();
});

loadTasks();
