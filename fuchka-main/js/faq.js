// JavaScript for FAQ Page

document.addEventListener('DOMContentLoaded', function() {
  // Initialize FAQ accordions
  initFaqAccordions();
  
  // Initialize FAQ category filters
  initFaqCategoryFilters();
});

// FAQ Accordions
function initFaqAccordions() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (!faqQuestions.length) return;
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains('active');
      
      // Close all other open FAQs
      faqQuestions.forEach(q => {
        if (q !== this) {
          q.classList.remove('active');
          const otherAnswer = q.nextElementSibling;
          otherAnswer.style.maxHeight = '0';
        }
      });
      
      // Toggle current FAQ
      if (isActive) {
        this.classList.remove('active');
        answer.style.maxHeight = '0';
      } else {
        this.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
  
  // Open first FAQ by default
  if (faqQuestions.length > 0) {
    faqQuestions[0].click();
  }
}

// FAQ Category Filters
function initFaqCategoryFilters() {
  const categoryButtons = document.querySelectorAll('.faq-category');
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (!categoryButtons.length || !faqItems.length) return;
  
  // Set first category as active by default
  categoryButtons[0].classList.add('active');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active button
      categoryButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      
      // Filter FAQs
      faqItems.forEach(item => {
        if (category === 'all') {
          item.style.display = 'block';
          
          // Add animation
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else if (item.getAttribute('data-category') === category) {
          item.style.display = 'block';
          
          // Add animation
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.opacity = '0';
          
          // Remove element after fade out
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
      
      // Close all open FAQs
      const faqQuestions = document.querySelectorAll('.faq-question');
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        const answer = q.nextElementSibling;
        answer.style.maxHeight = '0';
      });
      
      // Open first visible FAQ
      const visibleFaqs = document.querySelectorAll(`.faq-item[data-category="${category}"] .faq-question, 
                                                   ${category === 'all' ? '.faq-question' : ''}`);
      if (visibleFaqs.length > 0) {
        setTimeout(() => {
          visibleFaqs[0].click();
        }, 300);
      }
    });
  });
}

// FAQ Search Functionality
function initFaqSearch() {
  const searchInput = document.getElementById('faqSearch');
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (!searchInput || !faqItems.length) return;
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    // Reset category filters when searching
    const categoryButtons = document.querySelectorAll('.faq-category');
    categoryButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    if (categoryButtons.length > 0) {
      categoryButtons[0].classList.add('active');
    }
    
    let matchFound = false;
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question').textContent.toLowerCase();
      const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
      
      if (question.includes(searchTerm) || answer.includes(searchTerm) || searchTerm === '') {
        item.style.display = 'block';
        item.style.opacity = '1';
        
        // Highlight matching text
        if (searchTerm !== '') {
          highlightText(item, searchTerm);
        } else {
          // Remove highlights if search is cleared
          removeHighlights(item);
        }
        
        matchFound = true;
      } else {
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
    
    // Show no results message
    const noResults = document.querySelector('.no-results');
    if (noResults) {
      if (!matchFound && searchTerm !== '') {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
    
    // Close all open FAQs
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
      q.classList.remove('active');
      const answer = q.nextElementSibling;
      answer.style.maxHeight = '0';
    });
    
    // Open first matching FAQ
    if (matchFound) {
      const visibleFaqs = document.querySelectorAll('.faq-item[style*="display: block"] .faq-question');
      if (visibleFaqs.length > 0) {
        setTimeout(() => {
          visibleFaqs[0].click();
        }, 300);
      }
    }
  });
}

// Helper function to highlight matching text
function highlightText(element, term) {
  // Remove existing highlights first
  removeHighlights(element);
  
  const questionElement = element.querySelector('.faq-question');
  const answerElement = element.querySelector('.faq-answer-content');
  
  // Store original text if not already stored
  if (!questionElement.hasAttribute('data-original')) {
    questionElement.setAttribute('data-original', questionElement.innerHTML);
  }
  if (!answerElement.hasAttribute('data-original')) {
    answerElement.setAttribute('data-original', answerElement.innerHTML);
  }
  
  // Get original text
  const questionText = questionElement.getAttribute('data-original');
  const answerText = answerElement.getAttribute('data-original');
  
  // Create regex for case-insensitive search with word boundaries
  const regex = new RegExp(`(${term})`, 'gi');
  
  // Apply highlighting
  questionElement.innerHTML = questionText.replace(regex, '<span class="highlight">$1</span>');
  answerElement.innerHTML = answerText.replace(regex, '<span class="highlight">$1</span>');
}

// Helper function to remove highlights
function removeHighlights(element) {
  const questionElement = element.querySelector('.faq-question');
  const answerElement = element.querySelector('.faq-answer-content');
  
  // Restore original text if available
  if (questionElement.hasAttribute('data-original')) {
    questionElement.innerHTML = questionElement.getAttribute('data-original');
  }
  
  if (answerElement.hasAttribute('data-original')) {
    answerElement.innerHTML = answerElement.getAttribute('data-original');
  }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initFaqSearch();
});