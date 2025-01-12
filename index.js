// Get the popup elements
console.log('hello karan')
const popupOverlay = document.getElementById("popupOverlay");
const closePopupBtn = document.getElementById("closePopupBtn");
const popupContent = document.getElementById("popupContent");

// Function to show the popup
function showPopup(event) {
  const trigger = event.currentTarget;
  const contentId = trigger.getAttribute("data-content");

  if (contentId === "newFormContent") {
    // Clone the static form and insert it into the popup
    const staticForm = document.querySelector(".new-form.static-form").cloneNode(true);
    staticForm.classList.remove("static-form");
    popupContent.innerHTML = "";
    popupContent.appendChild(staticForm);

    // Attach real-time event listener to form fields inside the popup
    const popupForm = popupContent.querySelector("form");
    if (popupForm) {
      attachInputListeners(popupForm);
    }

    popupOverlay.style.display = "flex";
  }
}

// Function to hide the popup
function hidePopup() {
  popupOverlay.style.display = "none";
}

// Close popup on clicking the close button
closePopupBtn.addEventListener("click", hidePopup);

// Close popup when clicking outside the popup content
popupOverlay.addEventListener("click", (event) => {
  if (event.target === popupOverlay) hidePopup();
});

// Function to handle real-time input capture and logging
function attachInputListeners(form) {
  // Get all input fields in the form
  const inputs = form.querySelectorAll("input");

  inputs.forEach(input => {
    input.addEventListener("input", (e) => {
      // Log the value of the input field in real-time
      console.log("Real-time Input Value for", e.target.id, ":", e.target.value);
    });
  });
}

// Attach event listener to the button for manually opening the popup
document.querySelectorAll(".open-popup-trigger").forEach((trigger) => {
  trigger.addEventListener("click", showPopup);
});

// Automatically show the popup every 10 seconds
setInterval(() => {
  const button = document.querySelector(".open-popup-trigger");
  if (button) {
    showPopup({ currentTarget: button }); // Trigger popup programmatically
  }
}, 10000); // This will show the popup every 10 seconds
