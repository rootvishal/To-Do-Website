// Load done tasks
window.onload = function() {
    let savedDone = JSON.parse(localStorage.getItem("doneTasks")) || [];
    savedDone.forEach(task => addDoneToUI(task));
};

function addDoneTask() {
    let name = document.getElementById("doneName").value.trim();
    let date = document.getElementById("doneDate").value;
    let time = document.getElementById("doneTime").value;
    let desc = document.getElementById("doneDesc").value.trim();

    if (!name || !date || !time || !desc) {
        return alert("Please fill all fields!");
    }

    let task = { name, date, time, desc };
    addDoneToUI(task);

    let tasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
    tasks.push(task);
    localStorage.setItem("doneTasks", JSON.stringify(tasks));

    // clear inputs
    document.getElementById("doneName").value = "";
    document.getElementById("doneDate").value = "";
    document.getElementById("doneTime").value = "";
    document.getElementById("doneDesc").value = "";
}

function addDoneToUI(task) {
    let li = document.createElement("li");
    li.innerHTML = `
    <strong>${task.name}</strong> <br>
    📅 ${task.date} ⏰ ${task.time} <br>
    📝 ${task.desc}
  `;
    document.getElementById("doneList").appendChild(li);
}