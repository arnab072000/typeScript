const inputItem = document.getElementById('add-todo') as HTMLInputElement;
const listContainer = document.getElementById('list-container') as HTMLUListElement;

//type Todo = string;
// interface Todo {
//     todo: string[]
// }

let todos: string[] = JSON.parse(localStorage.getItem('todos') || '[]');

loadTodos();

function addTodo(): void {
    const todoValue = inputItem.value.trim();
    console.log(todoValue);
    
    if (todoValue === '' || !isNaN(Number(todoValue))) {
        alert('Write some text ...!');
    } else {
        todos.push(todoValue);
        createList(todoValue);
        inputItem.value = '';
        saveTodo();
    }
}

function createList (value: string): void {
    const li = document.createElement('li');
    
    li.innerHTML = `
        <input type="checkbox">
        <label>${value}</label>
    `;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteTodo';
    
    deleteButton.onclick = function (): void {

        const conformation = confirm('Are you sure you want to delete?')
        if(conformation) {
        todos = todos.filter(todo => todo !== value);
        listContainer.removeChild(li);
        saveTodo();
        }
    };
    
    li.appendChild(deleteButton);
    listContainer.appendChild(li);
}

function saveTodo(): void {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos(): void {
    todos.forEach(createList);
}

function clearTodo(): void {
    const conformationForAll = confirm('are you sure to delete all todos?');
    if(conformationForAll) {
    listContainer.innerHTML = '';
    todos = [];
    saveTodo();
    }
}


