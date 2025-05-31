document.addEventListener("DOMContentLoaded", function () {
  const url = window.location.pathname;
  if ( url.includes("index.html") || url === "/" || url === "") {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      window.location.href = "./login.html";
      return;
    } else {
      updateHomePageUI();
    }
  }
});

async function login(event) {
  event.preventDefault();

  const email = event.target.email.value.trim();
  const loadingBtn = document.getElementById("loading");

  if (!email) {
    alert(" Please enter your email.");
    return;
  }

  // Show loading UI
  loadingBtn.disabled = true;
  loadingBtn.textContent = "Loading...";

  try {
    const users = await fetchData("users");
    const user = users.find((u) => u.email === email);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      alert("No user found with this email.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An unexpected error occurred. Please try again.");
  } finally {
    loadingBtn.disabled = false;
    loadingBtn.textContent = "Login";
    event.target.reset();
  }
}
let todos = ""
// Function to update the UI of home page based on login status
async function updateHomePageUI() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userProfileButton = document.getElementById("userProfileButton");
  const todoList = document.getElementById("todoList");
  const completedTodos = document.getElementById("completed");
  const pendingTodos = document.getElementById("pending");
  console.log(completedTodos ,pendingTodos);
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


async function fetchData(query) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return null;
  }
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "./login.html";
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

