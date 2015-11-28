var pos;
var map;
var image = '../static/js/truck1.png';
//var markers;
function init1() {

    map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 12
  });
  if (navigator.geolocation) {
     var infoWindow = new google.maps.InfoWindow({map: map}); 
    navigator.geolocation.getCurrentPosition(function(position) {
       pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      infoWindow.setPosition(pos);
        
       // infoWindow.setContent('Your Location');
      var marker1 = new google.maps.Marker({
                position : new google.maps.LatLng(pos),
                map : map,
                icon : image,
                infoWindow:{content:"<b>Your Location</b><br><../static/js/truck1.png>"}  });
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
  /*google.maps.event.addListener(markers,'click',function() {
  map.setZoom(9);
  alert(marker.getPosition());
  map.setCenter(markers.getPosition());
  });*/

  // Try HTML5 geolocation.
  

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}


$(function() {
    $('#showdriver').click(function() {
 
        $.ajax({
            url: '/driverdisplay',
            type: 'GET',
            success: function(res) {
                //alert("ok",res,"notok");
                var obj = JSON.parse(res);
                //alert(obj.display);
                //console.log(obj);
                alert(obj);
                // conosle.log("ok",obj.display);
                console.log(res);
                 // var map = new google.maps.Map(document.getElementById('map'), {
                 //   zoom : 8,
                 //   center :pos 
                 // });
                map.setCenter(pos);
                for (var k = 0; k < obj.length; k++) {
                alert(obj[k][1]);
                var markers = new google.maps.Marker({
                position : new google.maps.LatLng(obj[k][1], obj[k][2]),
                map : map,
                icon : image                 });
    
                }
                     
                //alert("notok");
                //for each (var row in obj){alert(row); }

            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});







