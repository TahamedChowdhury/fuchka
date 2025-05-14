// Main JavaScript file for Pani Puri Website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Initialize scroll animations
  initScrollAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Toggle between menu and close icon
      const icon = this.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navMenu && navMenu.classList.contains('active') && 
        !navMenu.contains(event.target) && 
        !menuToggle.contains(event.target)) {
      navMenu.classList.remove('active');
      
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('fa-times')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
  
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = 'visible';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    animatedElements.forEach(element => {
      element.style.visibility = 'hidden';
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(element);
    });
  }
}

// Active Navigation Link
function setActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    if (currentPath === linkPath || 
        (currentPath === '/' && linkPath.includes('index.html')) ||
        (currentPath.includes('index.html') && linkPath === '/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Form Validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const formElements = form.elements;
    
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      
      if (element.type !== 'submit' && element.hasAttribute('required') && !element.value.trim()) {
        isValid = false;
        element.classList.add('error');
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'This field is required';
        
        if (!element.nextElementSibling || !element.nextElementSibling.classList.contains('error-message')) {
          element.parentNode.insertBefore(errorMsg, element.nextSibling);
        }
      } else if (element.type === 'email' && element.value.trim() && !isValidEmail(element.value)) {
        isValid = false;
        element.classList.add('error');
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Please enter a valid email address';
        
        if (!element.nextElementSibling || !element.nextElementSibling.classList.contains('error-message')) {
          element.parentNode.insertBefore(errorMsg, element.nextSibling);
        }
      } else {
        element.classList.remove('error');
        if (element.nextElementSibling && element.nextElementSibling.classList.contains('error-message')) {
          element.nextElementSibling.remove();
        }
      }
    }
    
    if (isValid) {
      // Show success message
      const formMessage = form.querySelector('.form-message');
      if (formMessage) {
        formMessage.textContent = 'Form submitted successfully! We will get back to you soon.';
        formMessage.classList.add('success');
        formMessage.style.display = 'block';
      }
      
      // Reset form after successful submission
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        if (formMessage) {
          formMessage.style.display = 'none';
        }
      }, 5000);
    }
  });
  
  // Clear error on input
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('error');
      if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
        this.nextElementSibling.remove();
      }
    });
  });
}

// Email validation helper
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Create smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize for all pages
document.addEventListener('DOMContentLoaded', function() {
  setActiveNavLink();
  initSmoothScroll();
});