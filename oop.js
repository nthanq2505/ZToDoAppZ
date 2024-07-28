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
    this.filterInput = document.querySelector('#filter');

    this.addButton.onclick = this.addTask.bind(this);
    this.cancelButton.onclick = this.cancelAdd.bind(this);
    this.saveButtons.onclick = this.saveEdit.bind(this);
    this.cancelButtons.onclick = this.cancelEdit.bind(this);
    this.filterInput.onchange = this.filterTasks.bind(this);

    this.renderTasks();
}

TaskManager.prototype.addTask = function () {
    const taskNameInput = document.querySelector('.add__input');
    const taskName = taskNameInput.value;

    if (taskName) {
        if (this.currentFilter == 'done') {
            this.currentFilter = 'all';
        }
        this.tasks.push({ name: taskName, isDone: false });
        taskNameInput.value = '';
        this.sortTasks();
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

TaskManager.prototype.sortTasks = function () {
    for (let i = 0; i < this.tasks.length; i++) {
        for (let j = i + 1; j < this.tasks.length; j++) {
            if (this.tasks[i].isDone && !this.tasks[j].isDone) {
                const temp = this.tasks[i];
                this.tasks[i] = this.tasks[j];
                this.tasks[j] = temp;
            }
        }
    }
};

TaskManager.prototype.toggleTask = function (index) {
    this.tasks[index].isDone = !this.tasks[index].isDone;
    this.sortTasks();
    this.renderTasks();
};

TaskManager.prototype.filterTasks = function() {
    this.currentFilter = document.querySelector('#filter').value;
    this.renderTasks();
};

TaskManager.prototype.renderTasks = function () {
    this.taskList.innerHTML = '';

    const filteredTasks = this.tasks.filter(task => {
        if (this.currentFilter === 'all') return true;
        if (this.currentFilter === 'done') return task.isDone;
        if (this.currentFilter === 'not-done') return !task.isDone;
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





