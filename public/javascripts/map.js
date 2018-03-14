nav = navigator.geolocation;
nav.getCurrentPosition(success, failure);

function success(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
}

function failure(){
    alert("Could not get location.");
}
