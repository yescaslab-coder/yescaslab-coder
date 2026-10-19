
"use strict";

/* =========================================
   MonitoreoV5
   JavaScript nativo
   Parte 1 de 2
   ========================================= */


/* =========================================
   1. MENÚ RESPONSIVO
   ========================================= */

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) {
      closeMenu();
    }
  });
}


/* =========================================
   2. GRÁFICA DEMOSTRATIVA
   No utiliza librerías externas.
   Los valores son ficticios.
   ========================================= */

const canvas = document.querySelector("#temperatureChart");
const ctx = canvas ? canvas.getContext("2d") : null;

const periodButtons = document.querySelectorAll("[data-hours]");

let selectedHours = 24;

function drawTemperatureChart() {
  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) return;

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(rect.width * pixelRatio);
  canvas.height = Math.round(rect.height * pixelRatio);

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const width = rect.width;
  const height = rect.height;

  const padding = {
    top: 12,
    right: 10,
    bottom: 27,
    left: 39
  };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  if (plotWidth <= 0 || plotHeight <= 0) return;

  const minTemp = -24;
  const maxTemp = -12;

  const x = (index, total) => {
    return padding.left + (index / (total - 1)) * plotWidth;
  };

  const y = (temperature) => {
    return padding.top +
      ((maxTemp - temperature) / (maxTemp - minTemp)) * plotHeight;
  };

  /* Líneas horizontales y escala */

  ctx.font = "10px Arial, sans-serif";
  ctx.textBaseline = "middle";

  [-24, -21, -18, -15, -12].forEach((temperature) => {
    const positionY = y(temperature);

    ctx.beginPath();
    ctx.strokeStyle = "#E8EDF5";
    ctx.lineWidth = 1;
    ctx.moveTo(padding.left, positionY);
    ctx.lineTo(width - padding.right, positionY);
    ctx.stroke();

    ctx.fillStyle = "#7B8AA1";
    ctx.textAlign = "left";
    ctx.fillText(
      `${temperature}°`,
      0,
      positionY
    );
  });

  /* Datos ficticios para la demostración */

  const totalPoints = selectedHours * 2 + 1;

  const values = Array.from({ length: totalPoints }, (_, index) => {
    const variation =
      Math.sin(index * 0.32) * 0.85 +
      Math.sin(index * 0.91) * 0.35 +
      Math.cos(index * 0.17) * 0.45;

    return Math.max(
      -23.5,
      Math.min(-12.5, -18.4 + variation)
    );
  });

  /* Área bajo la línea */

  const gradient = ctx.createLinearGradient(
    0,
    padding.top,
    0,
    padding.top + plotHeight
  );

  gradient.addColorStop(0, "rgba(242, 140, 40, 0.20)");
  gradient.addColorStop(1, "rgba(242, 140, 40, 0.01)");

  ctx.beginPath();

  values.forEach((temperature, index) => {
    const positionX = x(index, totalPoints);
    const positionY = y(temperature);

    if (index === 0) {
      ctx.moveTo(positionX, positionY);
    } else {
      ctx.lineTo(positionX, positionY);
    }
  });

  ctx.lineTo(
    x(totalPoints - 1, totalPoints),
    padding.top + plotHeight
  );

  ctx.lineTo(
    x(0, totalPoints),
    padding.top + plotHeight
  );

  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  /* Línea principal */

  ctx.beginPath();

  values.forEach((temperature, index) => {
    const positionX = x(index, totalPoints);
    const positionY = y(temperature);

    if (index === 0) {
      ctx.moveTo(positionX, positionY);
    } else {
      ctx.lineTo(positionX, positionY);
    }
  });

  ctx.strokeStyle = "#F28C28";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();

  /* Último punto */

  const lastIndex = totalPoints - 1;
  const lastX = x(lastIndex, totalPoints);
  const lastY = y(values[lastIndex]);

  ctx.beginPath();
  ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#F28C28";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;
  ctx.stroke();

  /* Etiquetas de tiempo */

  ctx.fillStyle = "#7B8AA1";
  ctx.textBaseline = "middle";

  ctx.textAlign = "left";
  ctx.fillText(
    `-${selectedHours} h`,
    padding.left,
    height - 10
  );

  ctx.textAlign = "center";
  ctx.fillText(
    `-${Math.round(selectedHours / 2)} h`,
    padding.left + plotWidth / 2,
    height - 10
  );

  ctx.textAlign = "right";
  ctx.fillText(
    "Ahora",
    width - padding.right,
    height - 10
  );
}


/* =========================================
   3. SELECTOR DE PERIODOS
   12, 24 Y 36 HORAS
   ========================================= */

periodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const hours = Number(button.dataset.hours);

    if (![12, 24, 36].includes(hours)) return;

    selectedHours = hours;

    periodButtons.forEach((item) => {
      const active = item === button;

      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    drawTemperatureChart();
  });
});


/* =========================================
   4. REDIMENSIONAMIENTO DE LA GRÁFICA
   ========================================= */

if (canvas) {
  if ("ResizeObserver" in window) {
    const chartObserver = new ResizeObserver(() => {
      drawTemperatureChart();
    });

    chartObserver.observe(canvas);
  } else {
    window.addEventListener("resize", drawTemperatureChart);
  }
}

/* Dibujo inicial */

drawTemperatureChart();


/* =========================================
   5. VALOR DEMOSTRATIVO DEL PANEL
   ========================================= */

const currentTemperature = document.querySelector(
  "#currentTemperature"
);

if (currentTemperature) {
  currentTemperature.textContent = "-18.4 °C";
}

/* IMPORTANTE:
   Este valor es ilustrativo.
   No representa una lectura de un sensor real.
*/


/* =========================================
   MonitoreoV5
   JavaScript nativo
   Parte 2 de 2
   ========================================= */


/* =========================================
   6. ANIMACIONES DE APARICIÓN
   ========================================= */

// Activamos las animaciones únicamente si JavaScript funciona.
document.documentElement.classList.add("js");

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  // Mostramos el contenido sin animación si es necesario.
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}


/* =========================================
   7. AÑO AUTOMÁTICO DEL PIE DE PÁGINA
   ========================================= */

const currentYear = document.querySelector("#currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   8. SELECCIÓN DE PLANES
   Prepara el formulario para identificar
   el plan que interesa al visitante.
   ========================================= */

const planButtons = document.querySelectorAll("[data-plan]");
const leadForm = document.querySelector("#leadForm");
const formHeading = document.querySelector(".form-heading h3");

let selectedPlan = "";

function selectPlan(plan) {
  if (typeof plan !== "string" || !plan.trim()) return;

  selectedPlan = plan.trim();

  // Actualizamos el encabezado del formulario.
  if (formHeading) {
    formHeading.textContent = "Solicitud: " + selectedPlan;
  }

  // Guardamos el plan en un campo oculto del formulario.
  // Se crea con JavaScript para no tener que modificar el HTML.
  if (leadForm) {
    let planInput = leadForm.querySelector(
      'input[name="selectedPlan"]'
    );

    if (!planInput) {
      planInput = document.createElement("input");
      planInput.type = "hidden";
      planInput.name = "selectedPlan";
      leadForm.appendChild(planInput);
    }

    planInput.value = selectedPlan;
  }
}

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;

    if (plan) {
      selectPlan(plan);
    }
  });
});


/* =========================================
   9. WHATSAPP COMERCIAL
   Sustituye el valor vacío por tu número.
   Formato internacional: solo dígitos,
   sin +, espacios, guiones ni paréntesis.
   Ejemplo ficticio: 521234567890
   ========================================= */

const WHATSAPP_NUMBER = "";

const whatsappLinks = document.querySelectorAll("[data-whatsapp]");
const whatsappNote = document.querySelector("#whatsappNote");

function buildWhatsAppMessage() {
  const lines = [
    "Hola, me interesa conocer MonitoreoV5.",
    "",
    "Quisiera recibir información sobre el monitoreo de temperatura",
    "de equipos de refrigeración industrial."
  ];

  if (selectedPlan) {
    lines.push("", "Plan de interés: " + selectedPlan);
  }

  return lines.join("\n");
}

function configureWhatsApp() {
  const validNumber = /^\d{8,15}$/.test(WHATSAPP_NUMBER);

  whatsappLinks.forEach((link) => {
    if (validNumber) {
      const message = encodeURIComponent(buildWhatsAppMessage());

      link.href =
        "https://wa.me/" + WHATSAPP_NUMBER +
        "?text=" + message;

      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
      link.removeAttribute("title");
    } else {
      link.href = "#contacto";
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("aria-disabled", "true");
      link.title = "WhatsApp todavía no está configurado";
    }
  });

  if (whatsappNote) {
    if (validNumber) {
      whatsappNote.hidden = true;
    } else {
      whatsappNote.hidden = false;
      whatsappNote.textContent =
        "El contacto por WhatsApp estará disponible cuando " +
        "se configure el número comercial.";
    }
  }
}

// Evitamos que los enlaces sin número configurado
// aparenten abrir una conversación.
whatsappLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
      event.preventDefault();

      if (whatsappNote) {
        whatsappNote.hidden = false;
        whatsappNote.textContent =
          "WhatsApp aún no está configurado. " +
          "Puedes solicitar información mediante el formulario.";
      }
    }
  });
});

configureWhatsApp();


/* =========================================
   10. FORMULARIO DE CONTACTO
   Esta versión NO envía datos a un servidor.
   ========================================= */

const formMessage = document.querySelector("#formMessage");

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (formMessage) {
      formMessage.textContent = "";
    }

    // Validación nativa del navegador.
    if (!leadForm.checkValidity()) {
      leadForm.reportValidity();
      return;
    }

    const formData = new FormData(leadForm);

    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const branches = String(
      formData.get("branches") || "No especificado"
    );
    const plan = String(
      formData.get("selectedPlan") || selectedPlan || "No especificado"
    );

    // Comprobaciones adicionales.
    if (!name || !company || !email) {
      if (formMessage) {
        formMessage.textContent =
          "Completa tu nombre, empresa y correo electrónico.";
      }
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      if (formMessage) {
        formMessage.textContent =
          "Introduce un correo electrónico válido.";
      }
      return;
    }

    const consent = document.querySelector("#privacyConsent");

    if (!consent || !consent.checked) {
      if (formMessage) {
        formMessage.textContent =
          "Debes aceptar el consentimiento para continuar.";
      }
      return;
    }

    // En esta versión solo confirmamos la validación.
    // No guardamos ni transmitimos los datos.
    if (formMessage) {
      formMessage.textContent =
        "¡Gracias, " + name + "! Tus datos se validaron correctamente, " +
        "pero todavía no se han enviado. " +
        "El formulario necesita conectarse a un servicio para que " +
        "MonitoreoV5 reciba tu solicitud.";
    }

    console.info("Formulario validado localmente.", {
      name,
      company,
      email,
      phone,
      branches,
      plan
    });
  });
}


/* =========================================
   11. ACTUALIZACIÓN DEL MENSAJE DE WHATSAPP
   Si el visitante selecciona un plan,
   actualizamos el enlace con ese plan.
   ========================================= */

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (selectedPlan) {
      configureWhatsApp();
    }
  });
});


/* =========================================
   FIN DE MONITOREOV5 - APP.JS
   ========================================= */




