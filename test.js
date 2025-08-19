console.log("loaded");
var navElements;
var navElementsBurger;
var sections;

function initScript() {
    initDarkNavSwitch();
    initGsap();
  initAnimBubbles();
initAnimCibles()
}

function initDarkNavSwitch() {
  // script pour navbar Negative on dark section
  sections = document.querySelectorAll("[bg-theme]"); // adjust if needed
  navElements = document.querySelectorAll("[darkMode]");
  navElementsBurger = document.querySelectorAll("[darkmodeburger]");
  checkNavbarSection();
}

function GoDark() {
  navElements.forEach((element) => {
    const classToAdd = element.getAttribute("darkMode");
    element.classList.add(classToAdd);
  });
  navElementsBurger.forEach((element) => {
    element.style.backgroundColor = "white";
  });
}

function GoLight() {
  navElements.forEach((element) => {
    const classToAdd = element.getAttribute("darkMode");
    element.classList.remove(classToAdd);
  });
  navElementsBurger.forEach((element) => {
    element.style.backgroundColor = "black";
  });
}

function checkNavbarSection() {
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom > 0) {
      const bgColor = section.getAttribute("bg-theme");
      if (bgColor === "dark") {
        GoDark();
      } else {
        GoLight();
      }
      break;
    }
  }
}

function isLightColor(rgb) {
  // Extract R, G, B values from rgb(...) string
  const match = rgb.match(/\d+/g);
  if (!match) return false;

  const [r, g, b] = match.map(Number);

  // Calculate relative luminance (perceived brightness)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Consider "light" if luminance is above threshold
  return luminance > 0.8; // adjust threshold (0 = black, 1 = white)
}

document.querySelectorAll('[force-bg-dark="true"]').forEach((div) => {
  const bgColor = window.getComputedStyle(div).backgroundColor;

  // Check if background is white (rgb(255, 255, 255))
  if (isLightColor(bgColor)) {
    div.style.backgroundColor = "black";
    //div.style.color = 'white'; // optional: for readability
  }
});

window.addEventListener("scroll", () => {
  window.requestAnimationFrame(checkNavbarSection);
});



function initGsap() {
  // S'assurer que GSAP est chargé
  if (typeof gsap === "undefined") {
    console.error(
      "GSAP n'est pas chargé. Veuillez inclure la bibliothèque GSAP.",
    );
    return;
  }

  // Initialiser tous les éléments load-nav-menu
  const loadElements = document.querySelectorAll("[load-nav-menu]");
  gsap.set(loadElements, {
    opacity: 0,
    y: 24,
    pointerEvents: "none",
  });

  // Gérer le survol des éléments start-nav-menu
  const startElements = document.querySelectorAll("[start-nav-menu]");
  startElements.forEach((startElement) => {
    const menuName = startElement.getAttribute("start-nav-menu");

    // Au survol du déclencheur
    startElement.addEventListener("mouseenter", function () {
      const targetElements = document.querySelectorAll(
        `[load-nav-menu="${menuName}"]`,
      );

      // Animation avec GSAP
      gsap.to(targetElements, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.1,
      });
    });

    // Quand on quitte le déclencheur
    startElement.addEventListener("mouseleave", function () {
      const targetElements = document.querySelectorAll(
        `[load-nav-menu="${menuName}"]`,
      );

      // Animation avec GSAP
      gsap.to(targetElements, {
        opacity: 0,
        y: 15,
        pointerEvents: "none",
        duration: 0.05,
        ease: "power2.in",
      });
    });
  });
};


function initAnimBubbles() {
  // Vérification si l'appareil est mobile
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) ||
    window.innerWidth < 768;

  // Ne pas exécuter l'animation sur mobile
  if (isMobile) {
    return; // Sortir de la fonction si c'est un appareil mobile
  }

  // Sélectionnez toutes vos formes par l'attribut data-moving-shape
  const shapes = document.querySelectorAll("[data-moving-shape]");
  const container = document.querySelector(".animation-container");

  // Pour chaque forme
  shapes.forEach((shape) => {
    // Position initiale aléatoire
    const x = Math.random() * (container.offsetWidth - shape.offsetWidth);
    const y = Math.random() * (container.offsetHeight - shape.offsetHeight);

    // Vitesse normale horizontalement, mais réduite verticalement
    const horizontalSpeed = 5; // Mouvement normal sur l'axe X
    const verticalSpeed = 1.5; // Mouvement réduit sur l'axe Y

    let speedX = (Math.random() - 0.5) * horizontalSpeed;
    let speedY = (Math.random() - 0.5) * verticalSpeed;

    // Vous pouvez aussi personnaliser la vitesse selon l'ID de la forme
    const shapeId = shape.getAttribute("data-shape-id");
    if (shapeId === "1") {
      // Personnalisation pour la première forme si nécessaire
    }

    // Positionnez initialement la forme
    shape.style.left = x + "px";
    shape.style.top = y + "px";

    // Fonction d'animation
    function animate() {
      // Position actuelle
      let currentX = parseFloat(shape.style.left);
      let currentY = parseFloat(shape.style.top);

      // Nouvelle position
      let newX = currentX + speedX;
      let newY = currentY + speedY;

      // Vérification des limites et rebonds
      if (newX <= 0 || newX >= container.offsetWidth - shape.offsetWidth) {
        speedX = -speedX;
      }

      if (newY <= 0 || newY >= container.offsetHeight - shape.offsetHeight) {
        speedY = -speedY;
      }

      // Appliquer la nouvelle position
      shape.style.left = newX + "px";
      shape.style.top = newY + "px";

      // Continuer l'animation
      requestAnimationFrame(animate);
    }

    // Démarrer l'animation
    animate();
  });
};

/* cards home */
/*                         */
/*                         */
/*                         */
function initAnimCibles() {
  // Vérifier si nous devons initialiser l'animation lettre par lettre
  const allTexts = document.querySelectorAll(
    ".startup-txt, .pme-txt, .scaleup-txt, .grandgroupe-txt",
  );

  // Convertir le texte en spans individuels pour chaque lettre
  allTexts.forEach((textElement) => {
    const text = textElement.innerText;
    textElement.innerHTML = "";

    // Créer un span pour chaque lettre
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.innerText = text[i];
      textElement.appendChild(span);
    }
  });

  // Pour chaque texte/carte
  const cardStartup = document.querySelector(".card-startup");
  const txtStartup = document.querySelector(".startup-txt");

  const cardPme = document.querySelector(".card-pme");
  const txtPme = document.querySelector(".pme-txt");

  const cardScaleup = document.querySelector(".card-scaleup");
  const txtScaleup = document.querySelector(".scaleup-txt");

  const cardGrandgroupe = document.querySelector(".card-grandgroupe");
  const txtGrandgroupe = document.querySelector(".grandgroupe-txt");

  // Fonction pour désactiver tous les textes
  function resetAllTexts() {
    allTexts.forEach((text) => text.classList.remove("text-active"));
  }

  // Event listeners pour chaque carte
  if (cardStartup) {
    cardStartup.addEventListener("mouseenter", function () {
      resetAllTexts();
      txtStartup.classList.add("text-active");
    });
  }

  if (cardPme) {
    cardPme.addEventListener("mouseenter", function () {
      resetAllTexts();
      txtPme.classList.add("text-active");
    });
  }

  if (cardScaleup) {
    cardScaleup.addEventListener("mouseenter", function () {
      resetAllTexts();
      txtScaleup.classList.add("text-active");
    });
  }

  if (cardGrandgroupe) {
    cardGrandgroupe.addEventListener("mouseenter", function () {
      resetAllTexts();
      txtGrandgroupe.classList.add("text-active");
    });
  }

  // Réinitialiser quand on quitte la zone des cartes
  const cardsContainer = document.querySelector(".cards-container");
  if (cardsContainer) {
    cardsContainer.addEventListener("mouseleave", function () {
      resetAllTexts();
    });
  }
};

/* cursor logos home */
/*                         */
/*                         */
/*                         */

/// Cible la zone "logos" et initialise le curseur personnalisé
const logos = document.querySelector(".section_logo");
const customCursor = document.createElement("div");
customCursor.classList.add("custom-cursor2");
// document.body.appendChild(customCursor);

// Fonction pour mettre à jour la position du curseur
function updateCursorPosition(e) {
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
}
if (logos) {
  // Quand la souris entre dans `.logos`, le curseur apparaît avec scale
  logos.addEventListener("mouseenter", () => {
    customCursor.style.display = "block";
  });

  // Quand la souris bouge dans `.logos`, mettre à jour sa position
  logos.addEventListener("mousemove", (e) => {
    updateCursorPosition(e);
  });

  // Quand la souris quitte `.logos`, le curseur disparaît avec scale
  logos.addEventListener("mouseleave", () => {
    setTimeout(() => {
      customCursor.style.display = "none";
    }, 300); // Delay matches the CSS transition
  });

  // Si la section scroll, garder le curseur affiché
  logos.addEventListener("scroll", () => {
    customCursor.style.display = "block";
  });
}

function animateCurrentSlide() {
  document.querySelectorAll("[cascade-animate]").forEach((el, index) => {
    const grandparent = el.parentElement?.parentElement;
    const hasActiveSlideClass = grandparent?.classList.contains(
      "swiper-slide-active",
    );
    if (hasActiveSlideClass) {
      const order = el.getAttribute("cascade-animate");
      gsap.from(el, {
        duration: 0.4,
        opacity: 0,
        filter: "blur(10px)",
        y: 50,
        ease: "power4.out",
        delay: 0.1 * order,
      });
    } else {}
  });
}
