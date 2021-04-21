// function ConnectToNetwork(port) {
//   switch (port) {
//     case 80:
//       return function (name, password) {
//         console.log(`I'm connected via HTTP on port ${port}`);
//         console.log(`Connection username ${name}`);
//         console.log(`Connection password ${password}`);
//       };
//     case 443:
//       return function (name, password, certificate) {
//         console.log(`I'm connected via HTTPS on port ${port}`);
//         console.log(`Connection username ${name}`);
//         console.log(`Connection password ${password}`);
//         console.log(`Connection certificate ${certificate}`);
//       };

//     default:
//       break;
//   }
// }

// const httpConnection = ConnectToNetwork(80);
// const httpsConnection = ConnectToNetwork(443);

// console.log(httpConnection("admin", "123"));
// console.log(httpConnection("ivan.ivanov", "qwerty"));
// console.log(httpsConnection("root", "789456123", "ca#1"));

function renderApp(todos) {
  let newTodos;
  switch (filterKey) {
    case "completed":
      newTodos = todos.filter((todo) => todo.completed);
      break;
    case "uncompleted":
      newTodos = todos.filter((todo) => !todo.completed);
      break;
    default:
      newTodos = todos;
  }
  const todoHtml = newTodos
    .map((todo) =>
      TodoItemComponent.render({
        id: todo.id,
        text: todo.text,
        completed: todo.completed,
      })
    )
    .reduce((htmlString, todoHtmlString) => (htmlString += todoHtmlString), "");
  todolist.innerHTML = todoHtml;
}

function addTodo(todoText) {
  todos.push(new TodoItem(todos.length + 1, todoText));
  renderApp(todos);
}

function toggleTodo(todoId) {
  const todo = todos.find((todo) => todo.id === todoId);
  if (!todo) return;
  todo.completed = !todo.completed;
  renderApp(todos);
}

function removeTodo(todoId) {
  const todo = todos.find((todo) => todo.id === todoId);
  if (!todo) return;
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  renderApp(todos);
}

class TodoItemComponent {
  static render(props) {
    return `<li class="todolist-todo ${props.completed ? "completed" : ""}">
        <span>
            <input type="checkbox" id="todolist-checkbox-${
              props.id
            }" onchange="toggleTodo(${props.id})" 
            ${props.completed ? "checked" : ""}>
            <label for="todolist-checkbox-${props.id}">${props.text}</label>
        </span>
        <button class="todolist-remove-todo" onclick="removeTodo(${
          props.id
        })">&times;</button>
        </li>`;
  }
}

class TodoItem {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

const todolist = document.getElementById("todolist");
let filterKey = "all";
const todos = [
  new TodoItem(1, "learn HTML"),
  new TodoItem(2, "learn CSS"),
  new TodoItem(3, "learn JavaScript"),
];

const todolistInput = document.getElementById("todolist-input");
todolistInput.addEventListener("keydown", function (event) {
  if (event.key !== "Enter") return;
  addTodo(this.value);
});

const todoListFilter = document
  .getElementById("todolist-filter")
  .addEventListener("change", function () {
    const filterOption = this.options[this.selectedIndex].value;
    filterKey = filterOption;
    renderApp(todos);
  });

renderApp(todos);
