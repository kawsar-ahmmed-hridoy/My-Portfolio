document.addEventListener('DOMContentLoaded', function() {

    const navToggle = document.getElementById('nav_toggle');
    const navMenu = document.getElementById('nav_menu');
    const navLinks = document.querySelectorAll('.nav_link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const homeLogo = document.querySelector('.nav_logo a');
    if (homeLogo) {
        homeLogo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    const contactBtns = document.querySelectorAll('.contact_btn');
    contactBtns.forEach(btn => {
        if (btn.getAttribute('href') === '#contact') {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
    
    const sections = document.querySelectorAll('div[id]');
    const navbar = document.getElementById('navbar');
    
    function highlightNavigation() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink && correspondingNavLink.classList.contains('nav_link')) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', debounce(highlightNavigation, 10));
    
    class TypeWriter {
        constructor(element, words, wait = 3000) {
            this.element = element;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }
        
        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];
            
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            
            this.element.innerHTML = this.txt;
            
            let typeSpeed = 150;
            
            if (this.isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }
            
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    
    const subtitleElement = document.querySelector('.subtitle');
    if (subtitleElement) {
        const roles = [
            'Software Engineering Student at SUST',
            'Problem Solver & Developer',
            'Future Software Engineer'
        ];
        new TypeWriter(subtitleElement, roles, 2500);
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    const animateElements = [
        '.project_card',
        '.achievement_card',
        '.judge_card',
        '.skill_card',
        '.language_card',
        '.edu_box',
        '.stat_item'
    ];
    
    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
    
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat_number');
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            
            if (!isNaN(text.replace('+', ''))) {
                const target = parseInt(text.replace('+', ''));
                const increment = target / 50;
                let count = 0;
                
                const updateCounter = () => {
                    if (count < target) {
                        count += increment;
                        stat.textContent = Math.ceil(count) + (text.includes('+') ? '+' : '');
                        setTimeout(updateCounter, 40);
                    } else {
                        stat.textContent = text;
                    }
                };
                
                updateCounter();
            }
        });
    }
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        aboutObserver.observe(aboutSection);
    }
    
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            const name = formObject.name || '';
            const fromEmail = formObject.email || '';
            const message = formObject.message || '';

            const subject = encodeURIComponent(name);
            const body = encodeURIComponent(`From: ${fromEmail}\n\n${message}`);
            const mailtoLink = `mailto:kawsarhridoy0146@gmail.com?subject=${subject}&body=${body}`;

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                window.location.href = mailtoLink;

                showNotification('Thank you! Your message has been prepared in your email client.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
    
    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            hideNotification(notification);
        });
        
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        function hideNotification(notif) {
            notif.classList.remove('show');
            setTimeout(() => {
                if (notif.parentNode) {
                    notif.parentNode.removeChild(notif);
                }
            }, 300);
        }
    }
    
    let scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn);
    }
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
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
    
    const skillCards = document.querySelectorAll('.skill_card, .language_card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const projectCards = document.querySelectorAll('.project_card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    const achievementCards = document.querySelectorAll('.achievement_card');
    achievementCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    const socialIcons = document.querySelectorAll('.social_icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const homeSection = document.getElementById('home');
    if (homeSection) {
        window.addEventListener('scroll', debounce(function() {
            const scrolled = window.pageYOffset;
            const parallax = homeSection.querySelector('.home_image');
            if (parallax && scrolled < window.innerHeight) {
                parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, 10));
    }
    
    const formInputs = document.querySelectorAll('.contact input, .contact textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    const lazyImages = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
    
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.href;
            e.preventDefault();
            setTimeout(() => {
                window.open(href, '_blank', 'noopener,noreferrer');
            }, 100);
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        
        if (e.key === 'Enter' && document.activeElement.classList.contains('nav_link')) {
            document.activeElement.click();
        }
    });
    
});


function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function scrollToElement(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


if (!document.getElementById('portfolio-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'portfolio-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}