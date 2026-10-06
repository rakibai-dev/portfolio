document.documentElement.classList.add("js");

const projectDetails = {
  bloom: {
    eyebrow: "01 / DIGITAL PRODUCT / CONCEPT STUDY",
    title: "Bloom, at your own pace.",
    summary:
      "A plant-care companion that turns scattered advice into a few useful, low-pressure rituals. A self-initiated exploration in making everyday care feel a little more intuitive.",
    details: [
      ["The question", "Could plant care feel encouraging instead of overwhelming for someone just getting started?"],
      ["The idea", "A gentle check-in for each plant, with clear next steps and just enough guidance to build confidence."],
      ["The craft", "Product direction, interface design, visual system, and a small set of interaction patterns."],
      ["A detail I like", "Progress is framed as a sign of care—not a score to keep up with."]
    ]
  },
  commonplace: {
    eyebrow: "02 / IDENTITY & WEB / CONCEPT STUDY",
    title: "Good things, closer.",
    summary:
      "A neighbourhood culture guide for finding the bookshop, community table, or tiny event you might otherwise walk past. An independent concept about making local discovery feel more personal.",
    details: [
      ["The question", "How might a digital guide help people feel more connected to the places around them?"],
      ["The idea", "A welcoming local directory shaped around people and moments—not endless listings."],
      ["The craft", "Naming, identity, editorial direction, responsive web design, and wayfinding."],
      ["A detail I like", "A hand-drawn map turns browsing into the feeling of taking a small walk."]
    ]
  },
  sunday: {
    eyebrow: "03 / ART DIRECTION & COMMERCE / CONCEPT STUDY",
    title: "A little more Sunday.",
    summary:
      "A thoughtful pantry shop built around useful staples and slower, everyday rituals. A self-directed study in giving a small online shop the warmth of a well-loved cupboard.",
    details: [
      ["The question", "Can an online shop feel considered and calm without making the everyday feel precious?"],
      ["The idea", "A small edit of honest essentials, introduced with clear information and a little personality."],
      ["The craft", "Art direction, packaging language, storefront concept, and product-page design."],
      ["A detail I like", "The visual language borrows its quiet confidence from labels, jars, and handwritten notes."]
    ]
  }
};

const dialog = document.querySelector(".project-dialog");
const dialogContent = document.querySelector(".dialog-content");
const dialogClose = document.querySelector(".dialog-close");
let activeProjectButton = null;

function openProject(projectKey, trigger) {
  const project = projectDetails[projectKey];
  if (!project || !dialog || !dialogContent) return;

  activeProjectButton = trigger;
  const detailMarkup = project.details
    .map(
      ([heading, text]) => `
        <article class="dialog-detail">
          <h3>${heading}</h3>
          <p>${text}</p>
        </article>`
    )
    .join("");

  dialogContent.innerHTML = `
    <p class="dialog-eyebrow">${project.eyebrow}</p>
    <h2 id="dialog-title">${project.title}</h2>
    <p class="dialog-summary">${project.summary}</p>
    <div class="dialog-detail-grid">${detailMarkup}</div>
    <p class="dialog-note">An independent concept study — not commissioned client work.</p>
  `;

  dialog.showModal();
  dialogClose?.focus();
}

document.querySelectorAll(".project-card[data-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project, button));
});

dialogClose?.addEventListener("click", () => dialog?.close());

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

dialog?.addEventListener("close", () => {
  activeProjectButton?.focus();
  activeProjectButton = null;
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

function setMenuOpen(isOpen) {
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  primaryNav?.classList.toggle("is-open", isOpen);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) setMenuOpen(false);
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -24px 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
