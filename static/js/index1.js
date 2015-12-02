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
      
      infoWindow.setPosition(pos);
      map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 12
  });
       
       
      var marker1 = new google.maps.Marker({
                position : new google.maps.LatLng(pos),
                map : map,
                icon : image,
                  });
      map.setCenter(pos);
      document.getElementById('r3').innerHTML=pos;
      var geocoder = new google.maps.Geocoder;
      var infowindow1 = new google.maps.InfoWindow;
      
      geocodeLatLng(geocoder,map,infowindow1);
      
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

  

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
        
          document.getElementById('r2').value=results[1].formatted_address; 
          
            cos=results[1].formatted_address;
            
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
                
                var obj = JSON.parse(res);
                
                console.log(res);
                 
                map.setCenter(pos);
                for (var k = 0; k < obj.length; k++) {
                
                var markers = new google.maps.Marker({
                position : new google.maps.LatLng(obj[k][1], obj[k][2]),
                map : map,
                icon : image                 });
    
                }
                     
                

            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});

function a1(){
  
  return cos;
}



