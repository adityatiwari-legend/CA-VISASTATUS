/**
 * Status Verification Engine
 * Handles status lookups, validation, Canada.ca error summaries, vertical timeline rendering, and details tables.
 */

document.addEventListener("DOMContentLoaded", () => {
  initStatusPage();
});

function initStatusPage() {
  const form = document.getElementById("statusLookupForm");
  const clearBtn = document.getElementById("clearFormBtn");
  const checkAnotherBtn = document.getElementById("checkAnotherBtn");

  // Read URL query parameter if present: e.g. status.html?app=DEMO-2026-001
  const urlParams = new URLSearchParams(window.location.search);
  const appParam = urlParams.get("app");

  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", resetLookupForm);
  }

  if (checkAnotherBtn) {
    checkAnotherBtn.addEventListener("click", () => {
      resetLookupForm();
      const formSection = document.getElementById("lookupFormSection");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
        const appInput = document.getElementById("applicationNumber");
        if (appInput) appInput.focus();
      }
    });
  }

  // Auto-lookup if ?app= was provided in query string
  if (appParam) {
    const appInput = document.getElementById("applicationNumber");
    if (appInput) {
      appInput.value = appParam.trim();
    }
    const record = getApplicationByNumber(appParam.trim());
    if (record) {
      const dobInput = document.getElementById("dateOfBirth");
      const typeSelect = document.getElementById("applicationType");
      if (dobInput) dobInput.value = record.dateOfBirth;
      if (typeSelect) typeSelect.value = record.applicationType;
      renderApplicationResult(record);
    } else {
      showErrorSummary([
        `We could not find demonstration application "<strong>${escapeHtml(appParam)}</strong>". Please ensure the number is in the format DEMO-2026-001 to DEMO-2026-010.`
      ], "applicationNumber");
    }
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const appNumberInput = document.getElementById("applicationNumber");
  const dobInput = document.getElementById("dateOfBirth");
  const appTypeSelect = document.getElementById("applicationType");

  const appNumber = appNumberInput ? appNumberInput.value.trim() : "";
  const dob = dobInput ? dobInput.value.trim() : "";
  const appType = appTypeSelect ? appTypeSelect.value : "";

  // Reset errors first
  clearErrors();

  const errors = [];
  let firstErrorField = null;

  if (!appNumber) {
    errors.push("Enter your demonstration application number (for example: DEMO-2026-001).");
    firstErrorField = firstErrorField || "applicationNumber";
  }

  if (errors.length > 0) {
    showErrorSummary(errors, firstErrorField);
    return;
  }

  // Lookup against dataset
  const lookupResult = getApplicationByFields(appNumber, dob, appType);

  if (!lookupResult || lookupResult.error) {
    if (lookupResult && lookupResult.error === "not_found") {
      showErrorSummary([
        `We could not find application "<strong>${escapeHtml(appNumber)}</strong>".`,
        `Please check the Tracking ID or Passport Number entered.`
      ], "applicationNumber");
    } else if (lookupResult && lookupResult.error === "dob_mismatch") {
      showErrorSummary([
        `The date of birth entered does not match the records for application <strong>${escapeHtml(appNumber)}</strong>.`,
        `Please verify your registered date of birth.`
      ], "dateOfBirth");
    } else if (lookupResult && lookupResult.error === "type_mismatch") {
      showErrorSummary([
        `The selected application type does not match the file on record for <strong>${escapeHtml(appNumber)}</strong>.`,
        `Select the correct type or choose "All application types".`
      ], "applicationType");
    } else {
      showErrorSummary([
        "An unexpected validation error occurred. Please verify your information."
      ], "applicationNumber");
    }
    return;
  }

  // Success: render result
  renderApplicationResult(lookupResult.application);
}

function clearErrors() {
  const errorSummary = document.getElementById("errorSummary");
  if (errorSummary) {
    errorSummary.classList.remove("visible");
    errorSummary.innerHTML = "";
  }

  const errorGroups = document.querySelectorAll(".gov-form-group.has-error");
  errorGroups.forEach(group => group.classList.remove("has-error"));
}

function showErrorSummary(errors, fieldIdToHighlight) {
  const errorSummary = document.getElementById("errorSummary");
  if (!errorSummary) return;

  const listItems = errors.map(err => `<li>${err}</li>`).join("");

  errorSummary.innerHTML = `
    <h2 class="gov-error-summary-title" id="errorSummaryHeading">There is a problem</h2>
    <ul class="gov-error-summary-list">
      ${listItems}
    </ul>
  `;

  errorSummary.classList.add("visible");
  errorSummary.setAttribute("tabindex", "-1");
  errorSummary.focus();

  if (fieldIdToHighlight) {
    const inputElement = document.getElementById(fieldIdToHighlight);
    if (inputElement) {
      const group = inputElement.closest(".gov-form-group");
      if (group) group.classList.add("has-error");
    }
  }

  // Hide any previous result when an error occurs
  const resultContainer = document.getElementById("statusResultSection");
  if (resultContainer) {
    resultContainer.style.display = "none";
  }
}

function renderApplicationResult(app) {
  clearErrors();

  const resultContainer = document.getElementById("statusResultSection");
  if (!resultContainer) return;

  // Update Breadcrumbs
  const breadcrumbLast = document.getElementById("breadcrumbActive");
  if (breadcrumbLast) {
    breadcrumbLast.innerHTML = `
      <a href="status.html">Application Status</a>
      <span class="gov-breadcrumbs-separator">&gt;</span>
      <span>Application Details (${escapeHtml(app.applicationNumber)})</span>
    `;
  }

  // 1. Summary Card
  const applicantSummaryContainer = document.getElementById("applicantSummaryContainer");
  if (applicantSummaryContainer) {
    applicantSummaryContainer.innerHTML = `
      <div class="gov-summary-card">
        <span class="gov-badge gov-badge-demo">DEMONSTRATION RECORD</span>
        <div class="gov-summary-grid">
          <div>
            <span class="gov-summary-label">Applicant Name</span>
            <div class="gov-summary-value">${escapeHtml(app.applicantName)}</div>
          </div>
          <div>
            <span class="gov-summary-label">Application Type</span>
            <div class="gov-summary-value">${escapeHtml(app.applicationType)}</div>
          </div>
          <div>
            <span class="gov-summary-label">Application Number</span>
            <div class="gov-summary-value">${escapeHtml(app.applicationNumber)}</div>
          </div>
          <div>
            <span class="gov-summary-label">Submission Date</span>
            <div class="gov-summary-value">${escapeHtml(app.submissionDate)}</div>
          </div>
          <div>
            <span class="gov-summary-label">Current Status</span>
            <div class="gov-summary-value">
              <span class="gov-badge gov-badge-status ${app.statusClass}">
                ${escapeHtml(app.status)}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Status Alert Box
  const statusAlertContainer = document.getElementById("statusAlertContainer");
  if (statusAlertContainer) {
    let alertClass = "gov-alert-info";
    if (app.statusBadgeType === "success") alertClass = "gov-alert-success";
    if (app.statusBadgeType === "warning") alertClass = "gov-alert-warning";
    if (app.statusBadgeType === "danger") alertClass = "gov-alert-danger";

    statusAlertContainer.innerHTML = `
      <div class="gov-alert ${alertClass}">
        <h3 class="gov-alert-title">${escapeHtml(app.alertTitle)}</h3>
        <p>${escapeHtml(app.alertMessage)}</p>
      </div>
    `;
  }

  // 3. Vertical Timeline
  const timelineContainer = document.getElementById("statusTimelineContainer");
  if (timelineContainer && app.timeline) {
    const timelineItemsHtml = app.timeline.map(item => {
      let icon = "";
      if (item.status === "completed") {
        icon = `
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        `;
      }
      return `
        <div class="gov-timeline-item ${item.status}">
          <div class="gov-timeline-marker" aria-hidden="true">${icon}</div>
          <div class="gov-timeline-content">
            <h4 class="gov-timeline-title">${escapeHtml(item.title)}</h4>
            <div class="gov-timeline-date">${escapeHtml(item.date)}</div>
            <p class="gov-timeline-desc">${escapeHtml(item.description)}</p>
          </div>
        </div>
      `;
    }).join("");

    timelineContainer.innerHTML = `
      <h2>Application progress timeline</h2>
      <div class="gov-timeline" role="region" aria-label="Application stage timeline">
        ${timelineItemsHtml}
      </div>
    `;
  }

  // 4. Detailed Information Table
  const tableContainer = document.getElementById("statusTableContainer");
  if (tableContainer) {
    tableContainer.innerHTML = `
      <h2>Application details</h2>
      <div class="gov-table-container">
        <table class="gov-table gov-table-key-value">
          <caption class="sr-only">Demonstration Application Detailed Information</caption>
          <tbody>
            <tr>
              <th scope="row">Application type</th>
              <td>${escapeHtml(app.applicationType)} (${escapeHtml(app.categoryCode || "Standard")})</td>
            </tr>
            <tr>
              <th scope="row">Application number</th>
              <td><strong>${escapeHtml(app.applicationNumber)}</strong></td>
            </tr>
            <tr>
              <th scope="row">Applicant full name</th>
              <td>${escapeHtml(app.applicantName)}</td>
            </tr>
            <tr>
              <th scope="row">Date of birth on record</th>
              <td>${escapeHtml(app.displayDob)}</td>
            </tr>
            <tr>
              <th scope="row">Submission date</th>
              <td>${escapeHtml(app.submissionDate)}</td>
            </tr>
            <tr>
              <th scope="row">Last updated</th>
              <td>${escapeHtml(app.lastUpdated)}</td>
            </tr>
            <tr>
              <th scope="row">Current stage</th>
              <td><strong>${escapeHtml(app.currentStage)}</strong></td>
            </tr>
            <tr>
              <th scope="row">Processing office</th>
              <td>${escapeHtml(app.office || "Demonstration Processing Centre")}</td>
            </tr>
            <tr>
              <th scope="row">Biometrics status</th>
              <td>${escapeHtml(app.biometricsStatus || "Not applicable")}</td>
            </tr>
            <tr>
              <th scope="row">Medical examination</th>
              <td>${escapeHtml(app.medicalExamStatus || "Not applicable")}</td>
            </tr>
            <tr>
              <th scope="row">Background check</th>
              <td>${escapeHtml(app.backgroundCheckStatus || "In progress")}</td>
            </tr>
            <tr>
              <th scope="row">Estimated processing</th>
              <td>${escapeHtml(app.estimatedProcessingDays || "Standard demonstration queue")}</td>
            </tr>
            <tr>
              <th scope="row">Current status</th>
              <td><span class="gov-badge ${app.statusClass}">${escapeHtml(app.status)}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // 5. Status Explanation & Next Steps
  const explanationContainer = document.getElementById("statusExplanationContainer");
  if (explanationContainer) {
    explanationContainer.innerHTML = `
      <h2>What this status means</h2>
      <p>${escapeHtml(app.statusExplanation)}</p>
      
      <div class="gov-alert gov-alert-warning" style="margin-top: 16px;">
        <h3 class="gov-alert-title">Required action</h3>
        <p>${escapeHtml(app.actionRequired)}</p>
      </div>

      <div class="gov-alert gov-alert-info" style="margin-top: 16px;">
        <h3 class="gov-alert-title">Important notice</h3>
        <p>This information is fictional and is included only to demonstrate the interface of this demonstration portal. This portal does not connect to any official government database. For real visa and immigration updates, visit the official Government of Canada website at <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer">canada.ca/immigration</a>.</p>
      </div>
    `;
  }

  // Reveal result section and scroll into view smoothly
  resultContainer.style.display = "block";
  resultContainer.scrollIntoView({ behavior: "smooth" });
}

function resetLookupForm() {
  const form = document.getElementById("statusLookupForm");
  if (form) form.reset();
  clearErrors();

  const resultContainer = document.getElementById("statusResultSection");
  if (resultContainer) resultContainer.style.display = "none";

  const breadcrumbLast = document.getElementById("breadcrumbActive");
  if (breadcrumbLast) {
    breadcrumbLast.innerHTML = `<span>Application Status</span>`;
  }

  // Clear query param without full reload
  if (window.history.pushState) {
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState({ path: cleanUrl }, "", cleanUrl);
  }
}
