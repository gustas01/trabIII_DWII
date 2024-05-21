window.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname === "/login.html" && localStorage.getItem("token")) {
    window.location.href = "/index.html";
  }
  if (window.location.pathname !== "/login.html" && !localStorage.getItem("token")) {
    window.location.href = "/login.html";
  }

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

    const tweetsresponse = await fetch("http://localhost:3001/tweet", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const userdata = await userresponse.json();
    const tweetsdata = await tweetsresponse.json();

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

    document.getElementById("logout-button").addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("data");
      window.location.href = "/login.html";
    });

    document.getElementById("post-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const tweetContent = document.getElementById("post-form-textarea").value;
      if (!tweetContent) return;

      const response = await fetch("http://localhost:3001/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: tweetContent }),
      });

      const postTweetData = await response.json();
      if (postTweetData.success) window.location.reload();

      alert(postTweetData.content);
    });

    tweetsdata.content.forEach((tweet) => {
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

      if (tweet.likes.some((author) => author.id === userdata.content.id))
        likeButton.classList.add("active");

      likeButton.addEventListener("click", async () => {
        fetch(`http://localhost:3001/tweet/${tweet.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => likeButton.classList.toggle("active"));
      });

      deleteButton.addEventListener("click", () => {
        fetch(`http://localhost:3001/tweet/${tweet.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tweetsdata.content.splice(tweetsdata.content.findIndex((t) => t.id === tweet.id));
          document.getElementById("postContainer").removeChild(postDiv);
        });
      });

      document.getElementById("postContainer").appendChild(postDiv);
    });
  }
});
