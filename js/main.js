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


function navBarColor() {
  const myNav = $('#nav');
  const myLi = myNav.find('li');
  const intro = $('#intro');
  const about = $('#about');
  const myHead = $('#head');
  var aboutBounding = about[0].getBoundingClientRect();
  var offset = myHead.outerHeight();
  var introBounding = intro[0].getBoundingClientRect();

  if (introBounding.bottom < offset) {
    if ($(window).innerWidth() > 871) {
      myNav.css({
        'background-color': '#0e131a',
        'transition': 'background-color 0.5s ease-in-out'
      });
      myHead.css({
        'box-shadow': 'rgb(38, 57, 77) 0px 8px 30px -4px',
        '-webkit-box-shadow':'rgb(38, 57, 77) 0px 8px 30px -4px',
        '-moz-box-shadow':'rgb(38, 57, 77) 0px 8px 30px -4px',
        'transition': 'box-shadow 0.2s ease-in-out'
      });
    } else {
      var anch = myLi.find('a.active');
      if (anch.length > 0) {
          anch.css('color', 'white');
      } else {
        myLi.find('a').css('color', '#6B7280');
      }
    }
    if (offset > aboutBounding.bottom) {
      myHead.css({
        'box-shadow': 'none',
        'transition': 'box-shadow 0.2s ease-in-out'
      });
    }
    myHead.css('line-height', '70px !important');
    myLi.each(function () {
      var anch = $(this).find('a');
      if (anch.hasClass('active')) {
        anch.css('color', 'white');

      } else {
        anch.css('color', '#6B7280');
        anch.css('transition', '0ms');
      }
      $(this).on('mouseover', function () {
        $(this).find('a').css('color', 'white');
      });
      if (!anch.hasClass('active')) {
        $(this).on('mouseout', function () {
          $(this).find('a').css({
            'color': '#6B7280',
            'transition': 'color 1s ease-in-out'
          });
        });
      } else {
        $(this).on('mouseout', function () {
          $(this).find('a').css('color', 'white');
        });
      }
    });
  } else {
    myNav.css('transform', 'none');
    myNav.css('transition', 'background-color 0.5s ease-in-out');
    myHead.css('transition', 'box-shadow 0.2s ease-in-out');
    myHead.css('box-shadow', 'none');
    myLi.each(function () {
      var anch = $(this).find('a.active');
      if (anch.length > 0) {
        if ($(window).innerWidth() > 871) {
          myNav.css('background-color', '#d1d3d6');
          anch.css('color', 'black');
        } else {
          myNav.css('background-color', '#0e131a');
          anch.css('color', 'white');
        }
      }
      $(this).on('mouseover', function () {
        if ($(window).innerWidth() > 871) {
          $(this).find('a').css('color', 'black');
        } else {
          $(this).find('a').css('color', 'white');
        }
      });
      if (!anch.hasClass('active')) {
        $(this).find('a').css('color', '#6B7280');
      }
    });
  }
}
var addClassOnScroll = function () {
  var windowTop = $(window).scrollTop();
  $('section[id]').each(function (index, elem) {
    var offsetTop = $(elem).offset().top;
    var outerHeight = $(this).outerHeight(true);
    if (windowTop > (offsetTop - 50) && windowTop < (offsetTop + outerHeight)) {
      var elemId = $(elem).attr('id');
      $("nav ul li a.active").removeClass('active');
      $("nav ul li a[href='#" + elemId + "']").addClass('active');
    }
  });
};

$(document).ready(function () {
  const scrollContainer = $('.simplebar-content')[0];
  const simpleBarInstance = new SimpleBar(scrollContainer);
  $(simpleBarInstance.getScrollElement()).on('scroll', function () { navBarColor(); });
  $(simpleBarInstance.getScrollElement()).on('scroll', function () { addClassOnScroll(); });
  $(window).on('resize', function () { navBarColor(); addClassOnScroll();});
  $('.nava').click(function (event) {
    event.preventDefault();
    var id = $(this).attr("href").split("#")[1];
    if (id){
      var el = $("#" + id);
      var container = el.closest('.simplebar-content-wrapper')
      if (el.length){
        var scrollTo = el.offset().top - container.offset().top + container.scrollTop();
        $(container).animate({ scrollTop: scrollTo }, 'slow');
      }
    }
    addClassOnScroll();
    navBarColor();
  });
});