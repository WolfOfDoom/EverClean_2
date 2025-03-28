document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Usuarios simulados 
    const usuarios = [
        { email: "usuario@everclean.tk", password: "123456", rol: "user" },
        { email: "saiko@everclean.tk", password: "elmejoradmin", rol: "admin" }
    ];

    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userRole", usuario.rol); // Guarda el rol
        alert(`¡Bienvenido ${usuario.rol === "admin" ? "Administrador" : "Usuario"}!`);
        window.location.href = "index.html";
    } else {
        alert("Credenciales incorrectas");
    }
});