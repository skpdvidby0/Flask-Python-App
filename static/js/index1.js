var pos;
var cos;
var map;
var image = '../static/js/truckoff.png';
//var markers;
function init1() {

    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.731, lng: -73.997},
    zoom: 12
  });
}
 function init2(){   
  
  if (navigator.geolocation) {
     var infoWindow = new google.maps.InfoWindow({map: map}); 
    navigator.geolocation.getCurrentPosition(function(position) {
       pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      alert(pos);
      //alert(position.coords.longitude);
      //var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
      infoWindow.setPosition(pos);
      map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 12
  });
       // infoWindow.setContent('Your Location');
       
      var marker1 = new google.maps.Marker({
                position : new google.maps.LatLng(pos),
                map : map,
                icon : image,
                  });
      map.setCenter(pos);
      document.getElementById('r3').innerHTML=pos;
      var geocoder = new google.maps.Geocoder;
      var infowindow1 = new google.maps.InfoWindow;
      //alert('2')
      geocodeLatLng(geocoder,map,infowindow1);
      //alert('5');
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
//document.getElementById("start").innerHTML=pos;
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
//convert latlong to address


function geocodeLatLng(geocoder, map, infowindow1) {
  
    
     
     /*document.getElementById('r1').style.display = 'inline';
     document.getElementById('r1').style.width = '300px';
     document.getElementById('r1').style.height = '100px'*/
       
    geocoder.geocode({'location':pos}, function(results, status) {
      
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        alert(results[1].formatted_address+'addressis');
        //document.getElementById('r2').innerHTML=results[1].formatted_address;
          document.getElementById('r2').value=results[1].formatted_address; 
          
            cos=results[1].formatted_address;
            alert(cos);
        /*map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow1.setContent(results[1].formatted_address);
        infowindow1.open(map, marker);*/
        //alert(results[1]);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

//render booking page
$(function(){
  $('#bt5').click(function(){
    
    $.ajax({
      url: '/bookdriver',
      data: $('form').serialize(),
      type: 'POST',
      success: function(response){
        console.log(response);
      },
      error: function(error){
        console.log(error);
      }
    });
  });
});

//show drivers around
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

function a1(){
  alert(cos+'1stjs');
  return cos;
}



