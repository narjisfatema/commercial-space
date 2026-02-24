// ==================== GALLERY MODAL FUNCTIONALITY ====================
function openModal(imageSrc, caption) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  
  modal.style.display = 'block';
  modalImg.src = imageSrc;
  captionText.textContent = caption;
  
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking on the image
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
});

// ==================== FORM SUBMISSION ====================
var form = document.getElementById("form");

async function handleSubmit(event) {
  event.preventDefault();
  
  var status = document.getElementById("formResponse");
  var submitBtn = form.querySelector('button[type="submit"]');
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';
  status.className = '';
  status.textContent = '';
  
  var data = new FormData(event.target);
  
  try {
    const response = await fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      status.className = 'form-response success';
      status.innerHTML = '✓ Thanks for your response! We will get back to you via email shortly.';
      form.reset();
      
      // Scroll to response message
      setTimeout(() => {
        status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } else {
      const responseData = await response.json();
      
      if (Object.hasOwn(responseData, 'errors')) {
        const errorMessage = responseData["errors"].map(error => error["message"]).join(", ");
        status.className = 'form-response error';
        status.innerHTML = '✗ Error: ' + errorMessage;
      } else {
        status.className = 'form-response error';
        status.innerHTML = '✗ Oops! There was a problem submitting your form. Please try again.';
      }
    }
  } catch (error) {
    status.className = 'form-response error';
    status.innerHTML = '✗ Oops! There was a problem submitting your form. Please check your internet connection and try again.';
    console.error('Form submission error:', error);
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.textContent = 'Schedule My Visit';
  }
}

form.addEventListener("submit", handleSubmit);

// ==================== SMOOTH SCROLL FOR NAVIGATION ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Check if it's a valid link and the element exists on the page
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault(); // Stop instant jump
      
      // Tell the browser to scroll to the target smoothly
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe feature cards, amenity items, and testimonial cards
document.querySelectorAll('.feature-card, .amenity-item, .testimonial-card, .spec-item').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});