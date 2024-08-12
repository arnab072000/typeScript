var inputItem = document.getElementById('add-todo');
var listContainer = document.getElementById('list-container');
//type Todo = string;
// interface Todo {
//     todo: string[]
// }
var todos = JSON.parse(localStorage.getItem('todos') || '[]');
loadTodos();
function addTodo() {
    var todoValue = inputItem.value.trim();
    console.log(todoValue);
    if (todoValue === '' || !isNaN(Number(todoValue))) {
        alert('Write some text ...!');
    }
    else {
        todos.push(todoValue);
        createList(todoValue);
        inputItem.value = '';
        saveTodo();
    }
}
function createList(value) {
    var li = document.createElement('li');
    li.innerHTML = "\n        <input type=\"checkbox\">\n        <label>".concat(value, "</label>\n    ");
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteTodo';
    deleteButton.onclick = function () {
        var conformation = confirm('Are you sure you want to delete?');
        if (conformation) {
            todos = todos.filter(function (todo) { return todo !== value; });
            listContainer.removeChild(li);
            saveTodo();
        }
    };
    li.appendChild(deleteButton);
    listContainer.appendChild(li);
}
function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function loadTodos() {
    todos.forEach(createList);
}
function clearTodo() {
    var conformationForAll = confirm('are you sure to delete all todos');
    if (conformationForAll) {
        listContainer.innerHTML = '';
        todos = [];
        saveTodo();
    }
}
