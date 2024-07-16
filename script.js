const taskList = document.querySelector('.list__task');
const addButton = document.querySelector('.add__button');
const cancelButton = document.querySelector('.cancel__button');



let tasks = [
    {
        name: "hasdhasd",
    },
    {
        name: "Asdfsda"
    },

];

renderTasks()

addButton.onclick = () => {
    const taskNameInput = document.querySelector('.add__input');
    const taskName = taskNameInput.value;

    if (taskName) {
        tasks.push({ name: taskName, isDone: false });
        taskNameInput.value = '';
        renderTasks();
    }
}

cancelButton.onclick = () => {

    document.querySelector('.add__input').value = '';
}

function deleteTask(index) {
    tasks.splice(index, 1)
    // renderTasks()
}

function editTask(index) {
    const newName = prompt('Enter new name');
    if (newName) {
        tasks[index].name = newName;
        renderTasks();
    }
}


function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input class="check-box" type="checkbox" ${task.isDone ? 'checked' : ''} onclick="toggleTask(${index})">
            <span>${task.name}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}
