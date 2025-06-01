async function login(event) {
  event.preventDefault();

  const email = event.target.email.value.trim();
  const loadingBtn = document.getElementById("loading");
  console.log(email);

  if (!email) {
    showAlert("danger","please enter your email");
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



window.logoutUser =  function() {
  localStorage.removeItem("currentUser");
  window.location.href = "./login.html";
}