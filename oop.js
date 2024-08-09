const StateOfFilterTasks = Object.freeze({
    ALL: 'all',
    DONE: 'done',
    NOT_DONE: 'not_done'
});

function TaskManager() {
    this.tasks = [];
    this.currentTaskIndex = null;
    this.currentFilter = StateOfFilterTasks.ALL;

    this.taskList = document.querySelector('.list__task');
    this.addButton = document.querySelector('.add__button');
    this.clearButton = document.querySelector('.clear__button');
    this.saveButtons = document.querySelector('.save-modal');
    this.cancelButtons = document.querySelector('.cancel-modal');
    this.edit_task = document.querySelector('.modal');
    this.filterInput = document.querySelector('#filter');

    this.addButton.onclick = this.addTask.bind(this);
    this.clearButton.onclick = this.clearAdd.bind(this);
    this.saveButtons.onclick = this.saveEdit.bind(this);
    this.cancelButtons.onclick = this.cancelEdit.bind(this);
    this.filterInput.onchange = this.filterTasks.bind(this);

    this.renderTasks();
}

TaskManager.prototype.addTask = function () {
    const taskNameInput = document.querySelector('.add__input');
    const taskName = taskNameInput.value;

    if (taskName) {
        if (this.currentFilter === StateOfFilterTasks.DONE) {
            this.currentFilter = StateOfFilterTasks.ALL;
            this.filterInput.value = StateOfFilterTasks.ALL;
        }
        this.tasks.push({ name: taskName, isDone: false });
        taskNameInput.value = '';
        this.arrangeTaskList();
        this.renderTasks();
    }
};

TaskManager.prototype.clearAdd = function () {
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

TaskManager.prototype.arrangeTaskList = function () {
    this.tasks.sort((a, b) => {
        if (a.isDone && !b.isDone) return 1;
        if (!a.isDone && b.isDone) return -1;
        return 0;
    });
};

TaskManager.prototype.toggleTask = function (index) {
    this.tasks[index].isDone = !this.tasks[index].isDone;
    this.arrangeTaskList();
    this.renderTasks();
};

TaskManager.prototype.filterTasks = function() {
    this.currentFilter = this.filterInput.value;
    this.renderTasks();
};

TaskManager.prototype.renderTasks = function () {
    this.taskList.innerHTML = '';

    const filteredTasks = this.tasks.filter(task => {
        if (this.currentFilter === StateOfFilterTasks.ALL) {
            return true;
        } else if (this.currentFilter === StateOfFilterTasks.DONE) {
            return task.isDone;
        } else {
            return !task.isDone;
        }
    });

    filteredTasks.forEach((task, index) => {
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





