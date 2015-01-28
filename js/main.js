document.addEventListener("DOMContentLoaded", function () {
    var h1 = document.createElement('h1');
    h1.innerHTML = "GeoLocation";
    document.body.appendChild(h1);

    if (navigator.geolocation) {
        var params = {
            enableHighAccuracy: true,
            timeout: 3500,
            maximumAge: 60000
        };
        navigator.geolocation.getCurrentPosition(reportPosition, gpsError, params);
    } else {
        alert("Sorry, but your browser does not support location based awesomeness.")
    }

});

function reportPosition(position) {
    var output = document.createElement('div');
    output.id = "output";
    var canvas = document.createElement('canvas');
    canvas.id = "myCanvas";
    canvas.width = 400;
    canvas.height = 400;

    var context = canvas.getContext('2d');
    var imageObj = new Image();

    var latitude = position.coords.latitude
    var longitude = position.coords.longitude

    imageObj.onload = function () {
        context.drawImage(imageObj, 0, 0);
    };
    imageObj.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zoom=14&size=400x400&markers=color:blue%7Clabel:S%' + latitude + ',' + longitude;

    function timeStamp() {
        var date = new Date(position.timestamp);
        return date;
    }

    output.innerHTML += "Latitude: " + position.coords.latitude + "&deg;<br/>" + "Longitude: " + position.coords.longitude + "&deg;<br/>" + "Accuracy: " + position.coords.accuracy + "m<br/>" + timeStamp() + "<br/>";
    output.appendChild(canvas)
    document.body.appendChild(output);

};

function gpsError(error) {
    var errorOutput = document.createElement('div');
    var errorBackground = document.createElement('div');
    errorOutput.id = "errorOutput";
    errorBackground.id = "errorBackground";

    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    errorOutput.innerHTML += "Error: <br/>" + errors[error.code] + "<br/>";
    document.body.appendChild(errorBackground);
    document.body.appendChild(errorOutput);
};