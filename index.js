// Get the popup elements
// console.log('hello karan')
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

// Attach event listener to the button for manually opening the popup
document.querySelectorAll(".open-popup-trigger").forEach((trigger) => {
  trigger.addEventListener("click", showPopup);
});

window.addEventListener('DOMContentLoaded', () => {
  const staticForm = document.querySelector('#newForm');
  if (staticForm) {
    attachSubmitListener(staticForm);
  }
});





setInterval(() => {
  const button = document.querySelector(".open-popup-trigger");
  if (button) {
    showPopup({ currentTarget: button }); 
  }
}, 7000);

setInterval(()=>{
  console.log('console ho gaya')
},2000)


function attachSubmitListener(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value;
    console.log(`this is my name ${name}`);
    const number = form.querySelector('#number').value;

    // Send data to backend
    fetch('https://dlf-privana-backend.onrender.com/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, number }),
    })
      .then((response) => {
        console.log('Response:', response); // Log the response object
        if (!response.ok) throw new Error('Failed to send email');
        return response.text();
      })
      .then((data) => {
        console.log('Success:', data);
        alert('Form submitted and email sent successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to send email. Please try again.');
      });
  });
}


// Attach submit listener in your popup logic
function showPopup(event) {
  const trigger = event.currentTarget;
  const contentId = trigger.getAttribute("data-content");

  if (contentId === "newFormContent") {
    const staticForm = document.querySelector(".new-form.static-form").cloneNode(true);
    staticForm.classList.remove("static-form");
    popupContent.innerHTML = "";
    popupContent.appendChild(staticForm);

    // Attach submit listener
    const popupForm = popupContent.querySelector("form");
    if (popupForm) {
      attachSubmitListener(popupForm);
    }

    popupOverlay.style.display = "flex";
  }
}
