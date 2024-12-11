// Update the hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelector('.nav-items');
const body = document.body;

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navItems.classList.toggle('active');
  // Prevent body scroll when menu is open
  body.style.overflow = navItems.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-items a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navItems.classList.remove('active');
    body.style.overflow = 'auto';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navItems.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navItems.classList.remove('active');
    body.style.overflow = 'auto';
  }
});

const toggleButton = document.getElementById("dark-mode-toggle");

// Add 'dark-mode' class to body by default
body.classList.add('dark-mode');

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Attach submit event to the form
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validate fields
  if (!name || !email || !subject || !message) {
    showToast("Please fill out all fields.", "error");
    return;
  }


// Use these variables in your fetch request

  // Data object
  var data = {
    service_id: "service_zyii5jr",
    template_id: "template_x5dq08e",
    user_id:  "IUSH05W2erKoSo9YW",
    template_params: {
      username: name,
      email: email,
      subject: subject,
      message: message,
    }
  };

  // Send email using Fetch API
  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      showToast("Your message has been sent successfully!", "success");
    })
    .catch(error => {
      showToast('Oops... ' + error.message, "error");
    });
});

// Toast function to show messages with inline styles
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  // Inline CSS for Toast
  const styles = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    color: '#fff',
    zIndex: '1000',
    opacity: '0.9',
  };

  // Apply inline styles
  Object.assign(toast.style, styles);

  // Apply color based on type
  if (type === 'success') {
    toast.style.backgroundColor = 'green';
  } else if (type === 'error') {
    toast.style.backgroundColor = 'red';
  }

  // Append toast to the body
  document.body.appendChild(toast);

  // Remove the toast after 3 seconds
  setTimeout(() => toast.remove(), 3000);
}