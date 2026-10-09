const contactForm = document.querySelector("#contact-form");
const projectSearch = document.querySelector("#project-search");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const gallery = document.querySelector("#photo-gallery");

// Toggle project explanations and keep the button state available to assistive technology.
document.querySelectorAll(".details-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const details = document.getElementById(button.getAttribute("aria-controls"));
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.textContent = isExpanded ? "Show details" : "Hide details";
    details.hidden = isExpanded;
  });
});

// Filter the skills cards as the visitor types and explain when there are no matches.
function filterProjects() {
  const query = projectSearch.value.trim().toLocaleLowerCase();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const matches = card.textContent.toLocaleLowerCase().includes(query)
      || card.dataset.search.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  document.querySelector("#no-projects").hidden = visibleCount > 0;
  document.querySelector("#search-status").textContent = query
    ? `${visibleCount} of ${projectCards.length} projects shown.`
    : `${projectCards.length} projects shown.`;
}

projectSearch.addEventListener("input", filterProjects);
document.querySelector("#clear-search").addEventListener("click", () => {
  projectSearch.value = "";
  filterProjects();
  projectSearch.focus();
});
filterProjects();

// Turn the photo collection into an accessible viewer while retaining its captions in the HTML.
const galleryFigures = Array.from(gallery.querySelectorAll("figure"));
let currentPhoto = 0;

function showPhoto(index) {
  currentPhoto = (index + galleryFigures.length) % galleryFigures.length;
  galleryFigures.forEach((figure, figureIndex) => {
    figure.hidden = figureIndex !== currentPhoto;
  });
  document.querySelector("#gallery-status").textContent =
    `Photo ${currentPhoto + 1} of ${galleryFigures.length}: ${galleryFigures[currentPhoto].querySelector("figcaption").textContent}`;
}

gallery.classList.add("is-viewer");
showPhoto(currentPhoto);
document.querySelector("#previous-photo").addEventListener("click", () => {
  showPhoto(currentPhoto - 1);
});
document.querySelector("#next-photo").addEventListener("click", () => {
  showPhoto(currentPhoto + 1);
});

// Validate the local-only contact form, then safely preview entered text on the page.
const validationRules = [
  { field: document.querySelector("#name"), error: document.querySelector("#name-error"), label: "Name", valid: (value) => value.length > 0 },
  { field: document.querySelector("#email"), error: document.querySelector("#email-error"), label: "Email", valid: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
  { field: document.querySelector("#message"), error: document.querySelector("#message-error"), label: "Message", valid: (value) => value.length > 0 },
];

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let firstInvalidField = null;

  validationRules.forEach(({ field, error, label, valid }) => {
    const value = field.value.trim();
    const isValid = valid(value);
    error.textContent = isValid
      ? ""
      : label === "Email"
        ? "Enter a valid email address."
        : `${label} cannot be blank.`;
    field.setAttribute("aria-invalid", String(!isValid));
    if (!isValid && firstInvalidField === null) firstInvalidField = field;
  });

  const formStatus = document.querySelector("#form-status");
  const preview = document.querySelector("#form-preview");
  if (firstInvalidField) {
    preview.hidden = true;
    formStatus.textContent = "Please correct the highlighted fields.";
    firstInvalidField.focus();
    return;
  }

  document.querySelector("#preview-name").textContent = document.querySelector("#name").value.trim();
  document.querySelector("#preview-email").textContent = document.querySelector("#email").value.trim();
  document.querySelector("#preview-topic").textContent = document.querySelector("#topic").value;
  document.querySelector("#preview-message").textContent = document.querySelector("#message").value.trim();
  preview.hidden = false;
  formStatus.textContent = "Your data was validated successfully in this browser.";
});
