//var socket = io();

var list_id = 0;
var m_index = 0;
var lat_gl = [12.823109, 12.823109, 12.823109];
var lon_gl = [80.041021, 80.041021, 80.041021];

var lat1 = 12.823109;
var lon1 = 80.041021;

/*
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

*/

function raise_ticket() {
    var node = document.createElement("LI");
    node.classList.add("collection-item");
    node.setAttribute("id", x);
    node.innerHTML = "A ticket has been raised for Alert : A1";
    document.getElementById("tbox").appendChild(node);
}

function showMap() {


    var mymap = L.map('mapid').setView([12.823109, 80.041021], 13);


    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGVrbmljdXMiLCJhIjoiY2p0NTB5ZXZyMDFqNzQ5bzZ5ZDBodXViYyJ9.SuiIDJWFCq7kPqdXD9i67w', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    var lati = 12.823109;
    var longi = 80.041021;

    var lati1 = 12.834209;
    var longi1 = 80.052121;

    var lati2 = 12.844309;
    var longi2 = 80.062221;
    var marker = L.marker([lati, longi]).addTo(mymap);
    var marker = L.marker([lati1, longi1]).addTo(mymap);
    var marker = L.marker([lati2, longi2]).addTo(mymap);
}

function findAlerts() {
    fetch('http://localhost:3000/alerts')
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response.
                response.json().then(function(data) {
                    //console.log(data);
                    //console.log("Pothole Detected at " + data.latitude);
                    var datadump = JSON.stringify(data);
                    console.log(datadump);

                    var trim_msg = datadump.substring(35, 90);

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
            }
        )
}
