var socket = io();
var list_id = 0;


socket.on('alerts', function(msg) {

    console.log('message: ' + msg);
    var trim_msg = msg.substring(0, 50);

    list_id++;
    var a = list_id.toString();
    x = 'list_item_' + a;
    y = 'list_btn_' + a;
    console.log('a= ' + a);


    var node = document.createElement("LI");
    node.classList.add("collection-item");
    node.setAttribute("id", x);


    node.innerHTML = trim_msg + "<span class=\"new badge\" data-badge-caption=\"Raise Ticket\" id=" + y + " onclick=\"raise_ticket(id)\"/>"
    document.getElementById("abox").appendChild(node);

});


socket.on('r_tickets', function(msg) {

    console.log('message: ' + msg);
    var trim_msg = msg.substring(0, 50);

    var node = document.createElement("LI");
    node.classList.add("collection-item");
    node.setAttribute("id", x);


    node.innerHTML = trim_msg;
    document.getElementById("tbox").appendChild(node);

});



function raise_ticket(rem_id) {

    var name = document.getElementById(rem_item).textContent;
    var t_id = name.substring(0, 4);
    socket.emit('tickets', t_id);
}
