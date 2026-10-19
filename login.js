
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
        const showPassword = passwordInput.type === "password";

        passwordInput.type = showPassword ? "text" : "password";

        togglePassword.setAttribute(
            "aria-label",
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
        );

        togglePassword.setAttribute(
            "aria-pressed",
            String(showPassword)
        );
    });
}
