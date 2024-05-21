window.addEventListener("DOMContentLoaded", async () => {
  // if (window.location.pathname === "/login.html" && localStorage.getItem("token")) {
  //   window.location.href = "/index.html";
  // }
  // if (window.location.pathname !== "/login.html" && !localStorage.getItem("token")) {
  //   window.location.href = "/login.html";
  // }

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
});
