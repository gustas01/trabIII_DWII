window.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname === "/index.html" && localStorage.getItem("token")) {
    window.location.href = "/home.html";
  }
  if (
    window.location.pathname !== "/index.html" &&
    window.location.pathname !== "/signup.html" &&
    !localStorage.getItem("token")
  ) {
    window.location.href = "/index.html";
  }

  if (document.getElementById("form-login"))
    document.getElementById("form-login").addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email-field").value;
      const password = document.getElementById("login-password-field").value;
      const firstName = document.getElementById("login-firstname-field").value;
      const lastName = document.getElementById("login-lastname-field").value;

      if (!email || !password || !firstName || !lastName) {
        alert("Preencha todos os campos");
        return;
      }

      const loginresponse = await fetch("https://trabiii-dwii.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      const data = await loginresponse.json();

      if (!data.success) alert(data.content);
      else {
        alert(data.content);
        window.location.href = "/index.html";
      }
    });
});
