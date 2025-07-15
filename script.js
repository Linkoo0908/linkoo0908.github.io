// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // 언어 전환 기능
    let currentLang = 'ko'; // 기본 언어는 한국어
    const langBtn = document.getElementById('lang-btn');
    const langCurrent = document.querySelector('.lang-current');
    
    // 언어 전환 함수
    function switchLanguage() {
        currentLang = currentLang === 'ko' ? 'en' : 'ko';
        updateTexts();
        updateLangButton();
        localStorage.setItem('language', currentLang);
    }
    
    // 텍스트 업데이트 함수
    function updateTexts() {
        const elements = document.querySelectorAll('[data-ko][data-en]');
        
        elements.forEach(element => {
            // 애니메이션 효과
            element.classList.add('lang-transition');
            
            setTimeout(() => {
                if (currentLang === 'ko') {
                    element.innerHTML = element.getAttribute('data-ko');
                } else {
                    element.innerHTML = element.getAttribute('data-en');
                }
                
                element.classList.remove('lang-transition');
                element.classList.add('active');
                
                setTimeout(() => {
                    element.classList.remove('active');
                }, 300);
            }, 150);
        });
        
        // placeholder 업데이트 (별도로 처리)
        const formElements = document.querySelectorAll('input[data-placeholder-ko][data-placeholder-en], textarea[data-placeholder-ko][data-placeholder-en]');
        formElements.forEach(element => {
            const placeholderAttr = currentLang === 'ko' ? 'data-placeholder-ko' : 'data-placeholder-en';
            element.placeholder = element.getAttribute(placeholderAttr);
        });
        
        // document 언어 속성 업데이트
        document.documentElement.lang = currentLang;
        document.body.setAttribute('data-lang', currentLang);
    }
    
    // 언어 버튼 업데이트
    function updateLangButton() {
        if (currentLang === 'ko') {
            langCurrent.textContent = '한국어';
        } else {
            langCurrent.textContent = 'English';
        }
    }
    
    // 저장된 언어 설정 로드
    function loadLanguage() {
        const savedLang = localStorage.getItem('language');
        if (savedLang && savedLang !== currentLang) {
            currentLang = savedLang;
            updateTexts();
            updateLangButton();
        }
    }
    
    // 이벤트 리스너
    if (langBtn) {
        langBtn.addEventListener('click', switchLanguage);
    }
    
    // 초기 언어 설정 로드
    loadLanguage();

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic meteor animation
    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'dynamic-meteor';
        meteor.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: linear-gradient(45deg, #00bfff, #ff1493);
            border-radius: 50%;
            box-shadow: 0 0 10px #00bfff;
            pointer-events: none;
            z-index: 0;
        `;
        
        const startX = Math.random() * window.innerWidth;
        const startY = -50;
        const endX = startX + (Math.random() * 300 - 150);
        const endY = window.innerHeight + 50;
        
        meteor.style.left = startX + 'px';
        meteor.style.top = startY + 'px';
        
        document.querySelector('.hero-background').appendChild(meteor);
        
        const duration = 2000 + Math.random() * 2000;
        
        meteor.animate([
            { transform: `translate(0, 0)`, opacity: 0 },
            { transform: `translate(0, 50px)`, opacity: 1, offset: 0.1 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        }).addEventListener('finish', () => {
            meteor.remove();
        });
    }

    // Create meteors periodically
    setInterval(createMeteor, 3000);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    const text = 'BLEOR GAMES';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeWriter, 150);
        }
    }

    // Start typing effect after a short delay
    setTimeout(() => {
        heroTitle.textContent = '';
        typeWriter();
    }, 1000);

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                const errorMsg = currentLang === 'ko' ? '모든 필드를 입력해주세요.' : 'Please fill in all fields.';
                showNotification(errorMsg, 'error');
                return;
            }
            
            // Simulate form submission
            const successMsg = currentLang === 'ko' ? '메시지가 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.' : 'Message sent successfully! We will reply as soon as possible.';
            showNotification(successMsg, 'success');
            this.reset();
        });
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(45deg, #39ff14, #00bfff)';
        } else {
            notification.style.background = 'linear-gradient(45deg, #ff4500, #ff1493)';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Intersection Observer for scroll animations
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

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.game-card, .about-text, .about-achievements, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Dynamic background particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: #00bfff;
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
        `;
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        particle.animate([
            { opacity: 0, transform: 'scale(0)' },
            { opacity: 1, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(0)' }
        ], {
            duration: 2000,
            easing: 'ease-in-out'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    }

    // Create particles periodically
    setInterval(createParticle, 2000);

    // Mouse cursor effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function createCursorTrail() {
        if (mouseX > 0 && mouseY > 0) {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #00bfff, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${mouseX - 3}px;
                top: ${mouseY - 3}px;
                opacity: 0.7;
            `;
            
            document.body.appendChild(trail);
            
            trail.animate([
                { opacity: 0.7, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0)' }
            ], {
                duration: 500,
                easing: 'ease-out'
            }).addEventListener('finish', () => {
                trail.remove();
            });
        }
    }

    // Create cursor trail
    setInterval(createCursorTrail, 50);

    // 모바일 메뉴 토글 기능
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    function toggleMobileMenu() {
        navMenu.classList.toggle('mobile-active');
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // 화면 크기에 따른 메뉴 표시 조정
    function handleResize() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            navMenu.style.display = navMenu.classList.contains('mobile-active') ? 'flex' : 'none';
        } else {
            mobileMenuToggle.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.classList.remove('mobile-active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 실행
    
    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('mobile-active');
            }
        });
    });
});
