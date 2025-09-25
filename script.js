const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');

mobileToggle.addEventListener('click', () => {
     nav.classList.toggle('active');
     const icon = mobileToggle.querySelector('i');
     icon.className = nav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

function setActiveLink() {
     const currentPath = window.location.pathname.split("/").pop(); 
     navLinks.forEach(link => {
          const linkPath = link.getAttribute('href');
          if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
               link.classList.add('active');
          } else {
               link.classList.remove('active');
          }
     });
}

// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-content');

function showPage(pageId) {
     pages.forEach(page => {
          page.style.display = 'none';
     });
     
     const targetPage = document.getElementById(pageId + '-page');
     if (targetPage) {
          targetPage.style.display = 'block';
     }
     
     navLinks.forEach(link => {
          link.classList.remove('active');
     });
     
     const activeLink = document.querySelector(`[data-page="${pageId}"]`);
     if (activeLink) {
          activeLink.classList.add('active');
     }

     nav.classList.remove('active');
     const icon = mobileToggle.querySelector('i');
     icon.className = 'fas fa-bars';

     window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (e) => {
     if (e.target.hasAttribute('data-page')) {
          e.preventDefault();
          const pageId = e.target.getAttribute('data-page');
          showPage(pageId);
     }
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
     button.addEventListener('click', function(e) {
          e.preventDefault();
          
          this.classList.add('loading');
          this.textContent = 'Adding...';
          
          setTimeout(() => {
          this.classList.remove('loading');
          this.textContent = 'Added!';
          this.style.background = 'var(--success-color)';
          
          setTimeout(() => {
               this.textContent = 'Add to Cart';
               this.style.background = 'var(--primary-color)';
          }, 2000);
          }, 1000);
     });
});

const contactForm = document.getElementById('contact-form');

if (contactForm) {
     contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const submitBtn = this.querySelector('.submit-btn');
          const formData = new FormData(this);
          
          // Validate required fields
          const requiredFields = this.querySelectorAll('[required]');
          let isValid = true;
          
          requiredFields.forEach(field => {
          if (!field.value.trim()) {
               field.style.borderColor = 'var(--danger-color)';
               isValid = false;
          } else {
               field.style.borderColor = 'var(--border-light)';
          }
          });
          
          if (!isValid) {
          alert('Please fill in all required fields.');
          return;
          }
          
          // Email validation
          const email = formData.get('email');
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
          document.getElementById('email').style.borderColor = 'var(--danger-color)';
          alert('Please enter a valid email address.');
          return;
          }

          submitBtn.classList.add('loading');
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
          
          setTimeout(() => {
               submitBtn.classList.remove('loading');
               submitBtn.textContent = 'Message Sent!';
               submitBtn.style.background = 'var(--success-color)';

          Swal.fire({
               title: 'Thank you!',
               text: "We'll get back to you soon.",
               icon: 'success',
               confirmButtonText: 'OK',
               timer: 5000,
               timerProgressBar: true
          });

          this.reset();
          setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = 'var(--primary-color)';
          submitBtn.disabled = false;
          }, 3000);
          },2000);
     });
}

document.addEventListener('click', function(e) {
     if (e.target.classList.contains('cta-button')) {
          e.preventDefault();
          const targetPage = e.target.getAttribute('data-page');
          if (targetPage) {
          showPage(targetPage);
          }
     }
});

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
     
     if (scrollTop > lastScrollTop && scrollTop > 100) {
          header.style.transform = 'translateY(-100%)';
     } else {
          header.style.transform = 'translateY(0)';
     }
     
     lastScrollTop = scrollTop;
});

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
     card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px) scale(1.02)';
     });
     
     card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
     });
});

document.addEventListener('DOMContentLoaded', function() {
     setActiveLink();
     if (document.getElementById('home-page')) {
          showPage('home');
     } else {
          const pages = document.querySelectorAll('.page-content');
          pages.forEach(page => page.style.display = 'block');
     }
     
     const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
     };
     
     const observer = new IntersectionObserver(function(entries) {
          entries.forEach(entry => {
          if (entry.isIntersecting) {
               entry.target.style.opacity = '1';
               entry.target.style.transform = 'translateY(0)';
          }
          });
     }, observerOptions);
     

     const animateElements = document.querySelectorAll('.product-card, .feature-item, .about-content');
     animateElements.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'all 0.6s ease';
          observer.observe(el);
     });
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
     const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
          if (entry.isIntersecting) {
               const img = entry.target;
               img.classList.remove('lazy');
               imageObserver.unobserve(img);
          }
          });
     });
     
     document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
     });
}