
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#173F91">
    <meta name="description" content="Acceso seguro a Monitoring">
    <title>Iniciar sesión | Monitoring</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>

    <main class="login-page">
        <section class="login-card" aria-labelledby="login-title">

            <a class="brand" href="logi4.php" aria-label="Monitoring, inicio">
                <span class="brand-logo" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M3 12h4l3-7 4 14 3-7h4"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"/>
                    </svg>
                </span>

                <span class="brand-text">
                    <strong>MONITORING</strong>
                    <small>CONTROL INTELIGENTE</small>
                </span>
            </a>

            <div class="login-heading">
                <span class="login-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="10" width="16" height="11" rx="2"
                            stroke="currentColor" stroke-width="1.8"/>
                        <path d="M8 10V7a4 4 0 0 1 8 0v3"
                            stroke="currentColor" stroke-width="1.8"
                            stroke-linecap="round"/>
                    </svg>
                </span>

                <h1 id="login-title">Bienvenido</h1>
                <p>Ingresa tus credenciales para continuar.</p>
            </div>

            <form method="post" action="logi4.php">

                <!-- Conserva aquí el token CSRF generado por PHP -->
                <input
                    type="hidden"
                    name="csrf"
                    value="<?= htmlspecialchars($_SESSION['csrf'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
                >

                <div class="field">
                    <label for="usuario">Usuario</label>

                    <div class="input-box">
                        <svg viewBox="0 0 24 24" fill="none"
                            aria-hidden="true">
                            <circle cx="12" cy="8" r="4"
                                stroke="currentColor" stroke-width="1.7"/>
                            <path d="M4 21a8 8 0 0 1 16 0"
                                stroke="currentColor" stroke-width="1.7"
                                stroke-linecap="round"/>
                        </svg>

                        <input
                            id="usuario"
                            type="text"
                            name="usuario"
                            maxlength="7"
                            autocomplete="username"
                            placeholder="Ingresa tu usuario"
                            autocapitalize="none"
                            spellcheck="false"
                            required
                        >
                    </div>
                </div>

                <div class="field">
                    <label for="password">Contraseña</label>

                    <div class="input-box">
                        <svg viewBox="0 0 24 24" fill="none"
                            aria-hidden="true">
                            <rect x="4" y="10" width="16" height="11" rx="2"
                                stroke="currentColor" stroke-width="1.7"/>
                            <path d="M8 10V7a4 4 0 0 1 8 0v3"
                                stroke="currentColor" stroke-width="1.7"
                                stroke-linecap="round"/>
                        </svg>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            maxlength="8"
                            autocomplete="current-password"
                            placeholder="Ingresa tu contraseña"
                            required
                        >

                        <button
                            type="button"
                            class="password-toggle"
                            id="togglePassword"
                            aria-label="Mostrar contraseña"
                            aria-pressed="false"
                        >
                            <svg viewBox="0 0 24 24" fill="none"
                                aria-hidden="true">
                                <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                                    stroke="currentColor" stroke-width="1.7"/>
                                <circle cx="12" cy="12" r="3"
                                    stroke="currentColor" stroke-width="1.7"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <button class="submit-button" type="submit">
                    <span>Iniciar sesión</span>
                    <svg viewBox="0 0 24 24" fill="none"
                        aria-hidden="true">
                        <path d="M5 12h14m-6-6 6 6-6 6"
                            stroke="currentColor" stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"/>
                    </svg>
                </button>
            </form>

            <div class="security-note">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3 5 6v5c0 4.6 2.9 8.1 7 10 4.1-1.9 7-5.4 7-10V6l-7-3Z"
                        stroke="currentColor" stroke-width="1.7"
                        stroke-linejoin="round"/>
                </svg>
                Acceso seguro y autorizado
            </div>

        </section>

        <footer class="footer">
            © 2026 Monitoring
        </footer>
    </main>

    <script src="login.js"></script>
</body>
</html>
