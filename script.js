function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.isDone ? 'done' : '';
        taskItem.innerHTML = `
            <span>${task.name}</span>
            <div>
                <input type="checkbox" ${task.isDone ? 'checked' : ''} onclick="toggleTask(${index})">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}