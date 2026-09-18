/* ==========================================================================
   KANAYE — script principal
   Aucune dépendance externe. Fonctions indépendantes, faciles à retirer
   ou modifier séparément si besoin.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     1. Barre de navigation : ombre au scroll + menu mobile
  --------------------------------------------------------------------- */
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  function onScrollNav() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------------------
     2. Diagramme "coque / cœur" — un seul moment animé, déclenché une
        fois quand la section entre dans l'écran (pas d'effet répété).
  --------------------------------------------------------------------- */
  var geste = document.querySelector(".geste-visual");
  if (geste) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      geste.classList.add("is-visible");
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              geste.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      io.observe(geste);
    }
  }

  /* ---------------------------------------------------------------------
     3. Effet "projecteur" sur le visuel de gamme (Douce Cane / Lava Cane)
        Le halo suit le curseur ; au clavier/tactile il reste centré.
  --------------------------------------------------------------------- */
  var gammeFrame = document.querySelector(".gamme-frame");
  if (gammeFrame && !reduceMotion) {
    gammeFrame.addEventListener("pointermove", function (e) {
      var rect = gammeFrame.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      gammeFrame.style.setProperty("--mx", x + "%");
    });
    gammeFrame.addEventListener("pointerleave", function () {
      gammeFrame.style.setProperty("--mx", "50%");
    });
  }

  /* ---------------------------------------------------------------------
     4. Année automatique dans le footer
  --------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
