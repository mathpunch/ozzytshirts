/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // Add show-menu class to the div tag with the nav__menu class
            nav.classList.add('show-menu');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav__link');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

function linkAction() {
    // Remove show-menu class when clicking nav links
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

// Close menu when clicking close button
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    if (this.scrollY >= 50) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    // reset: true
});

sr.reveal('.hero__data, .about__info, .contact__content, .footer__content', {});
sr.reveal('.hero__image', { delay: 400 });
sr.reveal('.about__image', { delay: 600 });
sr.reveal('.product__card', { interval: 100 });
sr.reveal('.feature__card', { interval: 100 });

/*==================== PRODUCT INTERACTIONS ====================*/
// Hero product color changing
const heroColorDots = document.querySelectorAll('.hero__visual .color-dot');
const heroTshirtMockup = document.querySelector('.tshirt-mockup');

heroColorDots.forEach(dot => {
    dot.addEventListener('click', function() {
        // Remove active from all dots
        heroColorDots.forEach(d => d.classList.remove('active'));
        // Add active to clicked dot
        this.classList.add('active');
        
        // Change t-shirt color
        const color = this.dataset.color;
        if (heroTshirtMockup) {
            heroTshirtMockup.style.background = color;
        }
        
        // Add animation
        this.style.transform = 'scale(1.3)';
        setTimeout(() => {
            this.style.transform = 'scale(1.2)';
        }, 200);
    });
});

// Product card color swatches
const colorSwatches = document.querySelectorAll('.color-swatch');
colorSwatches.forEach(swatch => {
    if (!swatch.classList.contains('more-colors')) {
        swatch.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const mockupTshirt = productCard.querySelector('.mockup-tshirt');
            const color = this.style.backgroundColor;
            
            // Remove active from siblings
            const siblings = this.parentElement.querySelectorAll('.color-swatch:not(.more-colors)');
            siblings.forEach(s => s.classList.remove('active-swatch'));
            
            // Add active to clicked swatch
            this.classList.add('active-swatch');
            
            // Change mockup color if it exists
            if (mockupTshirt && color) {
                // Extract RGB values and create a lighter gradient version
                const rgb = color.match(/\d+/g);
                if (rgb) {
                    const r = parseInt(rgb[0]);
                    const g = parseInt(rgb[1]);
                    const b = parseInt(rgb[2]);
                    const lighterColor = `rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)})`;
                    mockupTshirt.style.background = `linear-gradient(135deg, ${color}, ${lighterColor})`;
                }
            }
        });
    }
});

// Add to cart button animation
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add loading state
        this.classList.add('loading');
        this.disabled = true;
        
        // Simulate loading time
        setTimeout(() => {
            this.classList.remove('loading');
            this.classList.add('success');
            
            // Reset after showing success
            setTimeout(() => {
                this.classList.remove('success');
                this.disabled = false;
                
                // Update cart count
                cartCount++;
                updateCartCount();
            }, 2000);
        }, 1500);
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        // Get click position relative to button
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

/*==================== CONTACT FORM ====================*/
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = '#48cae4';
            
            // Reset form
            this.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }, 2000);
    });
}

/*==================== NEWSLETTER SUBSCRIPTION ====================*/
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    const newsletterButton = newsletterForm.querySelector('.newsletter__button');
    const newsletterInput = newsletterForm.querySelector('.newsletter__input');
    
    newsletterButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (newsletterInput.value.trim() === '') {
            newsletterInput.style.borderColor = '#ff6b6b';
            newsletterInput.placeholder = 'Please enter your email';
            return;
        }
        
        // Reset border
        newsletterInput.style.borderColor = '';
        
        const originalContent = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i>';
        this.style.background = '#48cae4';
        
        // Clear input
        newsletterInput.value = '';
        newsletterInput.placeholder = 'Subscribed successfully!';
        
        // Reset after delay
        setTimeout(() => {
            this.innerHTML = originalContent;
            this.style.background = '';
            newsletterInput.placeholder = 'Your email';
        }, 3000);
    });
}

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*==================== TYPING ANIMATION ====================*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero__title-accent');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
});

/*==================== CART FUNCTIONALITY ====================*/
let cartCount = 0;
const cartIcon = document.querySelector('.nav__cart');

function updateCartCount() {
    // You can add a cart count badge here
    const existingBadge = cartIcon.querySelector('.cart-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    if (cartCount > 0) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = cartCount;
        badge.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: #ff6b6b;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        `;
        cartIcon.style.position = 'relative';
        cartIcon.appendChild(badge);
    }
}

// Update cart count when items are added
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        updateCartCount();
    });
});

/*==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product__card, .feature__card, .about__feature').forEach(el => {
    observer.observe(el);
});

/*==================== DYNAMIC LOADING STATES ====================*/
function showLoadingState(button) {
    const spinner = document.createElement('i');
    spinner.className = 'fas fa-spinner fa-spin';
    button.prepend(spinner);
    button.disabled = true;
}

function hideLoadingState(button, originalContent) {
    button.innerHTML = originalContent;
    button.disabled = false;
}

/*==================== THEME CUSTOMIZATION ====================*/
// You can add theme switching functionality here
function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

/*==================== PERFORMANCE OPTIMIZATION ====================*/
// Lazy loading for images (if you add real images later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

/*==================== ACCESSIBILITY IMPROVEMENTS ====================*/
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        navMenu.classList.remove('show-menu');
    }
});

// Focus management for mobile menu
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Add focus trap to mobile menu when it's open
const navToggle = document.getElementById('nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        setTimeout(() => {
            if (navMenu.classList.contains('show-menu')) {
                trapFocus(navMenu);
            }
        }, 100);
    });
}

/*==================== UTILS ====================*/
// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(scrollActive, 100));
window.addEventListener('scroll', throttle(scrollHeader, 100));

/*==================== CONSOLE STYLING ====================*/
console.log('%c🎨 Ozzy\'s T-Shirts Website Loaded Successfully! 👕', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Claude AI', 'color: #4ecdc4; font-size: 12px;');

/*==================== ERROR HANDLING ====================*/
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

/*==================== READY STATE ====================*/
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 DOM fully loaded and parsed');
    });
} else {
    console.log('🚀 DOM already loaded');
}
