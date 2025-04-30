function initMap() {
    const defaultLocation = { lat: 42.765128, lng: -86.107200 }; 
    
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