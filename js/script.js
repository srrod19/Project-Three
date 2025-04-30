/*Google Maps*/
function initMap() {
    const defaultLocation = { lat: 41.831296, lng: -87.627266 }; 
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: defaultLocation,
        mapTypeId: 'roadmap'
    });

    new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: "Google Maps"
    });

    map.addListener("click", (event) => {
    addMarker(event.latLng, map);
    });

    const infoWindow = new google.maps.InfoWindow({
        content: '<h3>IIT Mies Campus</h3><p>Chicago, Illinois</p>'
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

/*Slider for images*/

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots-container');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function nextSlide() {
        goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
    }
    
    function goToSlide(slideIndex) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = slideIndex;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    let slideInterval = setInterval(nextSlide, 5000);
    
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
});

/*Slider for videos on skills page*/
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.video-slider');
    const slides = document.querySelectorAll('.video-slide');
    const prevBtn = document.querySelector('.video-prev-btn');
    const nextBtn = document.querySelector('.video-next-btn');
    const dotsContainer = document.querySelector('.video-dots-container');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    
    // Initialize all videos
    function initVideos() {
        slides.forEach((slide, index) => {
            const video = slide.querySelector('video');
            const playPauseBtn = slide.querySelector('.play-pause-btn');
            const muteBtn = slide.querySelector('.mute-btn');
            
            // Set video attributes
            video.muted = true;
            video.loop = true;
            
            // Play/Pause button functionality
            playPauseBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playPauseBtn.textContent = '⏸';
                } else {
                    video.pause();
                    playPauseBtn.textContent = '▶';
                }
            });
            
            // Mute button functionality
            muteBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                muteBtn.textContent = video.muted ? '🔊' : '🔇';
            });
            
            // Play video when slide becomes active
            if (index === currentSlide) {
                video.play().catch(e => console.log("Autoplay prevented:", e));
            }
        });
    }
    
    // Create dots for navigation
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('video-dot');
            if (index === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        // Pause current video
        const currentVideo = slides[currentSlide].querySelector('video');
        currentVideo.pause();
        slides[currentSlide].querySelector('.play-pause-btn').textContent = '▶';
        
        // Update current slide
        currentSlide = (slideIndex + totalSlides) % totalSlides;
        
        // Play new video
        const newVideo = slides[currentSlide].querySelector('video');
        newVideo.play().catch(e => console.log("Autoplay prevented:", e));
        slides[currentSlide].querySelector('.play-pause-btn').textContent = '⏸';
        
        updateSlider();
    }
    
    // Update slider display
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Update dots
        const dots = document.querySelectorAll('.video-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto-advance slides
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 10000); // Change every 10 seconds
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        startAutoSlide(); // Reset timer on manual navigation
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        startAutoSlide(); // Reset timer on manual navigation
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
            startAutoSlide();
        }
        if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
            startAutoSlide();
        }
    });
    
    // Initialize everything
    initVideos();
    createDots();
    startAutoSlide();
    
    // Pause auto-advance when hovering
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
});