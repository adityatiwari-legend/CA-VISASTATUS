/**
 * Main Portal Script
 * Global UI controls: mobile menu, search dispatch, language notice, modal helpers
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSearchForms();
  initLanguageToggle();
  highlightActiveNav();
  initModalListeners();
});

// Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.getElementById("mobileNavToggle");
  const mainNav = document.getElementById("mainNav");

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
    mainNav.classList.toggle("open");
    
    const textNode = toggleBtn.querySelector(".toggle-text");
    if (textNode) {
      textNode.textContent = isExpanded ? "Menu" : "Close Menu";
    }
  });
}

// Search dispatch (redirects to search.html?q=...)
function initSearchForms() {
  const forms = document.querySelectorAll(".gov-search-form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[name='q']");
      if (input && input.value.trim() !== "") {
        const query = encodeURIComponent(input.value.trim());
        window.location.href = `search.html?q=${query}`;
      }
    });
  });
}

// Language toggle banner / alert
function initLanguageToggle() {
  const langToggle = document.getElementById("langToggle");
  if (!langToggle) return;

  langToggle.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Démonstration en français : Ce portail statique est un prototype d'évaluation technique. La version anglaise contient les 10 dossiers fictifs complets.");
  });
}

// Active link highlighting
function highlightActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll(".gov-nav-link, .gov-sidebar-link");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    
    // Check if current page matches link target
    const isHomePage = (currentPath.endsWith("index.html") || currentPath.endsWith("/") || currentPath === "") && (href === "index.html" || href === "./" || href === "/");
    const isMatched = !isHomePage && currentPath.includes(href.split("#")[0].replace("./", ""));

    if (isHomePage || isMatched) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// Demo applications modal handler (can be triggered from any page)
function initModalListeners() {
  const modalOverlay = document.getElementById("demoModal");
  const openButtons = document.querySelectorAll("[data-open-demo-modal]");
  const closeButtons = document.querySelectorAll("[data-close-demo-modal]");

  if (!modalOverlay) return;

  const openModal = () => {
    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    populateDemoModalTable();
  };

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openButtons.forEach(btn => btn.addEventListener("click", openModal));
  closeButtons.forEach(btn => btn.addEventListener("click", closeModal));

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}

// Render the 10 demo records inside the modal table
function populateDemoModalTable() {
  const container = document.getElementById("modalDemoTableBody");
  if (!container || typeof DEMO_APPLICATIONS === "undefined") return;

  if (container.dataset.rendered === "true") return;

  container.innerHTML = DEMO_APPLICATIONS.map(app => `
    <tr>
      <td><strong>${escapeHtml(app.applicationNumber)}</strong></td>
      <td>${escapeHtml(app.applicantName)}</td>
      <td>${escapeHtml(app.applicationType)}</td>
      <td><span class="gov-badge ${app.statusClass}">${escapeHtml(app.status)}</span></td>
      <td><code>${escapeHtml(app.displayDob)}</code></td>
      <td style="text-align: right;">
        <button type="button" class="btn btn-secondary btn-sm select-demo-btn" data-app-num="${escapeHtml(app.applicationNumber)}" data-app-dob="${escapeHtml(app.dateOfBirth)}" data-app-type="${escapeHtml(app.applicationType)}">
          Use Record
        </button>
      </td>
    </tr>
  `).join("");

  container.dataset.rendered = "true";

  // Attach click listeners to "Use Record" buttons
  const selectBtns = container.querySelectorAll(".select-demo-btn");
  selectBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const appNum = btn.dataset.appNum;
      const appDob = btn.dataset.appDob;
      const appType = btn.dataset.appType;
      
      // If we are on status.html, fill the form directly
      const appInput = document.getElementById("applicationNumber");
      const dobInput = document.getElementById("dateOfBirth");
      const typeSelect = document.getElementById("applicationType");

      if (appInput && dobInput) {
        appInput.value = appNum;
        dobInput.value = appDob;
        if (typeSelect) {
          typeSelect.value = appType;
        }
        // Close modal
        const modalOverlay = document.getElementById("demoModal");
        if (modalOverlay) {
          modalOverlay.classList.remove("active");
          modalOverlay.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
        }
        // Auto trigger search or focus button
        const submitBtn = document.getElementById("statusSubmitBtn");
        if (submitBtn) {
          submitBtn.focus();
          submitBtn.click();
        }
      } else {
        // Redirect to status.html with the app param
        window.location.href = `status.html?app=${encodeURIComponent(appNum)}`;
      }
    });
  });
}

// Utility: escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
