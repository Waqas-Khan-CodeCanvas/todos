import { showAlert } from "./showAlert.js";
import { fetchData } from "./api.js";

window.login = async function(event) {
  event.preventDefault();

  const email = event.target.email.value.trim();
  const loadingBtn = document.getElementById("loading");

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
      showAlert("No user found with this email.");
    }
  } catch (error) {
    console.error("Login error:", error);
    showAlert(`An error occurred. Please try again. `);
  } finally {
    loadingBtn.disabled = false;
    loadingBtn.textContent = "Login";
    event.target.reset();
  }
}



