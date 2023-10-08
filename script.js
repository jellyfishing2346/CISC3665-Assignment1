// Referencing HTML elements
const input = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const audioElement = new Audio("congrats.mp3");

let selectColor = "";

function handleColorSelection(color) {
    selectColor = color;
}

function addSubtask(parentTask) {
    const taskInput = document.getElementById("input-box");
    const dueDateInput = document.getElementById("due-date-input");

    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    const red = document.getElementById("red");
    const blue = document.getElementById("blue");
    const green = document.getElementById("green");


    if (taskText !== "") {
        const taskList = document.createElement("ul");
        const newTask = document.createElement("li");
        newTask.id = Math.random();

        if (red.checked) {
            newTask.style.background = "#ff000075";
        } else if (green.checked) {
            newTask.style.background = "#00800075";
        } else if (blue.checked) {
            newTask.style.background = "#0000ff75";
        }

        // Create a checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input";

        const text = document.createElement("div");
        // Create a label for the task
        const taskLabel = document.createElement("div");
        taskLabel.className = "form-check-label";
        taskLabel.textContent = taskText;
        taskLabel.style.color = selectColor;

        // Create a remove button
        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";


        // Create a span for the due date
        const dueSpan = document.createElement("div");
        dueSpan.textContent = dueDate;

        // Create a subtask button
        const subButton = document.createElement("button");
        subButton.className = "subtask-button";
        subButton.textContent = "Subtask";


        // Append the checkbox and label to the new task item
        text.appendChild(taskLabel);
        text.appendChild(dueSpan);
        newTask.appendChild(checkbox);
        newTask.appendChild(text);
        newTask.appendChild(removeButton);
        newTask.appendChild(subButton);

        // Append the new task to the task list
        taskList.appendChild(newTask);

        parentTask.appendChild(taskList);

        // Clear the input field
        taskInput.value = "";
        dueDateInput.value = "";

        // Checking if the task has been checked or not
        taskLabel.addEventListener("click", function () {
            if (checkbox.checked) {
                taskLabel.style.textDecoration = "line-through";
                newTask.classList.add("completed");
                audioElement.play();
                checkbox.checked = false;

            } else {
                taskLabel.style.textDecoration = "none";
                newTask.classList.remove("completed");
                checkbox.checked = true;
            }
        });


        // Remove button click
        removeButton.addEventListener("click", function () {
            newTask.remove();
            newTask.appendChild(removeButton);
        });
    }
}

// Add a task to the To Do List
function addTask() {
    const taskInput = document.getElementById("input-box");
    const dueDateInput = document.getElementById("due-date-input");

    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    const red = document.getElementById("red");
    const blue = document.getElementById("blue");
    const green = document.getElementById("green");


    if (taskText !== "") {
        const taskList = document.getElementById("list-container");
        const newTask = document.createElement("li");
        newTask.id = Math.random();

        if (red.checked) {
            newTask.style.background = "#ff000075";
        } else if (green.checked) {
            newTask.style.background = "#00800075";
        } else if (blue.checked) {
            newTask.style.background = "#0000ff75";
        }

        // Create a checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input";

        const text = document.createElement("div");
        // Create a label for the task
        const taskLabel = document.createElement("div");
        taskLabel.className = "form-check-label";
        taskLabel.textContent = taskText;
        taskLabel.style.color = selectColor;

        // Create a remove button
        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";


        // Create a span for the due date
        const dueSpan = document.createElement("div");
        dueSpan.textContent = dueDate;

        // Create a subtask button
        const subButton = document.createElement("button");
        subButton.className = "subtask-button";
        subButton.textContent = "Subtask";


        // Append the checkbox and label to the new task item
        text.appendChild(taskLabel);
        text.appendChild(dueSpan);
        newTask.appendChild(checkbox);
        newTask.appendChild(text);
        newTask.appendChild(removeButton);
        newTask.appendChild(subButton);

        // Append the new task to the task list
        listContainer.appendChild(newTask);

        // Clear the input field
        taskInput.value = "";
        dueDateInput.value = "";

        // Checking if the task has been checked or not
        taskLabel.addEventListener("click", function () {
            if (checkbox.checked) {
                taskLabel.style.textDecoration = "line-through";
                newTask.classList.add("completed");
                audioElement.play();
                checkbox.checked = false;

            } else {
                taskLabel.style.textDecoration = "none";
                newTask.classList.remove("completed");
                checkbox.checked = true;
            }
        });


        // Remove button click
        removeButton.addEventListener("click", function () {
            newTask.remove();
            newTask.appendChild(removeButton);
        });

        // Subtask button
        subButton.addEventListener("click", function () {
            addSubtask(newTask);
        })
    }
}

// Event listener for color selection
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", function () {
        if (this.checked) {
            handleColorSelection(this.id);
        }
    });
});

// Event listener is used to click on the task list container
listContainer.addEventListener("click", function (e) {
    if (e.target.id === "red") {
        handleColorSelection("red");
    } else if (e.target.id === "blue") {
        handleColorSelection("blue");
    } else if (e.target.id === "green") {
        handleColorSelection("green");
    } else if (e.target.tagName === "LI") {
        // Checked the task listed and save its data
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "button") {
        // Remove the task to save data
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Save data into session storage
function saveData() {
    sessionStorage.setItem("data", listContainer.innerHTML);
}

// Loading saved task's data from session storage
function saveTask() {
    listContainer.innerHTML = sessionStorage.getItem("data");
}
saveTask();