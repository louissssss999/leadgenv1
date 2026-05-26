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
  currentDesignPlatform: document.getElementById("currentDesignPlatform"),
  otherDesignPlatform: document.getElementById("otherDesignPlatform"),
  name: document.getElementById("name"),
  lastName: document.getElementById("lastName"),
  companyName: document.getElementById("companyName"),
  email: document.getElementById("email"),
  country: document.getElementById("country"),
  industry: document.getElementById("industry"),
  jobTitle: document.getElementById("jobTitle")
};

const otherDesignPlatformField = document.getElementById("otherDesignPlatformField");

const sliderNumberFields = {
  designers: document.getElementById("designersNumber"),
  cncMachines: document.getElementById("cncMachinesNumber"),
  workStations: document.getElementById("workStationsNumber")
};

function toggleOtherDesignPlatformField() {
  const useOther = fields.currentDesignPlatform.value === "Other";

  otherDesignPlatformField.hidden = !useOther;
  fields.otherDesignPlatform.required = useOther;

  if (!useOther) {
    fields.otherDesignPlatform.value = "";
    showError("otherDesignPlatform", "");
  }
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

["designers", "cncMachines", "workStations"].forEach((key) => {
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

fields.currentDesignPlatform.addEventListener("change", () => {
  toggleOtherDesignPlatformField();
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
    const validator = key === "country" || key === "industry" ? validateRequiredChoice : validateText;
    const message = validator(fields[key], label);
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
    paperPrintsPerProject: Number(fields.paperPrintsPerProject.value),
    currentDesignPlatform:
      fields.currentDesignPlatform.value === "Other"
        ? fields.otherDesignPlatform.value.trim()
        : fields.currentDesignPlatform.value
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
  toggleOtherDesignPlatformField();
  syncSliderValues();
  clearErrors(businessForm);
  clearErrors(contactForm);
  showSection(stepOne);
});
