var mymap = L.map('mapid').setView([51.505, -0.09], 13)


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//   maxZoom: 18,
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//         '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//         'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   id: 'mapbox/streets-v11',
//   tileSize: 512,
//   zoomOffset: -1
// }).addTo(mymap)

$.getJSON('./data/events.json', function (events) {
  console.log('events', events)
  var group
  var markers = []
  events.forEach(event => {
    var marker = L.marker([event.latitude, event.longitude])
      .addTo(mymap)
      .bindPopup('<b>' + event.title + '</b><br /><b>When</b>: ' + event.date + "<br/><a href='" + event.link + "' target='_blank'>Link</a>")
    // .openPopup();
    markers.push(marker)
  })

  // eslint-disable-next-line new-cap
  group = new L.featureGroup(markers)
  mymap.fitBounds(group.getBounds())
})
