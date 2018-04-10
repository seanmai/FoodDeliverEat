var socket = io.connect("https://shielded-earth-87392.herokuapp.com/");
socket.on("order", function(data){
    // alert(data.name);
    location.reload();
});
