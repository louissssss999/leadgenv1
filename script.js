const businessForm = document.getElementById("business-form");
const contactForm = document.getElementById("contact-form");

const stepOne = document.getElementById("step-1");
const stepTwo = document.getElementById("step-2");
const resultsSection = document.getElementById("results");
const timelineSteps = Array.from(document.querySelectorAll(".timeline-step"));
const timelineLines = Array.from(document.querySelectorAll(".timeline-line"));

const backButton = document.getElementById("back-button");
const restartButton = document.getElementById("restart-button");
const confirmationModal = document.getElementById("confirmationModal");
const confirmationBackdrop = document.getElementById("confirmationBackdrop");
const confirmationMessage = document.getElementById("confirmationMessage");
const confirmationCloseButton = document.getElementById("confirmationCloseButton");

const fields = {
  designers: document.getElementById("designers"),
  cncMachines: document.getElementById("cncMachines"),
  workStations: document.getElementById("workStations"),
  projectsPerYear: document.getElementById("projectsPerYear"),
  paperPrintsPerProject: document.getElementById("paperPrintsPerProject"),
  currentDesignPlatform: document.getElementById("currentDesignPlatform"),
  otherDesignPlatform: document.getElementById("otherDesignPlatform"),
  name: document.getElementById("name"),
  lastName: document.getElementById("lastName"),
  companyName: document.getElementById("companyName"),
  email: document.getElementById("email"),
  country: document.getElementById("country"),
  industry: document.getElementById("industry"),
  otherIndustry: document.getElementById("otherIndustry"),
  nonSoftwareUniversityDetail: document.getElementById("nonSoftwareUniversityDetail"),
  jobTitle: document.getElementById("jobTitle")
};

const otherDesignPlatformField = document.getElementById("otherDesignPlatformField");
const nonSoftwareUniversityField = document.getElementById("nonSoftwareUniversityField");
const otherIndustryField = document.getElementById("otherIndustryField");

const sliderNumberFields = {
  designers: document.getElementById("designersNumber"),
  cncMachines: document.getElementById("cncMachinesNumber"),
  workStations: document.getElementById("workStationsNumber"),
  projectsPerYear: document.getElementById("projectsPerYearNumber"),
  paperPrintsPerProject: document.getElementById("paperPrintsPerProjectNumber")
};

const SUPABASE_URL = window.SUPABASE_URL || "https://umyquexisswctcsucghf.supabase.co";
const SUPABASE_ANON_KEY =
  window.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteXF1ZXhpc3N3Y3Rjc3VjZ2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMDIwMjEsImV4cCI6MjA5NTU3ODAyMX0.tYn2SsnKLwmWdoVssQKvNqFrhRpKKdAlZl6Je08KU_o";
const SUPABASE_TABLE = "lead_submissions";

const isSupabaseConfigured =
  typeof window.supabase !== "undefined" &&
  !SUPABASE_URL.includes("YOUR-PROJECT") &&
  !SUPABASE_ANON_KEY.includes("YOUR-ANON-KEY");

const supabaseClient = isSupabaseConfigured
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

function requireFieldValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function getMissingPayloadFields(payload) {
  return Object.entries(payload)
    .filter(([, value]) => value === "" || value === null || value === undefined)
    .map(([key]) => key);
}

async function saveLeadToSupabase(payload) {
  if (!supabaseClient) {
    return {
      ok: false,
      message:
        "Supabase is not configured yet. Add SUPABASE_URL and SUPABASE_ANON_KEY in script.js."
    };
  }

  const { error } = await supabaseClient.from(SUPABASE_TABLE).insert([payload]);

  if (error) {
    return {
      ok: false,
      message: `Supabase error: ${error.message}`
    };
  }

  return { ok: true };
}

function toggleOtherDesignPlatformField() {
  const useOther = fields.currentDesignPlatform.value === "Other";

  otherDesignPlatformField.hidden = !useOther;
  fields.otherDesignPlatform.required = useOther;

  if (!useOther) {
    fields.otherDesignPlatform.value = "";
    showError("otherDesignPlatform", "");
  }

  markRequiredFieldLabels();
}

function toggleNonSoftwareUniversityField() {
  const selectedIndustry = fields.industry.value;
  const shouldShow =
    selectedIndustry !== "" &&
    selectedIndustry !== "Software" &&
    selectedIndustry !== "University";

  nonSoftwareUniversityField.hidden = !shouldShow;
  fields.nonSoftwareUniversityDetail.required = shouldShow;

  if (!shouldShow) {
    fields.nonSoftwareUniversityDetail.value = "";
    showError("nonSoftwareUniversityDetail", "");
  }

  markRequiredFieldLabels();
}

function toggleOtherIndustryField() {
  const useOtherIndustry = fields.industry.value === "Other";

  otherIndustryField.hidden = !useOtherIndustry;
  fields.otherIndustry.required = useOtherIndustry;

  if (!useOtherIndustry) {
    fields.otherIndustry.value = "";
    showError("otherIndustry", "");
  }

  markRequiredFieldLabels();
}

function markRequiredFieldLabels() {
  document.querySelectorAll(".field").forEach((fieldElement) => {
    const label = fieldElement.querySelector(":scope > span");
    if (!label) {
      return;
    }

    const hasRequiredControl = Boolean(
      fieldElement.querySelector("input[required], select[required], textarea[required]")
    );

    label.classList.toggle("is-required", hasRequiredControl);
  });
}

const countriesWithCodes = [
  ["Afghanistan", "AF"],
  ["Albania", "AL"],
  ["Algeria", "DZ"],
  ["Andorra", "AD"],
  ["Angola", "AO"],
  ["Antigua & Deps", "AG"],
  ["Argentina", "AR"],
  ["Armenia", "AM"],
  ["Australia", "AU"],
  ["Austria", "AT"],
  ["Azerbaijan", "AZ"],
  ["Bahamas", "BS"],
  ["Bahrain", "BH"],
  ["Bangladesh", "BD"],
  ["Barbados", "BB"],
  ["Belarus", "BY"],
  ["Belgium", "BE"],
  ["Belize", "BZ"],
  ["Benin", "BJ"],
  ["Bhutan", "BT"],
  ["Bolivia", "BO"],
  ["Bosnia Herzegovina", "BA"],
  ["Botswana", "BW"],
  ["Brazil", "BR"],
  ["Brunei", "BN"],
  ["Bulgaria", "BG"],
  ["Burkina", "BF"],
  ["Burundi", "BI"],
  ["Cambodia", "KH"],
  ["Cameroon", "CM"],
  ["Canada", "CA"],
  ["Cape Verde", "CV"],
  ["Central African Rep", "CF"],
  ["Chad", "TD"],
  ["Chile", "CL"],
  ["China", "CN"],
  ["Colombia", "CO"],
  ["Comoros", "KM"],
  ["Congo", "CG"],
  ["Congo {Democratic Rep}", "CD"],
  ["Costa Rica", "CR"],
  ["Croatia", "HR"],
  ["Cuba", "CU"],
  ["Cyprus", "CY"],
  ["Czech Republic", "CZ"],
  ["Denmark", "DK"],
  ["Djibouti", "DJ"],
  ["Dominica", "DM"],
  ["Dominican Republic", "DO"],
  ["East Timor", "TL"],
  ["Ecuador", "EC"],
  ["Egypt", "EG"],
  ["El Salvador", "SV"],
  ["Equatorial Guinea", "GQ"],
  ["Eritrea", "ER"],
  ["Estonia", "EE"],
  ["Ethiopia", "ET"],
  ["Fiji", "FJ"],
  ["Finland", "FI"],
  ["France", "FR"],
  ["Gabon", "GA"],
  ["Gambia", "GM"],
  ["Georgia", "GE"],
  ["Germany", "DE"],
  ["Ghana", "GH"],
  ["Greece", "GR"],
  ["Grenada", "GD"],
  ["Guatemala", "GT"],
  ["Guinea", "GN"],
  ["Guinea-Bissau", "GW"],
  ["Guyana", "GY"],
  ["Haiti", "HT"],
  ["Honduras", "HN"],
  ["Hungary", "HU"],
  ["Iceland", "IS"],
  ["India", "IN"],
  ["Indonesia", "ID"],
  ["Iran", "IR"],
  ["Iraq", "IQ"],
  ["Ireland {Republic}", "IE"],
  ["Israel", "IL"],
  ["Italy", "IT"],
  ["Ivory Coast", "CI"],
  ["Jamaica", "JM"],
  ["Japan", "JP"],
  ["Jordan", "JO"],
  ["Kazakhstan", "KZ"],
  ["Kenya", "KE"],
  ["Kiribati", "KI"],
  ["Korea North", "KP"],
  ["Korea South", "KR"],
  ["Kosovo", "XK"],
  ["Kuwait", "KW"],
  ["Kyrgyzstan", "KG"],
  ["Laos", "LA"],
  ["Latvia", "LV"],
  ["Lebanon", "LB"],
  ["Lesotho", "LS"],
  ["Liberia", "LR"],
  ["Libya", "LY"],
  ["Liechtenstein", "LI"],
  ["Lithuania", "LT"],
  ["Luxembourg", "LU"],
  ["Macedonia", "MK"],
  ["Madagascar", "MG"],
  ["Malawi", "MW"],
  ["Malaysia", "MY"],
  ["Maldives", "MV"],
  ["Mali", "ML"],
  ["Malta", "MT"],
  ["Marshall Islands", "MH"],
  ["Mauritania", "MR"],
  ["Mauritius", "MU"],
  ["Mexico", "MX"],
  ["Micronesia", "FM"],
  ["Moldova", "MD"],
  ["Monaco", "MC"],
  ["Mongolia", "MN"],
  ["Montenegro", "ME"],
  ["Morocco", "MA"],
  ["Mozambique", "MZ"],
  ["Myanmar, {Burma}", "MM"],
  ["Namibia", "NA"],
  ["Nauru", "NR"],
  ["Nepal", "NP"],
  ["Netherlands", "NL"],
  ["New Zealand", "NZ"],
  ["Nicaragua", "NI"],
  ["Niger", "NE"],
  ["Nigeria", "NG"],
  ["Norway", "NO"],
  ["Oman", "OM"],
  ["Pakistan", "PK"],
  ["Palau", "PW"],
  ["Panama", "PA"],
  ["Papua New Guinea", "PG"],
  ["Paraguay", "PY"],
  ["Peru", "PE"],
  ["Philippines", "PH"],
  ["Poland", "PL"],
  ["Portugal", "PT"],
  ["Qatar", "QA"],
  ["Romania", "RO"],
  ["Russian Federation", "RU"],
  ["Rwanda", "RW"],
  ["St Kitts & Nevis", "KN"],
  ["St Lucia", "LC"],
  ["Saint Vincent & the Grenadines", "VC"],
  ["Samoa", "WS"],
  ["San Marino", "SM"],
  ["Sao Tome & Principe", "ST"],
  ["Saudi Arabia", "SA"],
  ["Senegal", "SN"],
  ["Serbia", "RS"],
  ["Seychelles", "SC"],
  ["Sierra Leone", "SL"],
  ["Singapore", "SG"],
  ["Slovakia", "SK"],
  ["Slovenia", "SI"],
  ["Solomon Islands", "SB"],
  ["Somalia", "SO"],
  ["South Africa", "ZA"],
  ["South Sudan", "SS"],
  ["Spain", "ES"],
  ["Sri Lanka", "LK"],
  ["Sudan", "SD"],
  ["Suriname", "SR"],
  ["Swaziland", "SZ"],
  ["Sweden", "SE"],
  ["Switzerland", "CH"],
  ["Syria", "SY"],
  ["Taiwan", "TW"],
  ["Tajikistan", "TJ"],
  ["Tanzania", "TZ"],
  ["Thailand", "TH"],
  ["Togo", "TG"],
  ["Tonga", "TO"],
  ["Trinidad & Tobago", "TT"],
  ["Tunisia", "TN"],
  ["Turkey", "TR"],
  ["Turkmenistan", "TM"],
  ["Tuvalu", "TV"],
  ["Uganda", "UG"],
  ["Ukraine", "UA"],
  ["United Arab Emirates", "AE"],
  ["United Kingdom", "GB"],
  ["United States", "US"],
  ["Uruguay", "UY"],
  ["Uzbekistan", "UZ"],
  ["Vanuatu", "VU"],
  ["Vatican City", "VA"],
  ["Venezuela", "VE"],
  ["Vietnam", "VN"],
  ["Yemen", "YE"],
  ["Zambia", "ZM"],
  ["Zimbabwe", "ZW"]
];

function showSection(section) {
  [stepOne, stepTwo, resultsSection].forEach((item) => {
    item.classList.remove("is-active");
  });

  section.classList.add("is-active");
  updateTimeline(section);
}

function getSectionIndex(section) {
  if (section === stepOne) {
    return 1;
  }

  if (section === stepTwo) {
    return 2;
  }

  return 3;
}

function updateTimeline(activeSection) {
  const activeIndex = getSectionIndex(activeSection);

  timelineSteps.forEach((stepElement) => {
    const stepIndex = Number(stepElement.dataset.step);
    stepElement.classList.remove("is-active", "is-done");

    if (stepIndex < activeIndex) {
      stepElement.classList.add("is-done");
    } else if (stepIndex === activeIndex) {
      stepElement.classList.add("is-active");
    }
  });

  timelineLines.forEach((lineElement, lineIdx) => {
    lineElement.classList.toggle("is-done", lineIdx < activeIndex - 1);
  });
}

function openConfirmationModal() {
  const firstName = fields.name.value.trim() || "there";
  confirmationMessage.textContent = `Thank you ${firstName}! The hsbcad team will contact you shortly.`;
  confirmationModal.hidden = false;
}

function closeConfirmationModal() {
  confirmationModal.hidden = true;
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

function validateRequiredChoice(field, label) {
  if (!field.value || field.value.trim() === "") {
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

function toFlagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2 || typeof String.fromCodePoint !== "function") {
    return "";
  }

  try {
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join("");
  } catch {
    return "";
  }
}

function populateCountryDropdown() {
  // Country options are static in index.html.
}

function ensureCountryDropdownPopulated() {
  // No-op: countries are static in index.html.
}

function syncSliderValues() {
  Object.keys(sliderNumberFields).forEach((key) => {
    if (fields[key] && sliderNumberFields[key]) {
      sliderNumberFields[key].value = fields[key].value;
      updateSliderVisual(fields[key]);
    }
  });
}

function updateSliderVisual(rangeInput) {
  const min = Number(rangeInput.min || 0);
  const max = Number(rangeInput.max || 100);
  const value = Number(rangeInput.value || min);
  const ratio = max > min ? ((value - min) / (max - min)) * 100 : 0;
  rangeInput.style.setProperty("--range-progress", `${ratio}%`);
}

["designers", "cncMachines", "workStations", "projectsPerYear", "paperPrintsPerProject"].forEach((key) => {
  fields[key].addEventListener("input", () => {
    sliderNumberFields[key].value = fields[key].value;
    updateSliderVisual(fields[key]);
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
    updateSliderVisual(fields[key]);
  });

  sliderNumberFields[key].addEventListener("blur", () => {
    const min = Number(fields[key].min);
    const max = Number(fields[key].max);
    const parsed = Number(sliderNumberFields[key].value);
    const clamped = Number.isFinite(parsed)
      ? Math.min(max, Math.max(min, Math.round(parsed)))
      : Number(fields[key].value);
    fields[key].value = String(clamped);
    sliderNumberFields[key].value = String(clamped);
    updateSliderVisual(fields[key]);
  });
});

function calculateResults(input) {
  const teamScale = input.designers * 1.3 + input.cncMachines * 1.8 + input.workStations * 0.7;
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

syncSliderValues();
toggleOtherDesignPlatformField();
toggleNonSoftwareUniversityField();
toggleOtherIndustryField();
markRequiredFieldLabels();
const initiallyActiveSection = document.querySelector(".card.is-active");
updateTimeline(initiallyActiveSection || stepOne);

fields.currentDesignPlatform.addEventListener("change", () => {
  toggleOtherDesignPlatformField();
});

fields.industry.addEventListener("change", () => {
  toggleNonSoftwareUniversityField();
  toggleOtherIndustryField();
});

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

  const platformMessage = validateRequiredChoice(fields.currentDesignPlatform, "Current design platform");
  if (platformMessage) {
    showError("currentDesignPlatform", platformMessage);
    hasError = true;
  }

  if (fields.currentDesignPlatform.value === "Other") {
    const otherMessage = validateText(fields.otherDesignPlatform, "Other");
    if (otherMessage) {
      showError("otherDesignPlatform", otherMessage);
      hasError = true;
    }
  }

  if (!hasError) {
    showSection(stepTwo);
  }
});

backButton.addEventListener("click", () => {
  showSection(stepOne);
});

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors(contactForm);

  const requiredTextFields = [
    ["name", "Name"],
    ["lastName", "Last name"],
    ["companyName", "Company name"],
    ["country", "Country"],
    ["industry", "Industry"],
    ["jobTitle", "Job function"]
  ];

  let hasError = false;

  requiredTextFields.forEach(([key, label]) => {
    const validator =
      key === "country" || key === "industry" || key === "jobTitle"
        ? validateRequiredChoice
        : validateText;
    const message = validator(fields[key], label);
    if (message) {
      showError(key, message);
      hasError = true;
    }
  });

  if (fields.nonSoftwareUniversityDetail.required) {
    const detailMessage = validateRequiredChoice(
      fields.nonSoftwareUniversityDetail,
      "Organization type"
    );
    if (detailMessage) {
      showError("nonSoftwareUniversityDetail", detailMessage);
      hasError = true;
    }
  }

  if (fields.otherIndustry.required) {
    const otherIndustryMessage = validateText(fields.otherIndustry, "Other industry");
    if (otherIndustryMessage) {
      showError("otherIndustry", otherIndustryMessage);
      hasError = true;
    }
  }

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
    paperPrintsPerProject: Number(fields.paperPrintsPerProject.value),
    currentDesignPlatform:
      fields.currentDesignPlatform.value === "Other"
        ? fields.otherDesignPlatform.value.trim()
        : fields.currentDesignPlatform.value
  };

  const result = calculateResults(businessData);

  const countryEntry = countriesWithCodes.find(([countryName]) => countryName === fields.country.value);
  const countryCode = countryEntry ? countryEntry[1] : "";

  const payload = {
    submitted_at: new Date().toISOString(),
    name: requireFieldValue(fields.name.value),
    last_name: requireFieldValue(fields.lastName.value),
    company_name: requireFieldValue(fields.companyName.value),
    email: requireFieldValue(fields.email.value),
    country: requireFieldValue(fields.country.value),
    country_code: requireFieldValue(countryCode),
    country_flag: requireFieldValue(toFlagEmoji(countryCode)),
    industry: requireFieldValue(fields.industry.value),
    industry_other: requireFieldValue(fields.otherIndustry.required ? fields.otherIndustry.value : "Not applicable"),
    organization_type: requireFieldValue(
      fields.nonSoftwareUniversityDetail.required
        ? fields.nonSoftwareUniversityDetail.value
        : "Not applicable"
    ),
    job_function: requireFieldValue(fields.jobTitle.value),
    designers: Number(fields.designers.value),
    cnc_machines: Number(fields.cncMachines.value),
    work_stations: Number(fields.workStations.value),
    projects_per_year: Number(fields.projectsPerYear.value),
    paper_prints_per_project: Number(fields.paperPrintsPerProject.value),
    current_design_platform: requireFieldValue(businessData.currentDesignPlatform),
    time_saved_percentage: Number(result.timeSavedPercentage),
    additional_projects_per_year: Number(result.moreProjects),
    paper_prints_eliminated: Number(result.printsEliminated),
    efficiency_boost_percentage: Number(result.efficiencyBoost)
  };

  const missingFields = getMissingPayloadFields(payload);
  if (missingFields.length > 0) {
    showError(
      "email",
      `Missing required payload fields: ${missingFields.join(", ")}`
    );
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
  }

  const saveResult = await saveLeadToSupabase(payload);

  if (submitButton) {
    submitButton.disabled = false;
  }

  if (!saveResult.ok) {
    showError("email", saveResult.message);
    return;
  }

  document.getElementById("result-intro").textContent =
    `Thank you ${fields.name.value.trim()} ${fields.lastName.value.trim()}. Here is your estimation for ${fields.companyName.value.trim()}.`;

  document.getElementById("timeSaved").textContent = `${result.timeSavedPercentage}%`;
  document.getElementById("moreProjects").textContent = Number.isInteger(result.moreProjects)
    ? result.moreProjects.toLocaleString()
    : result.moreProjects.toFixed(1);
  document.getElementById("printsEliminated").textContent = result.printsEliminated.toLocaleString();
  document.getElementById("efficiencyBoost").textContent = `${result.efficiencyBoost}%`;

  showSection(resultsSection);
});

restartButton.addEventListener("click", () => {
  openConfirmationModal();
});

confirmationCloseButton.addEventListener("click", () => {
  closeConfirmationModal();
});

confirmationBackdrop.addEventListener("click", () => {
  closeConfirmationModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !confirmationModal.hidden) {
    closeConfirmationModal();
  }
});
