const themeToggle = document.querySelector("#themeToggle");
const mobileMenu = document.querySelector(".mobile-menu");
const collapseBtn = document.querySelector(".collapse-btn");
const navLinks = document.querySelectorAll(".nav-list a");
const pages = document.querySelectorAll(".page");

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function showPage(targetId) {
  pages.forEach((page) => {
    page.hidden = page.id !== targetId;
    page.classList.toggle("active", page.id === targetId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const icon = document.body.classList.contains("dark") ? "sun" : "moon";
  themeToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
  refreshIcons();
});

mobileMenu?.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

collapseBtn?.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
  const icon = document.body.classList.contains("collapsed") ? "panel-left-open" : "panel-left-close";
  collapseBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
  refreshIcons();
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").replace("#", "");
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    document.body.classList.remove("nav-open");
    showPage(targetId);
  });
});

pages.forEach((page, index) => {
  page.hidden = index !== 0;
});

refreshIcons();
