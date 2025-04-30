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