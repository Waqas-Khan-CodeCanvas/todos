let todos = ""
// Function to update the UI of home page based on login status
async function updateHomePageUI() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userProfileButton = document.getElementById("userProfileButton");
  const todoList = document.getElementById("todoList");
  const completedTodos = document.getElementById("completed");
  const pendingTodos = document.getElementById("pending");
  todos = await fetchData("todos");
  
  let countPending = 0
  , countCompleted = 0
todos.forEach(todo => {
  const li = document.createElement("li");
  if(currentUser.id === todo.userId){
    todo.completed == true ? countCompleted++ : countPending++;
    const todoItem =  `
    <div class="list-group-item d-flex justify-content-between align-items-center">
            <div><i class="bi bi-${todo.completed == true ? "check2-circle": "circle"} text-success me-2"></i> ${todo.title} </div>
            <div>
              <span class="badge bg-${todo.completed == true ? "success": "warning"} me-2">${todo.completed == true ? "Completed": "Pending"} </span>
              <i class="bi bi-pencil-square text-primary me-2" role="button"></i>
              <i class="bi bi-trash text-danger" role="button"></i>
            </div>
          </div>
          `;
    li.innerHTML = todoItem;
    todoList.appendChild(li);
  }
});
  pendingTodos.textContent = countPending;
  completedTodos.textContent = countCompleted;
  if (currentUser) {
    userProfileButton.textContent = currentUser.name;
  }
}


const inputField = document.getElementById('searchInput');
inputField.addEventListener('input', function () {
  const currentValue = inputField.value.trim().toLowerCase();
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = ""; // Clear current list

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(currentValue)
  );

  filteredTodos.forEach(todo => {
    const li = document.createElement("li");
    const todoItem =  `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <div><i class="bi bi-${todo.completed == true ? "check2-circle": "circle"} text-success me-2"></i> ${todo.title} </div>
        <div>
          <span class="badge bg-${todo.completed == true ? "success": "warning"} me-2">${todo.completed == true ? "Completed": "Pending"} </span>
          <i class="bi bi-pencil-square text-primary me-2" role="button"></i>
          <i class="bi bi-trash text-danger" role="button"></i>
        </div>
      </div>
    `;
    li.innerHTML = todoItem;
    todoList.appendChild(li);
  });
  if(!todoList.hasChildNodes()){
    const li = document.createElement("li");
    li.innerHTML = `<h3 class="text-danger text-center my-3">  ▄︻デ══━一 404</h3>`
    todoList.appendChild(li)
  }


});