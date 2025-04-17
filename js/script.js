var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.830131 , lng: -87.627107 },
        zoom: 8
    })
}