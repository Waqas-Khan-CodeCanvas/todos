import showAlert from "./assets/utility/showAlert.js";
showAlert("danger","please enter your email");
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










