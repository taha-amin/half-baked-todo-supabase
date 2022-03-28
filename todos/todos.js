import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();

    //get data from the form
    const data = new FormData(todoForm);

    //call our createToDo function

    await createTodo({
        amount: data.get('amount'),
        item: data.get('item'),
        is_bought: false,
    });

    todoForm.reset();

    //re-fetch and re-append
    await displayTodos();
});

async function displayTodos() {
    // fetch the todos
    const todos = await getTodos();

    todosEl.textContent = '';

    // display the list of todos
    for (let todo of todos) {
        const todoEl = renderTodo(todo);

        // be sure to give each todo an event listener
        // on click, complete that todo
        todoEl.addEventListener('click', async () => {
            await completeTodo(todo.id);

            displayTodos();
        });

        todosEl.append(todoEl);
    }
}

// add an on load listener that fetches and displays todos on load


logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();

    // then refetch and display the updated list of todos
    await displayTodos();
});
