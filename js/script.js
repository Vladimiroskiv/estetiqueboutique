document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector(".menu-btn");
    const navigation = document.querySelector(".navigation");

    // Toggle for menu button and navigation
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        navigation.classList.toggle("active");
    });

    // Elements for slider functionality
    const btns = document.querySelectorAll(".nav-btn");
    const slides = document.querySelectorAll(".video-slide");
    const contents = document.querySelectorAll(".content");

    // Function to change the active element on slider
    function sliderNav(manual) {
        btns.forEach((btn) => {
            btn.classList.remove("active");
        });

        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        contents.forEach((content) => {
            content.classList.remove("active");
        });

        btns[manual].classList.add("active");
        slides[manual].classList.add("active");
        contents[manual].classList.add("active");
    }

    // Event listeners for slider navigation buttons
    btns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            sliderNav(i);
        });
    });

    // Cookie consent logic
    document.getElementById('cookieConsentButton').addEventListener('click', function () {
        document.getElementById('cookieConsentContainer').style.display = 'none';
        localStorage.setItem('cookieConsent', 'true');
    });

    if (localStorage.getItem('cookieConsent') === 'true') {
        document.getElementById('cookieConsentContainer').style.display = 'none';
    } else {
        document.getElementById('cookieConsentContainer').style.display = 'block';
    }

    // Swipe functionality for slides
    let startX, startY, dist, threshold = 150, allowedTime = 200, elapsedTime, startTime;

    slides.forEach((slide, index) => {
        slide.addEventListener('touchstart', function (e) {
            const touchObj = e.changedTouches[0];
            startX = touchObj.pageX;
            startY = touchObj.pageY;
            startTime = new Date().getTime(); 
            e.preventDefault();
        }, false);
    
        slide.addEventListener('touchend', function (e) {
            const touchObj = e.changedTouches[0];
            dist = touchObj.pageX - startX;
            elapsedTime = new Date().getTime() - startTime; 
            if (elapsedTime <= allowedTime) { 
                if (Math.abs(dist) >= threshold) {
                    let swipeDirection = dist < 0 ? 'next' : 'prev'; /
                    updateSlider(index, swipeDirection);
                }
            }
            e.preventDefault();
        }, false);
    });

    // Toggle display for team member information
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        member.addEventListener('click', () => {
            const info = member.querySelector('.member-info');
            info.style.display = info.style.display === 'block' ? 'none' : 'block';
        });
    });
});