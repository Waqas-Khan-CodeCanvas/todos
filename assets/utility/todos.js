import { fetchData } from "./api.js";
import { showAlert } from "./showAlert.js";

let todos = "";
// Function to update the UI of home page based on login status
async function updateHomePageUI() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const todoList = document.getElementById("todoList");
  const loadingBox = document.getElementById("loading");

  loadingBox.classList.remove("d-none");
  loadingBox.textContent = "loading...";

  try {
    todos = await fetchData("todos");
    let countPending = 0,
      countCompleted = 0;

    todos.forEach((todo) => {
      const li = document.createElement("li");
      if (currentUser.id === todo.userId) {
        todo.completed == true ? countCompleted++ : countPending++;
        const todoItem = `
            <div class="list-group-item d-flex justify-content-between align-items-center">
            <div><i class="bi bi-${todo.completed == true ? "check2-circle" : "circle"} text-success me-2 circle"></i> ${todo.title} </div>
            <div>
              <span class="badge bg-${todo.completed == true ? "success" : "warning"} me-2">${todo.completed == true ? "Completed" : "Pending"} </span>
              <i class="bi bi-pencil-square text-primary me-2" role="button"></i>
              <i class="bi bi-trash text-danger" role="button"></i>
            </div>
          </div>
          `;
        li.innerHTML = todoItem;
        todoList.appendChild(li);
      }
    });
    document.getElementById("pending").textContent = countPending;
    document.getElementById("completed").textContent = countCompleted;
    
  } catch (error) {
    showAlert("trying to get user todos...", "info");
  } finally {
    loadingBox.classList.add("d-none");
    loadingBox.textContent = "loading...";
  }
}

// document.getElementById("searchInput").addEventListener("input", function () {
//   const searchTerm = this.value.toLowerCase();
//   const todoItems = document.querySelectorAll("#todoList li");

//   todoItems.forEach((li) => {
//     const taskText = li.textContent.toLowerCase();
//     if (taskText.includes(searchTerm)) {
//       li.style.display = ""; // Show item
//     } else {
//       li.style.display = "none"; // Hide item
//     }
//   });
// });

document.getElementById("searchInput").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const todoItems = document.querySelectorAll("#todoList li");

  todoItems.forEach((li) => {
    const textElement = li.querySelector('.list-group-item > div:nth-child(1)');
    const originalText = textElement.textContent;

    // Reset any previous highlight
    textElement.innerHTML = originalText;

    if (searchTerm === "") {
      li.style.display = "";
      return;
    }

    if (originalText.toLowerCase().includes(searchTerm)) {
      li.style.display = "";

      // Highlight matched part
      const regex = new RegExp(`(${searchTerm})`, "gi");
      textElement.innerHTML = originalText.replace(regex, `<mark>$1</mark>`);
    } else {
      li.style.display = "none";
    }
  });
});




export { updateHomePageUI };
