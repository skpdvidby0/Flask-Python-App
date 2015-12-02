var image = '../static/js/truckoff.png';
var pos;
var cos;
var map;
var lat1;
var lat2;
var h1=0;
var h2;
var h3=0;
var h4;
var h5;
var h6;
var h7;
var h8;
function init4() {

    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.731, lng: -73.997},
    zoom: 12
  });
}

function init5(){   
   document.getElementById('bt19').style.display = 'block';
  if (navigator.geolocation) {
     var infoWindow = new google.maps.InfoWindow({map: map}); 
    navigator.geolocation.getCurrentPosition(function(position) {
       pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
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
      //document.getElementById('r3').innerHTML=pos;
      var geocoder = new google.maps.Geocoder;
      var infowindow1 = new google.maps.InfoWindow;
      
      geocodeLatLng(geocoder,map,infowindow1);
      
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
        
          h3=results[1].formatted_address;
          document.getElementById('r2').innerHTML=results[1].formatted_address;
          document.getElementById('tab6').style.display = 'block';
          
            cos=results[1].formatted_address;
            
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });

   

  $(function(){
    $('#bt19').click(function(){
    $.ajax({
      url: '/bookloc',
      
      type: 'GET',
      success: function(response){
        console.log(response);
        var obj = JSON.parse(response);
        var user1=document.getElementById('rk3').value;
        //alert(user1);
        //alert(obj[4][5]);
        for (var k = 0; k < obj.length; k++) {
            if(obj[k][5]==user1){
               h1=obj[k][2];
               h2=obj[k][3];
            }

        }
        
        
        
        if(h1==0)
        {
          alert("No booking under your name");
        }
        else{
        document.getElementById('ir1').innerHTML=h1;
        document.getElementById('ir2').innerHTML=h2;
        document.getElementById('tab5').style.display = 'block';
        }
      
      },
      error: function(error){
        console.log(error);
      }
    });
  });
});






















}
