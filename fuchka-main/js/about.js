// JavaScript for About Page

document.addEventListener('DOMContentLoaded', function() {
  // Initialize about page animations
  initAboutAnimations();
  
  // Initialize team member hover effects
  initTeamHoverEffects();
});

// About Page Animations
function initAboutAnimations() {
  // Animate story section on scroll
  const storySection = document.querySelector('.story-section');
  
  if (storySection) {
    const storyContent = storySection.querySelector('.story-content');
    const storyImage = storySection.querySelector('.story-image');
    const storyText = storySection.querySelector('.story-text');
    
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const sectionTop = storySection.offsetTop;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition > sectionTop - windowHeight / 1.5) {
        if (storyImage) storyImage.classList.add('fade-in');
        
        if (storyText) {
          setTimeout(() => {
            storyText.classList.add('slide-up');
          }, 300);
        }
      }
    });
  }
  
  // Animate values items
  const valueItems = document.querySelectorAll('.value-item');
  
  if (valueItems.length > 0) {
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
    
    valueItems.forEach(item => {
      item.style.opacity = '0';
      observer.observe(item);
    });
  }
}

// Team Member Hover Effects
function initTeamHoverEffects() {
  const teamMembers = document.querySelectorAll('.team-member');
  
  teamMembers.forEach(member => {
    const socialLinks = member.querySelector('.team-social');
    
    if (socialLinks) {
      // Initial state - hidden
      socialLinks.style.opacity = '0';
      socialLinks.style.transform = 'translateY(20px)';
      socialLinks.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      // Mouse enter - show
      member.addEventListener('mouseenter', () => {
        socialLinks.style.opacity = '1';
        socialLinks.style.transform = 'translateY(0)';
      });
      
      // Mouse leave - hide
      member.addEventListener('mouseleave', () => {
        socialLinks.style.opacity = '0';
        socialLinks.style.transform = 'translateY(20px)';
      });
    }
  });
}

// Counter Animation for Years of Experience
document.addEventListener('DOMContentLoaded', function() {
  const experienceCounters = document.querySelectorAll('.counter');
  
  if (experienceCounters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.getAttribute('data-count'));
          
          let count = 0;
          const updateCounter = () => {
            const increment = countTo / 50; // Divide by steps
            
            if (count < countTo) {
              count += increment;
              target.textContent = Math.floor(count);
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = countTo;
            }
          };
          
          updateCounter();
          counterObserver.unobserve(target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    experienceCounters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
});