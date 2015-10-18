// If support = 0, the browser supports geolocation.
var support = 0

// Checking out if the browser supports geolocation
if (!"geolocation" in navigator) {
  support = 1;
  $('#ownWeather').hide();
  alert("Your browser doesn't support Geolocation. Upgrade it, or change it to Firefox/Chrome.");
}

// Using simpleweatherJS to get the job done w/ jQuery.
$(document).ready(function() {
  changed = 1;
  getWeather('Austin', '');
});

function getWeather(userPos, woeVal) {
  $.simpleWeather({
    location: userPos,
    woeid: woeVal,
    unit: 'f',
    success: function(data) {
      html = '<h1 class="text-center">Weather APP</h1>';
      html += '<h2 class="text-center"><i class="icon-'+data.code+'"></i> '+data.temp+'&deg;'+data.units.temp+'</h2>';
      if(changed == 1) {
        html += '<ul class="text-center"><li>'+data.city+'</li>';
      } else {
        html += '<ul class="text-center"><li>'+data.city+', '+data.region+'</li>';
      }
      html += '<li>'+data.currently+'</li>';
      html += '<li>'+data.alt.temp+'&deg;C</li></ul>';  
      
      $("#weatherino").html(html);
    },
    error: function(error) {
      $("#weatherino").html('<p>'+error+'</p>');
    }
  });
}

$('#ownWeather').on('click', function() {
  changed = 0;
  navigator.geolocation.getCurrentPosition(function(position) {
    getWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});