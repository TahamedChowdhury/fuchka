// JavaScript for Contact Page

document.addEventListener('DOMContentLoaded', function() {
  // Initialize contact form validation
  initContactForm();
});

// Contact Form Validation
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateContactForm()) {
      // Show success message
      showFormMessage('success', 'Your message has been sent successfully! We will get back to you soon.');
      
      // Reset form
      this.reset();
    }
  });
  
  // Remove error messages on input
  const formInputs = contactForm.querySelectorAll('.form-control');
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('invalid');
      const errorElement = this.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
    });
  });
}

// Validate Contact Form
function validateContactForm() {
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  
  let isValid = true;
  
  // Clear previous error messages
  const errorMessages = contactForm.querySelectorAll('.error-message');
  errorMessages.forEach(message => message.remove());
  
  // Validate Name
  if (!nameInput.value.trim()) {
    showError(nameInput, 'Please enter your name');
    isValid = false;
  }
  
  // Validate Email
  if (!emailInput.value.trim()) {
    showError(emailInput, 'Please enter your email address');
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, 'Please enter a valid email address');
    isValid = false;
  }
  
  // Validate Subject
  if (!subjectInput.value.trim()) {
    showError(subjectInput, 'Please enter a subject');
    isValid = false;
  }
  
  // Validate Message
  if (!messageInput.value.trim()) {
    showError(messageInput, 'Please enter your message');
    isValid = false;
  }
  
  return isValid;
}

// Show error message
function showError(input, message) {
  input.classList.add('invalid');
  
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  
  input.parentElement.appendChild(errorElement);
}

// Show form message (success/error)
function showFormMessage(type, message) {
  const formMessage = document.querySelector('.form-message');
  
  if (formMessage) {
    formMessage.textContent = message;
    formMessage.className = 'form-message';
    formMessage.classList.add(type);
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
}

// Email validation helper
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Google Maps API Integration (if applicable)
function initMap() {
  // This function would be called by the Google Maps API
  // You would need to add your API key to use this feature
  
  const mapElement = document.getElementById('contactMap');
  
  if (mapElement && window.google && window.google.maps) {
    const location = { lat: 19.0760, lng: 72.8777 }; // Mumbai coordinates (example)
    
    const map = new google.maps.Map(mapElement, {
      center: location,
      zoom: 15,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ weight: "2.00" }]
        },
        {
          featureType: "all",
          elementType: "geometry.stroke",
          stylers: [{ color: "#9c9c9c" }]
        },
        {
          featureType: "all",
          elementType: "labels.text",
          stylers: [{ visibility: "on" }]
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }]
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }]
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#46bcec" }, { visibility: "on" }]
        }
      ]
    });
    
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Pani Puri Delight',
      animation: google.maps.Animation.DROP
    });
    
    const infoWindow = new google.maps.InfoWindow({
      content: '<div style="padding: 10px;"><h3>Pani Puri Delight</h3><p>123 Flavor Street, Mumbai, India</p></div>'
    });
    
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  }
}