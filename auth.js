"use strict";

// Simple localStorage-based auth utilities for SmartGulak demo
(function initSmartGulakAuth() {
  const STORAGE_KEY = "sg_user";
  const SIDEBAR_KEY = "sg_sidebar_collapsed";

  function saveLoggedInUser(user) {
    if (!user || typeof user !== "object") return;
    const payload = {
      id: user.id || cryptoRandomId(),
      username: (user.username || "guest").toString().trim(),
      name: (user.name || "").toString().trim(),
      email: (user.email || "").toString().trim(),
      createdAt: Date.now()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      // ignore
    }
  }

  function getLoggedInUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function clearLoggedInUser() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  }

  function requireAuth(redirectTo = "login.html") {
    if (!getLoggedInUser()) {
      window.location.href = redirectTo;
    }
  }

  function cryptoRandomId() {
    try {
      const arr = new Uint32Array(2);
      crypto.getRandomValues(arr);
      return Array.from(arr).map(n => n.toString(16)).join("");
    } catch (_) {
      return Math.random().toString(16).slice(2) + Date.now().toString(16);
    }
  }

  function setSidebarCollapsed(collapsed) {
    try { localStorage.setItem(SIDEBAR_KEY, collapsed ? "1" : "0"); } catch (_) {}
  }

  function getSidebarCollapsed() {
    try { return localStorage.getItem(SIDEBAR_KEY) === "1"; } catch (_) { return false; }
  }

  // expose to window
  window.saveLoggedInUser = saveLoggedInUser;
  window.getLoggedInUser = getLoggedInUser;
  window.clearLoggedInUser = clearLoggedInUser;
  window.requireAuth = requireAuth;
  window.setSidebarCollapsed = setSidebarCollapsed;
  window.getSidebarCollapsed = getSidebarCollapsed;
})();
