// Current location API.
let x = document.getElementById("demo");

function reloadPage() {
    location.reload();
}

// API used for tracking the IP Address
function mapUpdate() {
    let newIP = document.getElementById('ip_address').value;
    let ip = newIP;
    let api_key = "at_IbJxZ5zsWtAQjGEY0fiJnGkZgxfBa";
    let jsObject = {};
    let lat = '';
    let long = '';
    let region;
    let postal;
    let time;
    let city;
    let provider;

    $(function () {
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: {
                apiKey: api_key,
                ipAddress: ip
            },
            success: function (data) {
                jsObject = data;
                lat = jsObject.location.lat;
                long = jsObject.location.lng;
                region = jsObject.location.region;
                city = jsObject.location.city;
                provider = jsObject.location.isp;
                postal = jsObject.location.postalCode;
                time = jsObject.location.timezone;
                provider = jsObject.isp;

                document.getElementById('tag_ip').innerHTML = newIP;
                document.getElementById('tag_region').innerHTML = city + ", " + region + ' ' + postal;
                document.getElementById('tag_time').innerHTML = 'UTC: ' + time;
                document.getElementById('tag_isp').innerHTML = provider;

                let map = L.map('demo').setView([lat, long], 12);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                L.marker([lat, long]).addTo(map)
                    .bindPopup('Current Location' + `</br>` + 'Latitude = ' + lat + `</br>` + 'Longitude = ' + long)
                    .openPopup();
            }
        });
    });
};

let date = new Date();
let year = date.getFullYear();

document.getElementById("date").innerHTML = year + `</br>`;

let modified = document.lastModified;

document.getElementById("update").innerHTML = modified;