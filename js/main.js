// js/main.js

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                preloader.classList.add('preloader-hidden');
                setTimeout(function () {
                    preloader.style.display = 'none';
                }, 500);
            }, 300);
        });
    }

    // ===== MOBILE NAVIGATION =====
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

    if (hamburger && mobileNav) {
        // Open menu
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileNav.classList.toggle('active');

            // Animate hamburger
            const bars = this.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });

        // Close menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('active');
                resetHamburger();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileNav.contains(e.target) && !hamburger.contains(e.target) && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                resetHamburger();
            }
        });

        // Reset hamburger icon
        function resetHamburger() {
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('active'));
        }
    }

    // ===== ACTIVE NAVIGATION LINK =====
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }

        // Remove active class from home if not on home page
        if (currentPage !== 'index.html' && linkPage === 'index.html') {
            link.classList.remove('active');
        }
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== CERTIFICATE IMAGE PLACEHOLDER (for credentials.html page) =====
    // This function will be called on the credentials page
    window.initCertificateGallery = function () {
        const certImages = document.querySelectorAll('.cert-full-image .image-placeholder, .cert-gallery-item .image-placeholder');

        certImages.forEach((placeholder, index) => {
            placeholder.addEventListener('click', function () {
                // This will be replaced with actual lightbox functionality
                console.log('Certificate image clicked. Replace with lightbox.');
            });
        });
    };

    // ===== PROJECT FILTER (for projects.html page) =====
    window.initProjectFilter = function () {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-item');

        if (filterButtons.length && projectItems.length) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function () {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));

                    // Add active class to clicked button
                    this.classList.add('active');

                    const filterValue = this.getAttribute('data-filter');

                    projectItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }
    };

    // ===== FORM VALIDATION (for contact.html page) =====
    window.initContactForm = function () {
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Basic validation
                let isValid = true;
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const phone = document.getElementById('phone');
                const message = document.getElementById('message');

                // Reset errors
                document.querySelectorAll('.error-message').forEach(el => el.remove());

                // Validate name
                if (name && !name.value.trim()) {
                    showError(name, 'Name is required');
                    isValid = false;
                }

                // Validate email
                if (email) {
                    const emailValue = email.value.trim();
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailValue) {
                        showError(email, 'Email is required');
                        isValid = false;
                    } else if (!emailPattern.test(emailValue)) {
                        showError(email, 'Please enter a valid email');
                        isValid = false;
                    }
                }

                // Validate message
                if (message && !message.value.trim()) {
                    showError(message, 'Message is required');
                    isValid = false;
                }

                if (isValid) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message. We will contact you shortly.';

                    contactForm.reset();
                    contactForm.parentNode.insertBefore(successMessage, contactForm);

                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }
            });

            function showError(input, message) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.color = '#dc2626';
                errorDiv.style.fontSize = '0.8rem';
                errorDiv.style.marginTop = '0.25rem';
                errorDiv.textContent = message;

                input.parentNode.appendChild(errorDiv);
                input.style.borderColor = '#dc2626';

                input.addEventListener('input', function () {
                    this.style.borderColor = '';
                    const error = this.parentNode.querySelector('.error-message');
                    if (error) error.remove();
                }, { once: true });
            }
        }
    };

    // ===== STICKY NAVIGATION SHADOW =====
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // ===== LAZY LOAD PLACEHOLDER FOR IMAGES =====
    // This prepares for when actual images are inserted
    function setupImagePlaceholders() {
        const placeholders = document.querySelectorAll('.image-placeholder');

        placeholders.forEach(placeholder => {
            // Add data attribute to mark as placeholder
            placeholder.setAttribute('data-placeholder', 'true');

            // Add hover effect
            placeholder.addEventListener('mouseenter', function () {
                this.style.borderColor = 'rgba(255,179,71,0.8)';
                this.style.backgroundColor = 'rgba(255,179,71,0.05)';
            });

            placeholder.addEventListener('mouseleave', function () {
                this.style.borderColor = 'rgba(255,179,71,0.3)';
                this.style.backgroundColor = '';
            });

            // Click to simulate image insertion (development only)
            placeholder.addEventListener('click', function (e) {
                e.stopPropagation();
                console.log('Image slot clicked. Replace with: ', this.querySelector('span')?.textContent || 'image');
            });
        });
    }

    setupImagePlaceholders();

    // Initialize page-specific functions based on body class or URL
    const body = document.body;
    const path = window.location.pathname;

    if (path.includes('credentials.html')) {
        window.initCertificateGallery();
    } else if (path.includes('projects.html')) {
        window.initProjectFilter();
    } else if (path.includes('contact.html')) {
        window.initContactForm();
    }

    console.log('CINTECH ENERGY website loaded successfully. Ready for image insertion.');
});