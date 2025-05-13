// JavaScript for Home Page

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Testimonial Slider
  initTestimonialSlider();
  
  // Initialize Gallery Lightbox
  initGalleryLightbox();
});

// Testimonial Slider
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider');
  const dots = document.querySelectorAll('.slider-dot');
  
  if (!slider || !dots.length) return;
  
  let currentSlide = 0;
  const slideCount = slider.children.length;
  
  // Set initial active dot
  dots[0].classList.add('active');
  
  // Click event for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });
  
  // Auto slide change
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Reset interval on manual navigation
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  function nextSlide() {
    goToSlide((currentSlide + 1) % slideCount);
  }
  
  function goToSlide(slideIndex) {
    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
    
    // Move slider
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    // Update current slide
    currentSlide = slideIndex;
    
    resetInterval();
  }
  
  // Pause auto-rotation when hovering
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
}

// Gallery Lightbox
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!galleryItems.length) return;
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const imgAlt = this.querySelector('img').alt;
      
      // Create lightbox elements
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      
      const lightboxContent = document.createElement('div');
      lightboxContent.className = 'lightbox-content';
      
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = imgAlt;
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'lightbox-close';
      closeBtn.innerHTML = '&times;';
      
      const caption = document.createElement('div');
      caption.className = 'lightbox-caption';
      caption.textContent = imgAlt;
      
      // Append elements
      lightboxContent.appendChild(img);
      lightboxContent.appendChild(closeBtn);
      lightboxContent.appendChild(caption);
      lightbox.appendChild(lightboxContent);
      document.body.appendChild(lightbox);
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      
      // Add animation
      setTimeout(() => {
        lightbox.style.opacity = '1';
      }, 10);
      
      // Close lightbox on button click
      closeBtn.addEventListener('click', closeLightbox);
      
      // Close lightbox on background click
      lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
          closeLightbox();
        }
      });
      
      // Close on ESC key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeLightbox();
        }
      });
      
      function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        }, 300);
      }
    });
  });
}

// Animate on scroll for menu items
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  
  if (menuItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in');
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    menuItems.forEach(item => {
      item.style.opacity = '0';
      observer.observe(item);
    });
  }
});