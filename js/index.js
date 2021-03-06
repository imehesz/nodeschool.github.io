try {
  loadEvents()
} catch(e) {
  $('#upcoming-workshops').addClass("error")
  $('#map').css({"background-size": "100%", "background-image": "url(images/hero.jpg)"})
}

function loadEvents() {
  var URL = "https://docs.google.com/spreadsheets/d/1swvC909BzbpToZLePM6whDvmXavaxEG6eT257dVf-bY/pubhtml"
  Tabletop.init({key: URL, callback: showNearEvents, simpleSheet: true})
}

function showNearEvents(data) {
  writeCount(data.length)
  makeMap(data)
  var list = upcomingEvents(data)
  if (list.length == 0) {
    $('#upcoming-workshops').addClass("empty")
  } else {
    var html = Sheetsee.ich.events({
        'rows': list
      })
    $('#upcoming-workshops').addClass("success")
    $('#upcoming-workshops>.success>ul').html(html)
  }
}

function writeCount(count) {
  $('#event-count .cnt').text(count)
}

// init google analytics tracking events for clicks on workshop external links
$('#workshopper-list, .elective-workshoppers')
  // assuming current layout (first .third used for info)
  .find('.third:not(:eq(0))')
  .on('click', 'a', function (e) {
    // assuming github.com/username/workshopper
    var workshopperId = $(this).attr('href').split('/').slice(-1)[0];
    ga('send', 'event', 'workshopper', 'click', workshopperId);
  });
