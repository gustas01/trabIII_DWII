window.addEventListener("DOMContentLoaded", async () => {
  // if (window.location.pathname === "/login.html" && localStorage.getItem("token")) {
  //   window.location.href = "/index.html";
  // }
  // if (window.location.pathname !== "/login.html" && !localStorage.getItem("token")) {
  //   window.location.href = "/login.html";
  // }

  if (window.location.pathname === "/index.html") {
    // header
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    const userresponse = await fetch("http://localhost:3001/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const userdata = await userresponse.json();
    localStorage.setItem("data", JSON.stringify(userdata.content));
    document.getElementById("dropdown-data-user-button").innerText = userdata.content.firstName;

    // tweets content
    document.getElementById("myTweetsTab").addEventListener("click", async () => {
      document.getElementById("myTweetsTab").classList.add("active");
      document.getElementById("allTweetsTab").classList.remove("active");
    });

    document.getElementById("allTweetsTab").addEventListener("click", async () => {
      document.getElementById("allTweetsTab").classList.add("active");
      document.getElementById("myTweetsTab").classList.remove("active");
    });

    // Adiciona o card completo ao contêiner de postagens.
    userdata.content.tweets.forEach((tweet) => {
      var postDiv = document.createElement("div");
      postDiv.className = "card text-bg-dark mb-3";
      postDiv.style = "width: 100%; margin-bottom: 0 !important;";

      var cardHeader = document.createElement("div");
      cardHeader.className = "card-header";
      cardHeader.innerText = "O Nome do usuário";

      var cardBody = document.createElement("div");
      cardBody.className = "card-body";

      var bodyButtons = document.createElement("span");
      bodyButtons.className = "tweet-buttons";

      var cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.innerText = "O conteúdo do tweet"; // Insere o texto obtido do formulário.

      var likeButton = document.createElement("button");
      likeButton.className = "btn btn-sm btn-outline-primary like-button";

      var deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-sm btn-outline-danger delete-button";

      likeButton.innerHTML = "<i class='bi bi-heart'></i>";
      deleteButton.innerHTML = "<i class='bi bi-trash'></i>";

      bodyButtons.appendChild(likeButton);
      bodyButtons.appendChild(deleteButton);
      cardBody.appendChild(cardText);
      cardBody.appendChild(bodyButtons);
      postDiv.appendChild(cardHeader);
      postDiv.appendChild(cardBody);

      cardHeader.innerText = userdata.content.firstName + " " + userdata.content.lastName;
      cardText.innerText = tweet.content;
      document.getElementById("postContainer").appendChild(postDiv);
    });
  }
});

if (document.getElementById("form-login"))
  document.getElementById("form-login").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email-field").value;
    const password = document.getElementById("login-password-field").value;

    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    const loginresponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await loginresponse.json();
    if (!data.success) alert(data.content);
    else {
      localStorage.setItem("token", data.content.token);
      const userresponse = await fetch("http://localhost:3001/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.content.token}`,
        },
      });
      const userdata = await userresponse.json();
      localStorage.setItem("data", JSON.stringify(userdata.content));
      window.location.href = "/index.html";
    }
  });

function logout() {
  console.log("logout");
}

function loadMyProfileData() {
  console.log("loadMyProfileData");
}
