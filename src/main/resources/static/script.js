document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();
    document.getElementById('addTaskBtn').addEventListener('click', function() {
        resetForm();
        document.getElementById('taskModal').style.display = 'block';
    });

    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('taskModal').style.display = 'none';
    });
});

function resetForm() {
    document.getElementById('taskId').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskStatus').value = 'NOT_STARTED';
}

function fetchTasks() {
    fetch('http://localhost:8080/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const tasksTableBody = document.querySelector("#tasksTable tbody");
            tasksTableBody.innerHTML = ''; // Clear previous tasks
            tasks.forEach(task => {
                let row = tasksTableBody.insertRow(-1); // Append row to the end of the table body
                row.insertCell(0).textContent = task.id;
                row.insertCell(1).textContent = task.description;
                row.insertCell(2).textContent = task.status;

                // Format the createdAt date to include time in hh:mm:ss format
                let createdAtFormatted = new Date(task.createdAt).toLocaleString('en-US', {
                    hour12: false, // Use 24-hour time
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                row.insertCell(3).textContent = createdAtFormatted;

                let actionsCell = row.insertCell(4);
                let editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.classList.add("task-action", "edit-action");
                editBtn.onclick = () => editTask(task);
                actionsCell.appendChild(editBtn);

                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add("task-action", "delete-action");
                deleteBtn.onclick = () => deleteTask(task.id);
                actionsCell.appendChild(deleteBtn);
            });
        });
}


function editTask(task) {
    document.getElementById('taskId').value = task.id;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskStatus').value = task.status;
    document.getElementById('taskModal').style.display = 'block';
}

function saveOrUpdateTask() {
    const id = document.getElementById('taskId').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;

    const task = { id, description, status };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:8080/api/tasks/${id}` : 'http://localhost:8080/api/tasks';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then(() => {
            fetchTasks(); // Refresh the task list
            document.getElementById('taskModal').style.display = 'none'; // Hide modal
            resetForm(); // Reset form for next input
        })
        .catch(error => console.error('Error:', error));
}

function deleteTask(taskId) {
    fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'DELETE',
    })
        .then(() => fetchTasks()) // Refresh the task list
        .catch(error => console.error('Error:', error));
}
