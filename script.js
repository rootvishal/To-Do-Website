// Load tasks on page load
window.onload = function() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToUI(task));
    checkDeadlines();
};

// Add Task
function addTask() {
    let text = document.getElementById("taskInput").value.trim();
    let date = document.getElementById("taskDate").value;
    let time = document.getElementById("taskTime").value;

    if (!text || !date || !time) {
        alert("Please fill all fields (Task + Date + Time)");
        return;
    }

    let task = { text, date, time, completed: false, delayed: false };
    saveTask(task);
    addTaskToUI(task);

    // reset inputs
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTime").value = "";
}

// Save Task in localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task to UI
function addTaskToUI(task) {
    let li = document.createElement("li");
    li.innerHTML = `
    <div>
      <strong>${task.text}</strong><br>
      📅 ${task.date} ⏰ ${task.time}
      ${task.delayed ? "<span style='color:red;font-weight:bold;'> (Delayed)</span>" : ""}
    </div>
    <div>
      ${task.completed ? "" : `<button onclick="markDone(this)">✔ Done</button>`}
      <button onclick="deleteTask(this)">❌</button>
    </div>
  `;

  if (task.completed) {
    document.getElementById("doneList").appendChild(li);
    li.classList.add("completed");
  } else {
    document.getElementById("taskList").appendChild(li);
  }
}

// Delete Task
function deleteTask(button) {
  let li = button.parentElement.parentElement;
  let text = li.querySelector("strong").innerText;
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  li.remove();
}

// Mark Task as Done
function markDone(button) {
  let li = button.parentElement.parentElement;
  let text = li.querySelector("strong").innerText;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if (task.text === text) task.completed = true;
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  // move to done list
  li.remove();
  document.getElementById("doneList").appendChild(li);
  li.classList.add("completed");
  button.remove(); // remove done button
}

// Check for delayed tasks
function checkDeadlines() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let now = new Date();

  tasks.forEach(task => {
    if (!task.completed) {
      let deadline = new Date(`${task.date}T${task.time}`);
      if (deadline < now) {
        task.delayed = true;
      }
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Refresh UI
  document.getElementById("taskList").innerHTML = "";
  document.getElementById("doneList").innerHTML = "";
  tasks.forEach(task => addTaskToUI(task));
}

// Run deadline check every 1 min
setInterval(checkDeadlines, 60000);