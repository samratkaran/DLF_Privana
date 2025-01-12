const popupOverlay = document.getElementById('popupOverlay');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupForm = document.getElementById('popupForm');

// Function to show the popup
function showPopup(event) {
    const trigger = event.currentTarget; // The element that triggered the popup
    const title = trigger.getAttribute('data-title');
    const btnText = trigger.getAttribute('data-btn');

    // Update popup content
    document.getElementById('popupTitle').textContent = title || 'Enter Your Details';
    document.getElementById('popupSubmitBtn').textContent = btnText || 'Submit';

    // Show the popup
    popupOverlay.style.display = 'block';
}

// Function to hide the popup
function hidePopup() {
    popupOverlay.style.display = 'none';
}

// Attach event listeners to all triggers
document.querySelectorAll('.open-popup-trigger').forEach(trigger => {
    trigger.addEventListener('click', showPopup);
});

// Close popup on clicking the close button
closePopupBtn.addEventListener('click', hidePopup);

// Close popup when clicking outside the popup content
popupOverlay.addEventListener('click', (event) => {
    if (event.target === popupOverlay) hidePopup();
});

// Handle form submission
popupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Capture form values
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;

    console.log('Form Submitted:', { name, number, email });

    // Simulate sending data to backend
    alert('Form Submitted Successfully!');

    // Close the popup
    hidePopup();

    // Reset the form
    popupForm.reset();
});