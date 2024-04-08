document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector(".menu-btn");
    const navigation = document.querySelector(".navigation");

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        navigation.classList.toggle("active");
    });

    const btns = document.querySelectorAll(".nav-btn");
    const slides = document.querySelectorAll(".video-slide");
    const contents = document.querySelectorAll(".content");

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

    btns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            sliderNav(i);
        });
    });

    document.getElementById('cookieConsentButton').addEventListener('click', function() {
        document.getElementById('cookieConsentContainer').style.display = 'none';
        localStorage.setItem('cookieConsent', 'true');
    });

    if(localStorage.getItem('cookieConsent') === 'true'){
        document.getElementById('cookieConsentContainer').style.display = 'none';
    } else {
        document.getElementById('cookieConsentContainer').style.display = 'block';
    }

 
    let startX, startY, dist, threshold = 150, 
        allowedTime = 200, 
        elapsedTime, startTime;

    slides.forEach(slide => {
        slide.addEventListener('touchstart', function(e){
            const touchObj = e.changedTouches[0];
            dist = 0;
            startX = touchObj.pageX;
            startY = touchObj.pageY;
            startTime = new Date().getTime(); 
            e.preventDefault();
        }, false);

        slide.addEventListener('touchmove', function(e){
            e.preventDefault();
        }, false);

        slide.addEventListener('touchend', function(e){
            const touchObj = e.changedTouches[0];
            dist = touchObj.pageX - startX; 
            elapsedTime = new Date().getTime() - startTime; 
            if (elapsedTime <= allowedTime){ 
                let swipeIndex = slides.length;
                if (Math.abs(dist) >= threshold){
                    swipeIndex = dist < 0 ? 1 : -1;
                }
                let currentIndex = Array.from(slides).indexOf(document.querySelector('.video-slide.active'));
                let newIndex = currentIndex + swipeIndex;
                if (newIndex < 0) newIndex = slides.length - 1;
                else newIndex = newIndex % slides.length; 
                sliderNav(newIndex);
            }
            e.preventDefault();
        }, false);
    });
});
