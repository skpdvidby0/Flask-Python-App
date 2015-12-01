//alert("call1");
var image1 = '../static/js/truckoff.png';
var image2 = '../static/js/truckon.png';
var map;
var gvlaue=0;
var gindex=0;
var obj3=[];
var obj4=[];
var obj5=[];
var obj6=[];
var obj7=[];
var obj8=[];
var obj9=[];
var obj10=[];
var obj11=[];
var udist;
var udist1;
var udist2;
var udist3;
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('bk3').value;
  alert(address);
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      /*var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });*/
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('bk3').value,
    destination: document.getElementById('bk4').value,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function init3() {
    

    map = new google.maps.Map(document.getElementById('map1'), {
    center: {lat: 40.731, lng: -73.997},
    zoom: 12
  });
   var geocoder = new google.maps.Geocoder();
   var directionsService = new google.maps.DirectionsService;
   var directionsDisplay = new google.maps.DirectionsRenderer;
 
   geocodeAddress(geocoder, map);
   directionsDisplay.setMap(map);
   calculateAndDisplayRoute(directionsService, directionsDisplay);
   calcdist1(document.getElementById('bk3').value,document.getElementById('bk4').value);
   console.log(udist+'udist'); 
   
 
}
$(document).ready(function() {
 
        $.ajax({
            url: '/driverdisplay',
            type: 'GET',
            success: function(res) {
                //alert("ok",res,"notok");
                var obj = JSON.parse(res);
                //alert(obj.display);
                //console.log(obj);
                
                //document.getElementById('bk5').value=obj[0][3];
                console.log(obj);
                // conosle.log("ok",obj.display);
                console.log(res);
                 // var map = new google.maps.Map(document.getElementById('map'), {
                 //   zoom : 8,
                 //   center :pos 
                 // });
                //map.setCenter(pos);

                for (var k = 0; k < obj.length; k++) {

                var markers = new google.maps.Marker({
                position : new google.maps.LatLng(obj[k][1], obj[k][2]),
                map : map,
                icon : image1                 });
                //alert(obj[k][1]);
                obj9[k]=obj[k][1];
                obj10[k]=obj[k][2];
                var position1 = new google.maps.LatLng(obj[k][1], obj[k][2]);
                var position2 = document.getElementById('bk3').value;
                
                obj3 = calcdist(position1,position2,k,obj[k][3],obj[k][4],obj[k][5]);
                //alert(dist+'dist');
                }
                     
                //alert("notok");
                //for each (var row in obj){alert(row); }

            },
            error: function(error) {
                console.log(error);
            }
        });
    });



function calcdist(addr1,addr2,j,driver_id,driver_name,driver_status){

var geocoder = new google.maps.Geocoder;

  var service = new google.maps.DistanceMatrixService;
  var obj1=0;
  var obj2=0;
  var obj2=[];
  service.getDistanceMatrix({
    origins: [addr1],
    destinations: [addr2],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      

      


        var results = response.rows[0].elements;
        
             
          
             
             obj1= results[0].distance.text; 
             obj4[j]=obj1;
             obj2 =results[0].duration.text; 
             obj5[j]=obj2;  
             obj6[j]=driver_id;
             obj7[j]=driver_name;
             obj8[j]=driver_status;
             
    }
  });


   
   return obj1;
}

function getdriver(){

  for(var t=0;t<obj4.length;t++){
   obj11[t]=obj4[t];
   obj4[t] = obj4[t].replace(/[^0-9\\.]+/ig,'');
//alert(obj4[t]);
  }

//alert(obj3+'third');
//alert(obj4+'fourth'+obj5+obj6);
alert(obj7);

var index = 0;
var value = obj4[0];
for (var i = 1; i < obj4.length; i++) {
  if (obj4[i] < value) {
    value = obj4[i];
    index = i;
  }
}
gvalue=value;
gindex=index;
document.getElementById('tab2').style.display = 'block';
document.getElementById('id1').innerHTML=obj6[gindex];
document.getElementById('name1').innerHTML=obj7[gindex];
document.getElementById('eta').innerHTML=obj11[gindex];
document.getElementById('dist1').innerHTML=obj5[gindex];
//var ex1= document.getElementById('eta').innerHTML;
console.log(obj9[gindex]+obj10[gindex]);
//alert(obj9[gindex]+obj10[gindex]+'lat');
var markers = new google.maps.Marker({
                position : new google.maps.LatLng(obj9[gindex], obj10[gindex]),
                map : map,
                icon : image2                 });
    
                

alert(value+'key'+index+obj7[index]);

          var source12 =document.getElementById('bk3').value;
          var dest12= document.getElementById('bk4').value;
          var did=document.getElementById('id1').innerHTML;
          var dname=document.getElementById('name1').innerHTML;
          var eta1=document.getElementById('eta').innerHTML;
          var fare1=document.getElementById('id3').innerHTML;
          
        document.getElementById('in1').value=source12;
        document.getElementById('in2').value=dest12;
        document.getElementById('in3').value=did;
        document.getElementById('in4').value=dname;
        document.getElementById('in5').value=eta1;
        document.getElementById('in6').value=fare1;




}

function booktruck1(){
var htmlstring = document.getElementById('id1').innerHTML;
htmlstring = (htmlstring.trim) ? htmlstring.trim() : htmlstring.replace(/^\s+/,'');
if(htmlstring == ''){
  alert('Select Driver first!');
      
    }
    else{
        
           
  $(function(){
    
    $.ajax({
      url: '/bookdata',
      data: $('form').serialize(),
      type: 'POST','GET',
      success: function(response){
        console.log(response);
      },
      error: function(error){
        console.log(error);
      }
    });
  });

}
}

function calcdist1(addr1,addr2){

var geocoder = new google.maps.Geocoder;

  var service = new google.maps.DistanceMatrixService;
  
  service.getDistanceMatrix({
    origins: [addr1],
    destinations: [addr2],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      

      


        var results = response.rows[0].elements;
        
             
          
             
             udist1= results[0].distance.text; 
             udist3=udist1;
             udist3 = udist3.replace(/[^0-9\\.]+/ig,'');
             udist2=8*udist3;
             document.getElementById('id2').innerHTML=udist1;
             document.getElementById('id3').innerHTML=udist2;
             
             
    }
  });


   
   
}
