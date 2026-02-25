document.addEventListener('DOMContentLoaded', function() {
    // 1. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });

    // 3. Animated counter for stats
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // 4. Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.feature-card, .alt-card').forEach(card => {
        observer.observe(card);
    });

    // 5. Button hover effects with ripple
    const buttons = document.querySelectorAll('.cta-button, .download-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 6. Floating animation for feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        icon.style.animation = `float ${3 + index * 0.3}s ease-in-out infinite`;
    });

    // 7. Mouse tracking effect for cards
    const cards = document.querySelectorAll('.feature-card, .alt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 8. Download button functionality with animation
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const store = this.textContent.includes('Google Play') 
                ? 'Google Play Store' 
                : 'Chrome Web Store';
            
            // Add loading animation
            const originalText = this.textContent;
            this.textContent = '⏳ Opening...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                alert(`Redirecting to ${store}...\nNote: In production, this would open the actual store link.`);
            }, 1500);
        });
    });

    // 9. CTA button scroll animation
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 10. Navbar active link indicator
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 11. Stagger animation for feature cards on page load
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
    });

    // 12. Text reveal animation on scroll
    const textElements = document.querySelectorAll('h2, h3, p');
    textElements.forEach(element => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-reveal');
                }
            });
        }, { threshold: 0.1 });
        observer.observe(element);
    });

    // 13. Create animated background particles
    function createParticles() {
        const particlesContainer = document.querySelector('.hero');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // 14. Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 15. Smooth animation for section transitions
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.animation = 'fadeInDown 0.8s ease-out forwards';
    });

    console.log('📅 Updated: 2026-02-25 20:09:24 UTC');
    console.log('🎨 Welcome to Ibis Paint X for Chromebook!');
    console.log('✨ Interactive animations loaded!');
});