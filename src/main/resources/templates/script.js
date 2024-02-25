function convertToWebpage(tasks) {
    const taskListContainer = document.createElement('div');
    taskListContainer.classList.add('task-list-container');

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        // Create elements for task details
        const taskId = document.createElement('span');
        taskId.textContent = `ID: ${task.id}`;
        const taskDescription = document.createElement('span');
        taskDescription.textContent = `Description: ${task.description}`;
        const taskStatus = document.createElement('span');
        taskStatus.textContent = `Status: ${task.status}`;
        const taskCreatedAt = document.createElement('span');
        taskCreatedAt.textContent = `Created At: ${task.createdAt}`;

        // Append task details to task item
        taskItem.appendChild(taskId);
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(taskStatus);
        taskItem.appendChild(taskCreatedAt);

        // Append task item to task list container
        taskListContainer.appendChild(taskItem);
    });

    return taskListContainer;
}
document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();
});

function fetchTasks() {
    fetch('http://localhost:8080/api/tasks')
        .then(response => response.json())
        .then(data => {
            const taskListContainer = convertToWebpage(data);
            const taskListDiv = document.getElementById('taskList');
            taskListDiv.appendChild(taskListContainer);
        })
        .catch(error => console.error('Error fetching tasks:', error));
}
