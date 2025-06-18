const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const res = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description })
  });

  const data = await res.json();
  console.log(data);
  form.reset();
  fetchTasks();
});

async function fetchTasks() {
  const res = await fetch('http://localhost:5000/api/tasks');
  const tasks = await res.json();

  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.title}: ${task.description}`;
    taskList.appendChild(li);
  });
}

// Load tasks on page load
fetchTasks();
