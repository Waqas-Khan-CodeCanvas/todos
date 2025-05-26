let users = [];
// Load existing users from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Load users from localStorage if they exist
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === ""
  ) {
 
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      window.location.href = "./login.html";
      return;
    }
    updateHomePageUI();
  }
});

// Function to register a new user
function registerUser(event) {
  event.preventDefault();
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("exampleInputEmail1").value.trim();
  const password = document
    .getElementById("exampleInputPassword1")
    .value.trim();

  if (fullName === "" || email === "" || password === "") {
    alert("Please fill in all fields.");
    return false;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    window.location.href = "./login.html";
    return false;
  }

  const user = {
    fullName: fullName,
    email: email,
    password: password,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "./login.html";
  return false;
}

function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("exampleInputEmail1").value.trim();
  const password = document
    .getElementById("exampleInputPassword1")
    .value.trim();

  if (email === "" || password === "") {
    alert("Please fill in all fields.");
    return false;
  }

  // Load users from localStorage if they exist
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }

  // Check if user exists
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    // Store current user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "./index.html";
  } else {
    alert("Invalid email or password. If you are new, please register first.");
    return false;
  }
  return false;
}

// Function to update the UI of home page based on login status
function updateHomePageUI() {
  const currentUser = localStorage.getItem("currentUser");
  const userProfileButton = document.getElementById("userProfileButton");

  if (currentUser) {
    const user = JSON.parse(currentUser);

    if (userProfileButton) {
      userProfileButton.textContent = user.fullName;
    }
  }
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "./login.html";
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}