document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    initializeRevealClasses();
    setupScrollReveal();
    setupParallaxScroll();
    setupSmoothScroll();
    setupHamburgerMenu();
    setupContactForm();
    setupLogoClick();
    setupTypingAnimation();
    setupSocialIcons();
    setupDraggableIdCard();
});

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('portfolioTheme');
    const startingTheme = savedTheme || 'dark';

    setTheme(startingTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            setTheme(nextTheme);
            localStorage.setItem('portfolioTheme', nextTheme);
        });
    }
}

function setTheme(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const isLight = theme === 'light';

    document.body.classList.toggle('light-theme', isLight);

    if (themeToggle) {
        themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }
}

function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navRight) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navRight.classList.toggle('active');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navRight.classList.remove('active');
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar')) {
            hamburger.classList.remove('active');
            navRight.classList.remove('active');
        }
    });
}

function setupLogoClick() {
    const logo = document.querySelector('.logo-section');
    const introSection = document.getElementById('intro');

    if (!logo || !introSection) return;

    logo.addEventListener('click', (e) => {
        e.preventDefault();
        introSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

function setupDraggableIdCard() {
    const card = document.querySelector('.floating-id-card');
    if (!card) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    card.addEventListener('pointerdown', (event) => {
        isDragging = true;
        card.classList.add('dragging');
        card.setPointerCapture(event.pointerId);

        const rect = card.getBoundingClientRect();
        startX = event.clientX;
        startY = event.clientY;
        initialLeft = rect.left;
        initialTop = rect.top;

        card.style.left = `${initialLeft}px`;
        card.style.top = `${initialTop}px`;
        card.style.right = 'auto';
    });

    card.addEventListener('pointermove', (event) => {
        if (!isDragging) return;

        const nextLeft = initialLeft + event.clientX - startX;
        const nextTop = initialTop + event.clientY - startY;
        const maxLeft = window.innerWidth - card.offsetWidth;
        const maxTop = window.innerHeight - card.offsetHeight;

        card.style.left = `${Math.min(Math.max(nextLeft, 0), maxLeft)}px`;
        card.style.top = `${Math.min(Math.max(nextTop, 70), maxTop)}px`;
    });

    card.addEventListener('pointerup', (event) => {
        isDragging = false;
        card.classList.remove('dragging');
        card.releasePointerCapture(event.pointerId);
    });
}

function setupTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const phrases = ['Graphic Designer', 'Calligraphy Artist'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenPhrases = 2000; // 2 seconds pause before deleting

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            if (charIndex > 0) {
                charIndex--;
                typingText.textContent = currentPhrase.substring(0, charIndex);
                setTimeout(type, deletingSpeed);
            } else {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500); // Small delay before typing next phrase
            }
        } else {
            if (charIndex < currentPhrase.length) {
                charIndex++;
                typingText.textContent = currentPhrase.substring(0, charIndex);
                setTimeout(type, typingSpeed);
            } else {
                isDeleting = true;
                setTimeout(type, delayBetweenPhrases);
            }
        }
    }

    type();
}

function setupSocialIcons() {
    const heroSocialIcons = document.querySelectorAll('.hero-actions .social-icon');
    heroSocialIcons.forEach((icon) => {
        icon.setAttribute('role', 'link');
    });
}

function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const targetSection = document.querySelector(href);

            if (targetSection) {
                if (targetSection.scrollIntoView) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    const targetPosition = Math.max(targetSection.offsetTop - (window.innerHeight / 2) + (targetSection.clientHeight / 2), 0);
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });
}

function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-item, section');
    const observerOptions = {
       threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
       rootMargin: '50px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
               const ratio = entry.intersectionRatio;
               entry.target.style.opacity = ratio;
               entry.target.classList.add('active');
               entry.target.classList.remove('inactive');
           } else {
                entry.target.classList.remove('active');
                entry.target.classList.add('inactive');
            }
        });
    }, observerOptions);

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}

function initializeRevealClasses() {
    document.querySelectorAll('.skill-tag').forEach((tag) => {
        if (!tag.classList.contains('reveal')) {
            tag.classList.add('reveal-item', 'reveal');
        }
    });

    document.querySelectorAll('.project-card').forEach((card) => {
        if (!card.classList.contains('reveal')) {
            card.classList.add('reveal');
        }
    });

    document.querySelectorAll('.about-content > p').forEach((element) => {
        if (!element.classList.contains('reveal')) {
            element.classList.add('reveal');
        }
    });

    document.querySelectorAll('.section-title').forEach((element) => {
        if (!element.classList.contains('reveal')) {
            element.classList.add('reveal');
        }
    });

    document.querySelectorAll('img').forEach((img) => {
        if (!img.classList.contains('reveal')) {
            img.classList.add('reveal');
        }
    });

    document.querySelectorAll('p').forEach((p) => {
        if (!p.classList.contains('reveal') && !p.closest('.floating-id-card')) {
            p.classList.add('reveal');
        }
    });

    document.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-description').forEach((element) => {
        if (!element.classList.contains('reveal')) {
            element.classList.add('reveal');
        }
    });

    document.querySelectorAll('.about-content h3').forEach((element) => {
        if (!element.classList.contains('reveal')) {
            element.classList.add('reveal');
        }
    });

    document.querySelectorAll('.info-item, .contact-info h3').forEach((element) => {
        if (!element.classList.contains('reveal')) {
            element.classList.add('reveal');
        }
    });

    document.querySelectorAll('.hero-content, .about-image').forEach((element) => {
        element.classList.add('parallax-left');
    });

    document.querySelectorAll('.hero-image, .about-content, .contact-form-wrapper').forEach((element) => {
        element.classList.add('parallax-right');
    });
}

function setupParallaxScroll() {
    function updateParallax() {
        const scrollY = window.scrollY;
        const parallaxStrength = 0.8; // Increased intensity for more visible effect

        document.querySelectorAll('.parallax-left').forEach((element) => {
            const offset = scrollY * parallaxStrength;
            element.style.transform = `translateX(-${offset}px)`;
        });

        document.querySelectorAll('.parallax-right').forEach((element) => {
            const offset = scrollY * parallaxStrength;
            element.style.transform = `translateX(${offset}px)`;
        });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });

    updateParallax();
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitButton = contactForm.querySelector('.submit-button');

            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message || 'Message could not be sent');
                }

                showNotification('Message Successfully Sent', 'success');
                contactForm.reset();
            } catch (error) {
                showNotification('Message failed to send. Please try again.', 'error');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideInRight 0.4s ease;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerHeight = 70;
            const targetPosition = contactSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.blob');

    blobs.forEach((blob, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        blob.style.transform = `translateY(${scrolled * 0.1 * direction}px)`;
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach((img) => imageObserver.observe(img));
}

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent);
    }

    .notification {
        font-size: 0.95rem;
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

function setupNameLetterHover() {
    const els = document.querySelectorAll('.hero-name, .intro-name');
    if (!els || els.length === 0) return;

    els.forEach((el) => {
        const text = el.textContent || '';
        const trimmed = text.replace(/\s+/g, ' ');
        el.textContent = '';

        for (const ch of trimmed) {
            if (ch === ' ') {
                const space = document.createElement('span');
                space.className = 'name-space';
                space.innerHTML = '&nbsp;';
                el.appendChild(space);
            } else {
                const letter = document.createElement('span');
                const glyph = document.createElement('span');
                glyph.textContent = ch;
                letter.className = 'name-letter';
                glyph.className = 'name-letter-glyph';
                letter.appendChild(glyph);
                el.appendChild(letter);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', setupNameLetterHover);

