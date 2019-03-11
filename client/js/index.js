var socket = io();


socket.on('new-song', function(msg) {

        console.log('message: ' + msg);
	
	var trim_msg = msg.substring(0, 50);

	var node = document.createElement("LI");   
	node.classList.add("collection-item");

	node.innerHTML = trim_msg + "<span class=\"new badge\" data-badge-caption=\"remove\" onclick=\"savelink()\"/>"                     
	document.getElementById("sbox").appendChild(node);



});


function savelink() {

    var link = document.getElementById("link-input").value;
    console.log(link);
    socket.emit('vid-link', link);
    document.getElementById("link-input").value = "";
}

function dwd() {

    console.log("Sending Download Trigger");
    socket.emit('download', "download");
    document.getElementById("link-input").value = "The Videos are now downloading...";
}
