// This file to change the object oriented programming in javascript
function TaskManager() {
    this.tasks = [];
    this.currentTaskIndex = null;
    this.currentFilter = 'all';

    this.taskList = document.querySelector('.list__task');
    this.addButton = document.querySelector('.add__button');
    this.cancelButton = document.querySelector('.cancel__button');
    this.saveButtons = document.querySelector('.save-modal');
    this.cancelButtons = document.querySelector('.cancel-modal');
    this.edit_task = document.querySelector('.modal');

    this.addButton.onclick = this.addTask.bind(this);
    this.cancelButton.onclick = this.cancelAdd.bind(this);
    this.saveButtons.onclick = this.saveEdit.bind(this);
    this.cancelButtons.onclick = this.cancelEdit.bind(this);

    this.renderTasks();
}

TaskManager.prototype.addTask = function () {
    const taskNameInput = document.querySelector('.add__input');
    const taskName = taskNameInput.value;

    if (taskName) {
        this.tasks.push({ name: taskName, isDone: false });
        taskNameInput.value = '';
        this.renderTasks();
    }
};

TaskManager.prototype.cancelAdd = function () {
    document.querySelector('.add__input').value = '';
};

TaskManager.prototype.deleteTask = function (index) {
    this.tasks.splice(index, 1);
    this.renderTasks();
};

TaskManager.prototype.editTask = function (index) {
    this.currentTaskIndex = index;
    const editInput = document.querySelector('.edit__input');
    editInput.value = this.tasks[index].name;
    this.edit_task.classList.add('open');
};

TaskManager.prototype.saveEdit = function () {
    const newName = document.querySelector('.edit__input').value;
    this.edit_task.classList.remove('open');
    if (newName) {
        this.tasks[this.currentTaskIndex].name = newName;
        this.renderTasks();
    }
};

TaskManager.prototype.cancelEdit = function () {
    this.edit_task.classList.remove('open');
};

TaskManager.prototype.toggleTask = function (index) {
    this.tasks[index].isDone = !this.tasks[index].isDone;
    this.renderTasks();
};

TaskManager.prototype.renderTasks = function () {
    this.taskList.innerHTML = '';


    this.tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input class="check-box" type="checkbox" ${task.isDone ? 'checked' : ''} onclick="taskManager.toggleTask(${index})">
            <span>${task.name}</span>
            <button onclick="taskManager.editTask(${index})">Edit</button>
            <button class="red-button" onclick="taskManager.deleteTask(${index})">Delete</button>
        `;
        this.taskList.appendChild(taskItem);
    });
};

const taskManager = new TaskManager();





