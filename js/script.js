var mymap = L.map('mapid').setView([51.505, -0.09], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap)

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
