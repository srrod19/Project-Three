function initMap() {
    const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York City
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: defaultLocation,
        mapTypeId: 'roadmap'
    });

map.addListener("click", (event) => {
    addMarker(event.latLng, map);
});

}