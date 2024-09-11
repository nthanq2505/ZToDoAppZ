function handleLogin() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const remember = document.querySelector("#remember").checked;

  try {
    fetch(`${ApiRoot}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then(async (response) => {
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      await localStorage.setItem("currentUser", JSON.stringify(data));
      window.location.href = "index.html";
    });
  } catch (error) {
    alert("Login failed. Please try again.");
  }
}

function handleRegister() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const repeatPassword = document.querySelector("#repeat-password").value;

  if (password !== repeatPassword) {
    alert("Password does not match");
    return;
  }

  try {
    fetch(`${ApiRoot}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      localStorage.setItem("user", response);
      window.location.href = "index.html";
    });
  } catch (error) {
    alert("Register failed. Please try again.");
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("tasks");
  window.location.href = "login.html";
}
