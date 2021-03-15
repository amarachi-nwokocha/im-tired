let form = document.getElementById("input");
let addBtn = document.getElementById("addBtn")
let input = document.getElementById("inputField")
let todos = [];
let listItems = document.getElementById('tasklist')
let id = ''
let modalForm = document.getElementById('modalInput')
let modalInput = document.getElementById('modal-id')
let save = document.getElementById('save');
//add eventlistener 
//get the input.value
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (input.value !== " ") {
    let newTodo = {
      id: Date.now(),
      name: input.value,
      completed: false
    }
    
    todos.push(newTodo);
    addToLocalStorage(todos)

  }
  input.value = " "
})

// 
function addToLocalStorage() {

  localStorage.setItem("todos", JSON.stringify(todos));
  //the two parameters are the name i want it to be in the thing in local storage
  //and the second one is the array name  
  getFromLocalStorage()
}
function getFromLocalStorage() {
  let items = JSON.parse(localStorage.getItem('todos'));
  console.log(items);
  if (items) {
    renderToDOM(items)
  }
}

function renderToDOM(items) {
  //create elements
  listItems.innerHTML = '';
  items.forEach((item) => {
    const checked = item.completed ? 'checked' : null;
    //create elements 
    let li = document.createElement('li');
    li.setAttribute('class', 'listItem');
    li.setAttribute('data-key', item.name);
    li.setAttribute('id', item.id)
    if (item.completed === true) {
      li.classList.add(checked)
    }
    li.innerHTML = `
      <i class="far fa-times-circle check"></i>
      <span> ${item.name} </span>
      <i class="far fa-edit edit" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
      <i class="fas fa-trash-alt DelBtn"></i>
      
      `

    listItems.appendChild(li)
  })
}
//toggle classes
function toggleTodo(name) {
  todos.forEach(todo => {
    if (todo.name == name) {
      todo.completed = !todo.completed;
    }
    addToLocalStorage(todos);
  })

}

//edit todo
function editFun(id, input) {
  console.log(id, input);
  console.log(todos);
  const todoIndex = todos.findIndex(todo => todo.id == id)
  const oneTodo = todos[todoIndex]
  console.log(todoIndex);
  oneTodo.name = input.value
  todos.splice(todoIndex, 1, oneTodo)
  addToLocalStorage(todos)
}

// delete function 
function delFunc(name) {
  todos = todos.filter(todo => {
    return todo.name != name
  });
  console.log(todos);
  addToLocalStorage(todos);
}
listItems.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-times-circle')) {
    toggleTodo(e.target.parentElement.getAttribute('data-key'));

  }
  if (e.target.classList.contains('DelBtn')) {
    delFunc(e.target.parentElement.getAttribute('data-key'))
  }
  if (e.target.classList.contains('edit')) {
    id = e.target.parentElement.getAttribute('id');
    modaldec(id)
    console.log(e.target.parentElement.getAttribute('id'));
  }

})
function modaldec(id) {
  console.log(id);
  let finder = todos.find(todo => todo.id == id)
  console.log(finder);
  modalInput.value = finder.name
}
save.addEventListener('click', (event) => {
  event.preventDefault();
  editFun(id, modalInput)
  getFromLocalStorage()
})
getFromLocalStorage()