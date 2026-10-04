const githubProfile = "https://github.com/anirudhvashist";

const projectData = [
  {
    title: "Focus Flow",
    category: "PRODUCTIVITY · UTILITIES & TOOLS",
    description: "It is a minimal, distraction-free web-app designed to help you organize your daily work and protect your attention.",
    stack: ["HTML", "CSS", "JAVASCRIPT"],
    badge: "FF"
  },
  {
    title: "Campus X Change",
    category: "E-COMMERCE · CAMPUS MARKETPLACE",
    description: "A peer-to-peer marketplace for students to buy, sell, and exchange books, electronics, hostel essentials, and more within their campus community.",
    stack: ["Next.js", "React 19", "Tailwind CSS", "PostgreSQL", "Prisma", "Cloudinary", "Vercel"],
    badge: "CxC"
  },
];

const certificateData = [
  { name: "SQL (Basic) Skill Certification", provider: "HackerRank", description: "Relational querying, filtering, and join operations.", file: "certificates/sql_basic certificate.pdf" },
  { name: "Resume Writing with AI Support", provider: "Forage", description: "AI-assisted resume and job description analysis simulation.", file: "certificates/RESUME BUILDING + AI certificate.pdf" },
  { name: "Bharatiya Antariksh Hackathon 2026", provider: "ISRO", description: "Participation in a national space innovation challenge.", file: "certificates/ISRO certificate.pdf" },
  { name: "NextBuildOn Hackathon", provider: "Unstop / NextBuildOn", description: "Team-based product building hackathon experience.", file: "certificates/NextBuildOn Hackathon.pdf" },
  { name: "United Hacks V7", provider: "Hack United", description: "Collaborative participation in a developer-focused hackathon.", file: "certificates/unitedHack.pdf" },
  { name: "Excel Certification", provider: "Coursera / Freedom Learning Group", description: "Structured learning in Excel fundamentals and productivity workflows.", file: "certificates/EXCEL CERTIFICATE.pdf" },
  { name: "Orchestrate Challenge · June 2026", provider: "HackerRank", description: "AI orchestration challenge participation.", file: "certificates/HackerRank Certificate (June).png" },
  { name: "Orchestrate Challenge · August 2026", provider: "HackerRank", description: "AI orchestration challenge participation.", file: "certificates/HackerRank Certificate (August).png" }
];

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  grid.innerHTML = projectData.map((project) => `
    <article class="project-card">
      <div class="project-visual" aria-hidden="true"><span class="project-badge">${project.badge}</span></div>
      <div class="project-info">
        <span class="project-meta">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <ul class="tech-stack">${project.stack.map((item) => `<li>${item}</li>`).join("")}</ul>
        <div class="card-links"><a href="${githubProfile}" target="_blank" rel="noopener noreferrer">Explore on GitHub <span aria-hidden="true">↗</span></a></div>
      </div>
    </article>
  `).join("");
}

function renderCertificates() {
  const grid = document.getElementById("certificate-grid");
  if (!grid) return;
  grid.innerHTML = certificateData.map((certificate) => {
    const fileUrl = encodeURI(certificate.file);
    return `
      <article class="certificate-card">
        <span class="certificate-meta">${certificate.provider}</span>
        <h3>${certificate.name}</h3>
        <p>${certificate.description}</p>
        <div class="card-links"><a href="${fileUrl}" target="_blank" rel="noopener noreferrer">View certificate <span aria-hidden="true">↗</span></a></div>
      </article>
    `;
  }).join("");
}

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  navMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }));
}

const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = new Date().getFullYear();
renderProjects();
renderCertificates();

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeText = document.querySelector(".theme-text");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, persist = false) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
    themeToggle.setAttribute("title", `Switch to ${dark ? "light" : "dark"} mode`);
    themeToggle.setAttribute("aria-pressed", String(dark));
  }
  if (themeIcon) themeIcon.textContent = dark ? "☀" : "☾";
  if (themeText) themeText.textContent = dark ? "Light" : "Dark";
  if (themeColor) themeColor.setAttribute("content", dark ? "#101827" : "#101a2c");
  if (persist) {
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* Theme still works when storage is unavailable. */ }
  }
}

applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  });
}

const revealItems = document.querySelectorAll(
  ".section-heading, .project-card, .about-copy, .skill-card, .education-card, .profile-card, .certificate-card, .contact-card"
);
revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  if (index % 4 > 0) item.classList.add(`reveal-delay-${index % 4}`);
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

