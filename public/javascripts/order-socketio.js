var socket = io();
socket.on("order", function(data){
    // alert(data.name);
    location.reload();
});
