export function scrollToSection(id: string) {
  const target = document.getElementById(id);

  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });

  if (window.location.pathname === "/") {
    window.history.replaceState(null, "", "/");
  }
}
