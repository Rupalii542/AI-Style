"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Ensure user is logged in
  if (typeof requireAuth === "function") requireAuth("login.html");
  const user = typeof getLoggedInUser === "function" ? getLoggedInUser() : null;

  // Render username
  const nameEl = document.getElementById("sidebarUserName");
  if (nameEl) nameEl.textContent = user?.username || "Guest";

  // Sidebar toggle with persistence
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");
  const collapsedInitially = typeof getSidebarCollapsed === "function" ? getSidebarCollapsed() : false;
  if (sidebar && collapsedInitially) sidebar.setAttribute("data-collapsed", "true");

  toggle?.addEventListener("click", () => {
    const isCollapsed = sidebar?.getAttribute("data-collapsed") === "true";
    const next = !isCollapsed;
    if (next) sidebar?.setAttribute("data-collapsed", "true");
    else sidebar?.removeAttribute("data-collapsed");
    if (typeof setSidebarCollapsed === "function") setSidebarCollapsed(next);
  });

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn?.addEventListener("click", () => {
    if (typeof clearLoggedInUser === "function") clearLoggedInUser();
    window.location.href = "login.html";
  });
});
