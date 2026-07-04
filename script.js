const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const heroVisual = document.querySelector("[data-hero-visual]");
const heroImages = heroVisual ? Array.from(heroVisual.querySelectorAll(".hero-visual-image")) : [];
const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));
const topFloat = document.querySelector("[data-top-float]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (duration) => new Promise((resolve) => {
  window.setTimeout(resolve, duration);
});

const waitForImage = (image) => new Promise((resolve) => {
  if (!image || (image.complete && image.naturalWidth > 0)) {
    resolve();
    return;
  }

  image.addEventListener("load", resolve, { once: true });
  image.addEventListener("error", resolve, { once: true });
});

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);

  if (topFloat) {
    topFloat.classList.toggle("is-visible", window.scrollY > 240);
  }
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

if (topFloat) {
  topFloat.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });
}

if (heroImages.length > 1) {
  let activeHeroIndex = Math.floor(Math.random() * heroImages.length);

  heroImages.forEach((image, index) => {
    image.classList.toggle("is-active", index === activeHeroIndex);
  });

  if (!reduceMotion) {
    window.setInterval(() => {
      heroImages[activeHeroIndex].classList.remove("is-active");
      activeHeroIndex = (activeHeroIndex + 1) % heroImages.length;
      heroImages[activeHeroIndex].classList.add("is-active");
    }, 8800);
  }
}

const revealSite = () => {
  document.body.classList.add("is-ready");
};

if (revealTargets.length) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16
    });

    revealTargets.forEach((target) => revealObserver.observe(target));
  }
}

const fontsReady = document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve();
const activeHeroImage = heroImages.find((image) => image.classList.contains("is-active"));

Promise.race([
  Promise.all([fontsReady, waitForImage(activeHeroImage), wait(420)]),
  wait(2200)
]).then(revealSite);
