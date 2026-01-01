// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-sm');
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.classList.remove('shadow-sm');
        navbar.style.padding = '1rem 0';
    }
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80; // Height of fixed navbar
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
                bsCollapse.hide();
            }
        }
    });
});

// Add animation on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fadeInUp');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fadeInUp');
        }
    });
};

// Initialize animations on page load
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Testimonial carousel
const initTestimonialCarousel = () => {
    const testimonialCarousel = document.querySelector('#testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            touch: true,
            keyboard: true
        });
    }
};

// Initialize all components when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Initialize testimonial carousel
    initTestimonialCarousel();

    // Add active class to current nav link
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuLength = navLinks.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (navLinks[i].href === currentLocation) {
            navLinks[i].classList.add('active');
            navLinks[i].setAttribute('aria-current', 'page');
        }
    }
});

// Form validation for contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        let isValid = true;
        
        // Reset previous error messages
        document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (optional but if provided, validate format)
        if (phone.value.trim() && !/^[0-9+\-\s()]+$/.test(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        }
        
        // If form is valid, you can submit it via AJAX or let it submit normally
        if (isValid) {
            // Here you would typically make an AJAX call to submit the form
            // For now, we'll just show a success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success mt-3';
                alertDiv.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(alertDiv);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
            }, 1000);
        }
    });
}

// Helper function to show error messages
function showError(input, message) {
    input.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add animation to elements when they come into view
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(element => {
    observer.observe(element);
});
