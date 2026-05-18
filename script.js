const businessForm = document.getElementById("business-form");
const contactForm = document.getElementById("contact-form");

const stepOne = document.getElementById("step-1");
const stepTwo = document.getElementById("step-2");
const resultsSection = document.getElementById("results");

const backButton = document.getElementById("back-button");
const restartButton = document.getElementById("restart-button");

const fields = {
  designers: document.getElementById("designers"),
  cncMachines: document.getElementById("cncMachines"),
  workStations: document.getElementById("workStations"),
  projectsPerYear: document.getElementById("projectsPerYear"),
  paperPrintsPerProject: document.getElementById("paperPrintsPerProject"),
  name: document.getElementById("name"),
  lastName: document.getElementById("lastName"),
  companyName: document.getElementById("companyName"),
  email: document.getElementById("email"),
  country: document.getElementById("country"),
  industry: document.getElementById("industry"),
  jobTitle: document.getElementById("jobTitle")
};

const sliderNumberFields = {
  designers: document.getElementById("designersNumber"),
  cncMachines: document.getElementById("cncMachinesNumber"),
  workStations: document.getElementById("workStationsNumber")
};

function syncSliderValues() {
  Object.keys(sliderNumberFields).forEach((key) => {
    if (fields[key] && sliderNumberFields[key]) {
      sliderNumberFields[key].value = fields[key].value;
    }
  });
}

["designers", "cncMachines", "workStations"].forEach((key) => {
  fields[key].addEventListener("input", () => {
    sliderNumberFields[key].value = fields[key].value;
  });

  sliderNumberFields[key].addEventListener("input", () => {
    const min = Number(fields[key].min);
    const max = Number(fields[key].max);
    const parsed = Number(sliderNumberFields[key].value);

    if (!Number.isFinite(parsed)) {
      return;
    }

    const clamped = Math.min(max, Math.max(min, Math.round(parsed)));
    fields[key].value = String(clamped);
  });

  sliderNumberFields[key].addEventListener("blur", () => {
    const min = Number(fields[key].min);
    const max = Number(fields[key].max);
    const parsed = Number(sliderNumberFields[key].value);
    const clamped = Number.isFinite(parsed) ? Math.min(max, Math.max(min, Math.round(parsed))) : Number(fields[key].value);
    fields[key].value = String(clamped);
    sliderNumberFields[key].value = String(clamped);
  });
});

syncSliderValues();

function showSection(section) {
  [stepOne, stepTwo, resultsSection].forEach((item) => {
    item.classList.remove("is-active");
  });

  section.classList.add("is-active");
}

function showError(fieldId, message) {
  const errorElement = document.querySelector(`[data-error-for="${fieldId}"]`);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearErrors(formElement) {
  formElement.querySelectorAll(".error").forEach((el) => {
    el.textContent = "";
  });
}

function validatePositiveInteger(field, label) {
  const rawValue = field.value.trim();
  if (rawValue === "") {
    return `${label} is required.`;
  }

  const parsed = Number(rawValue);
  if (!Number.isInteger(parsed) || parsed < 0) {
    return `${label} must be a positive integer or zero.`;
  }

  return "";
}

function validateText(field, label) {
  if (field.value.trim() === "") {
    return `${label} is required.`;
  }
  return "";
}

function validateEmail(field) {
  const value = field.value.trim();
  if (value === "") {
    return "Email is required.";
  }

  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  return ok ? "" : "Enter a valid email address.";
}

function calculateResults(input) {
  const teamScale = input.designers * 1.3 + input.cncMachines * 1.8 + input.workStations * 0.7;
  const baseLoad = Math.max(input.projectsPerYear, 1);
  const annualPrints = input.projectsPerYear * input.paperPrintsPerProject;

  const timeSavedRaw = 8 + teamScale + input.projectsPerYear * 0.03;
  const timeSavedPercentage = Math.min(68, Math.max(10, Math.round(timeSavedRaw)));

  const moreProjects = input.projectsPerYear * 0.1;

  const printsEliminated = Math.round(
    Math.min(annualPrints, annualPrints * (0.42 + input.designers * 0.008 + input.workStations * 0.002))
  );

  const efficiencyBoost = Math.min(
    82,
    Math.max(12, Math.round(timeSavedPercentage * 0.72 + input.cncMachines * 1.4))
  );

  return {
    timeSavedPercentage,
    moreProjects,
    printsEliminated,
    efficiencyBoost
  };
}

businessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors(businessForm);

  const checks = [
    ["designers", "Number of designers"],
    ["cncMachines", "Number of CNC machines"],
    ["workStations", "Number of work stations"],
    ["projectsPerYear", "Number of projects per year"],
    ["paperPrintsPerProject", "Number of paper prints per project"]
  ];

  let hasError = false;

  checks.forEach(([key, label]) => {
    const message = validatePositiveInteger(fields[key], label);
    if (message) {
      showError(key, message);
      hasError = true;
    }
  });

  if (!hasError) {
    showSection(stepTwo);
  }
});

backButton.addEventListener("click", () => {
  showSection(stepOne);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors(contactForm);

  const requiredTextFields = [
    ["name", "Name"],
    ["lastName", "Last name"],
    ["companyName", "Company name"],
    ["country", "Country"],
    ["industry", "Industry"],
    ["jobTitle", "Job title"]
  ];

  let hasError = false;

  requiredTextFields.forEach(([key, label]) => {
    const message = validateText(fields[key], label);
    if (message) {
      showError(key, message);
      hasError = true;
    }
  });

  const emailMessage = validateEmail(fields.email);
  if (emailMessage) {
    showError("email", emailMessage);
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const businessData = {
    designers: Number(fields.designers.value),
    cncMachines: Number(fields.cncMachines.value),
    workStations: Number(fields.workStations.value),
    projectsPerYear: Number(fields.projectsPerYear.value),
    paperPrintsPerProject: Number(fields.paperPrintsPerProject.value)
  };

  const result = calculateResults(businessData);

  document.getElementById("result-intro").textContent =
    `Thanks ${fields.name.value.trim()} ${fields.lastName.value.trim()} from ${fields.companyName.value.trim()}. Here is your estimated yearly impact.`;

  document.getElementById("timeSaved").textContent = `${result.timeSavedPercentage}%`;
  document.getElementById("moreProjects").textContent = Number.isInteger(result.moreProjects)
    ? result.moreProjects.toLocaleString()
    : result.moreProjects.toFixed(1);
  document.getElementById("printsEliminated").textContent = result.printsEliminated.toLocaleString();
  document.getElementById("efficiencyBoost").textContent = `${result.efficiencyBoost}%`;

  showSection(resultsSection);
});

restartButton.addEventListener("click", () => {
  businessForm.reset();
  contactForm.reset();
  syncSliderValues();
  clearErrors(businessForm);
  clearErrors(contactForm);
  showSection(stepOne);
});
