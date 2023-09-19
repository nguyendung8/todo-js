const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const allButton = document.getElementById('all-button');
const activeButton = document.getElementById('active-button');
const completedButton = document.getElementById('completed-button');
const clearCompletedButton = document.getElementById('clear-completed-button');

let todos = [];

addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        todos.push({ text: todoText, completed: false });
        todoInput.value = '';
        updateTodoList();
    }
});

function updateTodoList() {
    todoList.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <div>
              <button style="color: white; background-color: green;" onclick="toggleCompleted(${i})">Done</button>
              <button style="color: white; background-color: red;" onclick="deleteTodo(${i})">Del</button>
            </div>
            `;
        todoList.appendChild(li);
    }
}

// Đánh dấu công việc hoàn thành
function toggleCompleted(index) {
    todos[index].completed = !todos[index].completed;
    updateTodoList();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    updateTodoList();
}

//All task
allButton.addEventListener('click', () => {
    filterTodos('all');
});

// Task đang thực hiện
activeButton.addEventListener('click', () => {
    filterTodos('active');
});

// Task đã hoàn thành
completedButton.addEventListener('click', () => {
    filterTodos('completed');
});

clearCompletedButton.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    updateTodoList();
});

function filterTodos(filterType) {
    allButton.classList.remove('active');
    activeButton.classList.remove('active');
    completedButton.classList.remove('active');

    if (filterType === 'all') {
        allButton.classList.add('active');
        updateTodoList();
    } else if (filterType === 'active') {
        activeButton.classList.add('active');
        const activeTodos = todos.filter(todo => !todo.completed);
        displayFilteredTodos(activeTodos);
    } else if (filterType === 'completed') {
        completedButton.classList.add('active');
        const completedTodos = todos.filter(todo => todo.completed);
        displayFilteredTodos(completedTodos);
    }
}

function displayFilteredTodos(filteredTodos) {
    todoList.innerHTML = '';
    for (let i = 0; i < filteredTodos.length; i++) {
        const todo = filteredTodos[i];
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <div>
              <button style="color: white; background-color: green;" onclick="toggleCompleted(${todos.indexOf(todo)})">Done</button>
              <button style="color: white; background-color: red;" onclick="deleteTodo(${todos.indexOf(todo)})">Del</button>
            </div>
            `;
        todoList.appendChild(li);
    }
}

// Hiển thị danh sách công việc ban đầu
updateTodoList();
