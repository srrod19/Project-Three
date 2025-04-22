function map() {
    const loc = {lat:41, lng:-87};
  
    const maps = new google.maps.Map(document.getElementById("map"), {
      zoom:5,
      center:loc,
      zoomControl: true,
      mapTypeId:'roadmap',
    });
}