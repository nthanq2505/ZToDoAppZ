const taskList = document.querySelector('.list__task');
function renderTasks() {
    
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.isDone ? 'done' : '';
        taskItem.innerHTML = `

                <input class="check-box" type="checkbox" ${task.isDone ? 'checked' : ''} onclick="toggleTask(${index})">
                <span>${task.name}</span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>

        `;
        taskList.appendChild(taskItem);
    });
}

let tasks = [];

const addButton = document.querySelector('.add__button');

addButton.onclick = () => {
    const taskNameInput = document.querySelector('.add__input');
    const taskName = taskNameInput.value;

    if (taskName) {
        tasks.push({ name: taskName, isDone: false });
        taskNameInput.value = '';
        renderTasks();
    }
}
const cancelButton = document.querySelector('.cancel__button');
cancelButton.onclick = () => {

    document.querySelector('.add__input').value = '';
}
// function clearTask() {
//     const addButton = document.querySelector('.add__button');
//     document.getElementById('.list__task').value = '';
// }
