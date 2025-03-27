document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.loader').classList.add('fade-out');
    }, 1500);
    
    setTimeout(function() {
        document.querySelector('.loader').style.display = 'none';
    }, 2000);
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        menuToggle.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simple validation
            if (emailInput.value && emailInput.value.includes('@')) {
                alert('Obrigado por assinar nossa newsletter!');
                emailInput.value = '';
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }
    
    // Slider functionality
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (sliderContainer && slides.length > 0) {
        let currentSlide = 0;
        const slideWidth = slides[0].clientWidth;
        
        function goToSlide(index) {
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            
            currentSlide = index;
            sliderContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
        
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        // Auto slide
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Button controls
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 5000);
            } else if (e.key === 'ArrowLeft') {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 5000);
            }
        });
        
        // Responsive adjustments
        window.addEventListener('resize', () => {
            sliderContainer.style.transform = `translateX(-${currentSlide * slides[0].clientWidth}px)`;
        });
    }
    
    // Initialize tilt effect on pop items
    if (typeof VanillaTilt !== 'undefined') {
        const popItems = document.querySelectorAll('.pop-item');
        popItems.forEach(item => {
            VanillaTilt.init(item, {
                max: 15,
                speed: 400,
                glare: true,
                'max-glare': 0.2,
            });
        });
    }
    
    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.curiosity-card, .fact-card, .info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    const cards = document.querySelectorAll('.curiosity-card, .fact-card, .info-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});