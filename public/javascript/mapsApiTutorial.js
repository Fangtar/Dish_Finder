var map;
var service;
var infowindow;

let test = {{{json results}}};
console.log(test);

function initMap(){
    var mapCenter = new google.maps.LatLng(37.7845,-122.4077);
    console.log(mapCenter);

    map = new google.maps.Map(document.getElementById("map"), {
        center: mapCenter,
        // center: {lat: 37.7845, lng: -122.4077},
        zoom: 15
    });

    var request = {
        location: mapCenter,
        radius: '500',
        query: 'burrito',
        // fields: ['formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK){
        for (let i = 0; i < results.length; i++){
            let place = results[i];
            // console.log(place);
            // createMarkers(results[i])
            var marker = new google.maps.Marker({
              map: map,
              // icon: image,
              title: place.name,
              position: place.geometry.location
            });
            marker.addListener('click', function(){
                let infowindow = new google.maps.InfoWindow({
                    content: place.formatted_address
                });
                infowindow.open(map, this);
            })
        }
    }
}
//
// function createMarkers(places) {
//   var bounds = new google.maps.LatLngBounds();
//   var placesList = document.getElementById('places');
//
//   for (var i = 0, place; place = places[i]; i++) {
//     var image = {
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(25, 25)
//     };
//
//     var marker = new google.maps.Marker({
//       map: map,
//       icon: image,
//       title: place.name,
//       position: place.geometry.location
//     });
//
//     var li = document.createElement('li');
//     li.textContent = place.name;
//     placesList.appendChild(li);
//
//     bounds.extend(place.geometry.location);
//   }
//   map.fitBounds(bounds);
// }
