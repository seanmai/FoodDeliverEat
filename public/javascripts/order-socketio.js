var socket = io.connect("http://localhost:3000");
socket.on("order", function(data){
    // alert(data.name);
    location.reload();
});
