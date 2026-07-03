const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const heroVisual = document.querySelector("[data-hero-visual]");
const heroImages = heroVisual ? Array.from(heroVisual.querySelectorAll(".hero-visual-image")) : [];
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

const fontsReady = document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve();
const activeHeroImage = heroImages.find((image) => image.classList.contains("is-active"));

Promise.race([
  Promise.all([fontsReady, waitForImage(activeHeroImage), wait(420)]),
  wait(2200)
]).then(revealSite);
