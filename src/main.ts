import "./style.css";

const todoInput = document.querySelector("#todoInput") as HTMLInputElement;

const buttonElem = document.querySelector("#button");

buttonElem.addEventListener("click", () => {
  addUpdateTodo();
});

todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addUpdateTodo();
  }
});

const loadTodos: todo[] = JSON.parse(localStorage.getItem("data") || "[]");

function addUpdateTodo() {
  if (todoInput.value.trim() === "") {
    return;
  }
  addTodos({
    id: Date.now(),
    name: todoInput.value,
    isChecked: false,
  });
  renderTodoList();
  todoInput.value = "";
}

interface todo {
  id: number;
  name: string;
  isChecked: boolean;
}

const todos: todo[] = [];

todos.push(...loadTodos);

function saveTodos() {
  localStorage.setItem("data", JSON.stringify(todos));
}
function addTodos(input: todo) {
  todos.push(input);
  saveTodos();
}

const todoList = document.querySelector("#todoList") as HTMLDivElement;

renderTodoList();
todoList.addEventListener("click", (event) => {
  const target = event.target as HTMLInputElement;
  if (target.tagName === "INPUT") {
    const clickedTodo = todos.find((todo) => {
      return todo.id === Number(target.id);
    });
    if (clickedTodo) {
      clickedTodo.isChecked = !clickedTodo.isChecked;
      saveTodos();
      renderTodoList();
    }
  }
  if (target.tagName === "BUTTON") {
    const removedTodo = todos.findIndex((todo) => {
      return todo.id === Number(target.id);
    });
    if (removedTodo !== -1) {
      todos.splice(removedTodo, 1);
      saveTodos();
      renderTodoList();
    }
  }
});

function renderTodoList() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    todoList.insertAdjacentHTML(
      "beforeend",
      `<div
            class="flex items-center justify-between border-b-2 border-gray-200"
          >
            <label class="flex py-3 gap-3 items-center cursor-pointer">
              <input type="checkbox" id="${todo.id}" ${todo.isChecked ? "checked" : ""} class="w-5 h-5 border-2 border-gray-200" />
              <p class="text-xl cursor-pointer select-none ${todo.isChecked ? `line-through text-gray-400` : ""}">${todo.name}</p>
            </label>
            <button id="${todo.id}"
              class="bg-red-400 text-xl text-white px-3 py-0.5 rounded-xl cursor-pointer hover:brightness-110 active:scale-95"
            >
              Remove
            </button>
        </div>`,
    );
  });
}
