const taskList = document.querySelector('.list__task');
const addButton = document.querySelector('.add__button');
const cancelButton = document.querySelector('.cancel__button');

const editButtons = document.querySelectorAll('#edit-button');
const saveButtons = document.querySelector('.save-modal');
const cancelButtons = document.querySelector('.cancel-modal');
const edit_task = document.querySelector('.modal');

const filterInput = document.querySelector('#filter');


const tasks = [];
let currentTaskIndex = null;
let currentFilter = 'all';
renderTasks()


addButton.onclick = () => {
    const taskNameInput = document.querySelector('.add__input');
    const taskName = taskNameInput.value;
    
    if (taskName) {
        tasks.push({ name: taskName, isDone: false });
        taskNameInput.value = '';
        sortTask();
        renderTasks();
    }
}


cancelButton.onclick = () => {
    document.querySelector('.add__input').value = '';
}


function deleteTask(index) {
    tasks.splice(index, 1)
    renderTasks()
}


function editTask(index) {
    currentTaskIndex = index;
    const editInput = document.querySelector('.edit__input');
    editInput.value = tasks[index].name;
    edit_task.classList.add('open');
}


saveButtons.addEventListener('click', () => {
    const newName = document.querySelector('.edit__input').value;
    edit_task.classList.remove('open');
    if (newName) {
        tasks[currentTaskIndex].name = newName;
        renderTasks();
    }
})


cancelButtons.addEventListener('click', () => {
    edit_task.classList.remove('open');
})


function sortTask() {
    for (let i = 0; i < tasks.length; i++) {
        for (let j = i + 1; j < tasks.length; j++) {
            if (tasks[i].isDone && !tasks[j].isDone) {
                const temp = tasks[i];
                tasks[i] = tasks[j];
                tasks[j] = temp;
            }
        }
    }
}


function toggleTask(index) {
    tasks[index].isDone = !tasks[index].isDone
    sortTask()
    renderTasks()

}


filterInput.onchange = filter;
function filter() {
    console.log('filter')
    currentFilter = document.querySelector('#filter').value;
    renderTasks()
}


function renderTasks() {
    taskList.innerHTML = '';

    if (currentFilter === 'all') {
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <input class="check-box" type="checkbox" ${task.isDone ? 'checked' : ''} onclick="toggleTask(${index})">
                <span>${task.name}</span>
                <button onclick="editTask(${index})">Edit</button>
                <button class="red-button" onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    } else if (currentFilter === 'done') {
        tasks.filter(task => task.isDone).forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <input class="check-box" type="checkbox" checked onclick="toggleTask(${index})">
                <span>${task.name}</span>
                <button onclick="editTask(${index})">Edit</button>
                <button class="red-button" onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    } else if (currentFilter === 'not-done') {
        tasks.filter(task => !task.isDone).forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <input class="check-box" type="checkbox" onclick="toggleTask(${index})">
                <span>${task.name}</span>
                <button onclick="editTask(${index})">Edit</button>
                <button class="red-button" onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }
}


