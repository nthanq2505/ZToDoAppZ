window.onload = async function () {
  const localUser = localStorage.getItem("currentUser");
  const currentWindow = window.location.href.split("/").pop();

  if (localUser) {
    if (
      currentWindow === "login.html" ||
      currentWindow === "register.html" ||
      currentWindow === ""
    ) {
      window.location.href = "index.html";
    }
  } else {
    if (currentWindow === "index.html" || currentWindow === "") {
      window.location.href = "login.html";
    }
  }

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const tasks = await fetchTasks(user);
  
  if (window.location.href.split("/").pop() === "index.html") {
    const username = document.querySelector(".username");
    username.innerHTML = `
    <p>Hello, ${user.username}</p>
    <button class="red-button logout-button" onclick="logout()">Logout</button>
    `;
  }
  const taskManager = new TaskManager(tasks);
};

