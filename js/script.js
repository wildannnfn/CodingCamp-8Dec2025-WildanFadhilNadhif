
const todoInput = document.querySelector('.todo-input');
const todoDate = document.querySelector('.todo-date');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const deleteAllBtn = document.querySelector('.delete-all-btn');
const emptyMessage = document.querySelector('.empty-message');


addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);
deleteAllBtn.addEventListener('click', deleteAll);


function addTodo(event) {
    event.preventDefault(); 

    
    if (todoInput.value === "" || todoDate.value === "") {
        alert("Please fill in both task and date!");
        return;
    }

    
    emptyMessage.style.display = 'none';

    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-item");

    
    const taskSpan = document.createElement('span');
    taskSpan.innerText = todoInput.value;
    taskSpan.classList.add('todo-text');
    todoLi.appendChild(taskSpan);

    
    const dateSpan = document.createElement('span');
    dateSpan.innerText = todoDate.value;
    todoLi.appendChild(dateSpan);

   
    const statusDiv = document.createElement('div');
    statusDiv.innerHTML = '<span class="status-badge status-pending">Pending</span>';
    todoLi.appendChild(statusDiv);

    const actionDiv = document.createElement('div');
   
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("action-btn", "check-btn");
    actionDiv.appendChild(completedButton);

    
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("action-btn", "trash-btn");
    actionDiv.appendChild(trashButton);

    todoLi.appendChild(actionDiv);

    
    todoList.appendChild(todoLi);

    
    todoInput.value = "";
    todoDate.value = "";
}

function deleteCheck(e) {
    const item = e.target;
   
    const button = item.closest("button");
    
    if (!button) return;

    const todo = button.parentElement.parentElement;

    if (button.classList.contains("trash-btn")) {
        todo.remove();
        checkEmpty();
    }


    if (button.classList.contains("check-btn")) {
        const statusBadge = todo.querySelector('.status-badge');
        
        
        if (statusBadge.innerText === "Pending") {
            
            statusBadge.innerText = "Completed";
            statusBadge.classList.remove('status-pending');
            statusBadge.classList.add('status-completed');
            todo.classList.add('completed-task'); 
        } else {
            
            statusBadge.innerText = "Pending";
            statusBadge.classList.remove('status-completed');
            statusBadge.classList.add('status-pending');
            todo.classList.remove('completed-task');
        }
    }
}


function filterTodo(e) {
    const todos = todoList.querySelectorAll('.todo-item');
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "grid";
                break;
            case "completed":
                if (todo.classList.contains("completed-task")) {
                    todo.style.display = "grid";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed-task")) {
                    todo.style.display = "grid";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function deleteAll() {
    const todos = todoList.querySelectorAll('.todo-item');
    // Hapus semua elemen list
    todos.forEach(todo => todo.remove());
    // Cek apakah kosong
    checkEmpty();
}

function checkEmpty() {
    const todos = todoList.querySelectorAll('.todo-item');
    if (todos.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}