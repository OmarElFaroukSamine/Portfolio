var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//
preload(
    "resources/normal.gif",
    "resources/first.gif",
    "resources/last.gif",
    "resources/reversed.gif"

)
var firstFrame = "resources/first.gif";
var lastFrame = "resources/last.gif";
var normal = "resources/normal.gif";
var reverse = "resources/reversed.gif";

var animationLength = 2330;
var playing = false;
var checkingIfPlaying = false;

function playForward() {
  if ($("#gif").is(":hover")) {
    playing = true;
    $("#gif").attr("src", normal);
    window.setTimeout(function () {
      $("#gif").attr("src", lastFrame);
      playing = false;
    }, animationLength);
  }
  else {
    $("#gif").attr("src", firstFrame);
  }
}

function playBackward() {
  if ($("#gif").is(":hover")) {
    $("#gif").attr("src", lastFrame);
  }
  else {
    playing = true;
    $("#gif").attr("src", reverse);
    window.setTimeout(function () {
      $("#gif").attr("src", firstFrame);
      playing = false;
    }, animationLength);
  }
}

$("#gif").mouseover(function (e) {
  if (!checkingIfPlaying) {
    checkingIfPlaying = window.setInterval(function () {
      if (!playing) {
        window.clearInterval(checkingIfPlaying);
        playForward()
        checkingIfPlaying = false;
      }
    }, 0);
  }
});

$("#gif").mouseout(function (e) {
  if (!checkingIfPlaying) {
    checkingIfPlaying = window.setInterval(function () {
      if (!playing) {
        window.clearInterval(checkingIfPlaying);
        playBackward()
        checkingIfPlaying = false;
      }
    }, 0);
  }
});

var ssWaypoints = function() {

  var sections = $(".target-section"),
      navigation_links = $(".header-main-nav li a");

  sections.waypoint( {

      handler: function(direction) {

          var active_section;

          active_section = $('section#' + this.element.id);

          if (direction === "up") active_section = active_section.prevAll(".target-section").first();

          var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');

          navigation_links.parent().removeClass("current");
          active_link.parent().addClass("current");

      },
      offset: '25%'

  });
};