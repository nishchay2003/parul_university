// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Shrinking Navbar on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Auto-rotate testimonials
    if (testimonials.length > 0) {
        setInterval(nextTestimonial, 5000);
    }

    // Course Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            courseCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(this);
        });
    });

    // Event Accordion
    const eventHeaders = document.querySelectorAll('.event-header');
    eventHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const details = this.nextElementSibling;
            const isOpen = details.classList.contains('show');
            
            // Close all other details
            document.querySelectorAll('.event-details').forEach(detail => {
                detail.classList.remove('show');
            });
            
            // Toggle current details
            if (!isOpen) {
                details.classList.add('show');
            }
        });
    });

    // Image Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (modal && modalImg && img) {
                modal.style.display = 'block';
                modalImg.src = img.src;
            }
        });
    });

    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Form Validation Function
function validateForm(form) {
    let isValid = true;
    const formGroups = form.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const errorMsg = group.querySelector('.error-message');
        
        if (input) {
            // Remove previous error state
            group.classList.remove('error');
            if (errorMsg) errorMsg.remove();
            
            // Validate required fields
            if (input.hasAttribute('required') && !input.value.trim()) {
                showError(group, input, 'This field is required');
                isValid = false;
            }
            
            // Validate email
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    showError(group, input, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            // Validate phone
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
                    showError(group, input, 'Please enter a valid 10-digit phone number');
                    isValid = false;
                }
            }
        }
    });
    
    if (isValid) {
        showSuccessMessage(form);
    }
    
    return isValid;
}

function showError(group, input, message) {
    group.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    group.appendChild(errorDiv);
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = 'background: #10b981; color: white; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;';
    successDiv.textContent = 'Form submitted successfully!';
    
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
        form.reset();
    }, 3000);
}

// Contact Form Map Integration
function initMap() {
    // This would integrate with Google Maps API
    console.log('Map initialized');
}

// Search Functionality
function searchCourses(query) {
    const courseCards = document.querySelectorAll('.course-card');
    const searchTerm = query.toLowerCase();
    
    courseCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Dark Mode Toggle (Optional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Intersection Observer for Animations
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

// FAQ Accordion
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.course-card, .about-text, .testimonial');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize FAQ
    initFAQ();
    
    // Initialize Login
    initLogin();
});

// Login Page Functions
function initLogin() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginContainers = document.querySelectorAll('.login-form-container');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            
            // Update active tab
            tabBtns.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            loginContainers.forEach(container => {
                container.classList.remove('active');
            });
            document.getElementById(tabType + '-login').classList.add('active');
        });
    });
    
    // Check URL parameter for tab
    const urlParams = new URLSearchParams(window.location.search);
    const loginType = urlParams.get('type');
    if (loginType === 'faculty') {
        document.querySelector('[data-tab="faculty"]').click();
    }
    
    // Login form submissions
    const studentForm = document.getElementById('studentLoginForm');
    const facultyForm = document.getElementById('facultyLoginForm');
    
    if (studentForm) {
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin('student', this);
        });
    }
    
    if (facultyForm) {
        facultyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin('faculty', this);
        });
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function handleLogin(type, form) {
    const formData = new FormData(form);
    const userId = type === 'student' ? formData.get('studentId') : formData.get('facultyId');
    const password = formData.get('password');
    
    // Simple validation
    if (!userId || !password) {
        showLoginMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login process
    const btn = form.querySelector('.login-btn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Demo credentials
        const validCredentials = {
            student: { id: 'student123', password: 'password' },
            faculty: { id: 'faculty123', password: 'password' }
        };
        
        if (userId === validCredentials[type].id && password === validCredentials[type].password) {
            showLoginMessage(`Welcome! Redirecting to ${type} dashboard...`, 'success');
            setTimeout(() => {
                // In real app, redirect to dashboard
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showLoginMessage('Invalid credentials. Try student123/password or faculty123/password', 'error');
            btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            btn.disabled = false;
        }
    }, 1500);
}

function showLoginMessage(message, type) {
    const existingMsg = document.querySelector('.login-message');
    if (existingMsg) existingMsg.remove();
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `login-message ${type}`;
    msgDiv.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        ${type === 'success' ? 'background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' : 'background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;'}
    `;
    msgDiv.textContent = message;
    
    const activeForm = document.querySelector('.login-form-container.active .login-form');
    activeForm.insertBefore(msgDiv, activeForm.firstChild);
    
    setTimeout(() => msgDiv.remove(), 5000);
}