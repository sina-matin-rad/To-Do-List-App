document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-button">Delete</button>
        `;

        taskItem.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-button')) {
                taskItem.remove();
            } else {
                taskItem.classList.toggle('completed');
            }
        });

        taskList.appendChild(taskItem);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    function addTask(taskText, completed = false) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (completed) {
            taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-button">Delete</button>
        `;

        taskItem.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-button')) {
                taskItem.remove();
                saveTasks();
            } else {
                taskItem.classList.toggle('completed');
                saveTasks();
            }
        });

        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => addTask(task.text, task.completed));
    }
});
