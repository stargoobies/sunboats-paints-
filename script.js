// Smooth scrolling for navigation links
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

// Download button functionality
const downloadButtons = document.querySelectorAll('.download-btn');
downloadButtons.forEach(button => {
    button.addEventListener('click', function() {
        const store = this.textContent.includes('Google Play') 
            ? 'Google Play Store' 
            : 'Chrome Web Store';
        alert(`Redirecting to ${store}...\nNote: In production, this would open the actual store link.`);
    });
});

// CTA button functionality
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', function() {
    document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
});

// Add animation on scroll
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

// Observe cards for animation
document.querySelectorAll('.feature-card, .alt-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Mobile menu toggle (optional enhancement)
console.log('🎨 Welcome to Ibis Paint X for Chromebook!');
console.log('Create stunning digital art on your Chromebook with ease.');
