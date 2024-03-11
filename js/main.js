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
);

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
  } else {
    $("#gif").attr("src", firstFrame);
  }
}

function playBackward() {
  if ($("#gif").is(":hover")) {
    $("#gif").attr("src", lastFrame);
  } else {
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
        playForward();
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
        playBackward();
        checkingIfPlaying = false;
      }
    }, 0);
  }
});

function navBarColor() {
  const $myNav = $('#nav');
  const $myLi = $myNav.find('li');
  const $intro = $('#intro');
  const $about = $('#about');
  const $education = $('#education');
  const $projects= $('#projects');
  const $certificate = $('#certificate');
  const $myHead = $('#head');
  const offset = $myHead.outerHeight();
  const introBounding = $intro[0].getBoundingClientRect();
  const aboutBounding = $about[0].getBoundingClientRect();
  const projectsBounding = $projects[0].getBoundingClientRect();
  const educationBounding = $education[0].getBoundingClientRect();
  const certificateBounding = $certificate[0].getBoundingClientRect();
  const isWideScreen = $(window).innerWidth() > 871;

  if (offset > introBounding.bottom) {
    if (isWideScreen) {
      $myNav.css({
        'background-color': '#0e131a',
        'transition': 'background-color 0.5s ease-in-out'
      });
    } else {
      const $activeAnchor = $myLi.find('a.active');
      $myLi.find('a').css('color', $activeAnchor.length > 0 ? 'white' : '#6B7280');
    }
    const isScrolledToSection = offset > aboutBounding.top && aboutBounding.bottom > offset ||
                                offset > educationBounding.top && educationBounding.bottom > offset ||
                                offset > certificateBounding.top && certificateBounding.bottom > offset;
    $myHead.css({
      'box-shadow': isScrolledToSection ? 'rgb(38, 57, 77) 0px 8px 30px -4px' : 'none',
      '-webkit-box-shadow': isScrolledToSection ? 'rgb(38, 57, 77) 0px 8px 30px -4px' : 'none',
      '-moz-box-shadow': isScrolledToSection ? 'rgb(38, 57, 77) 0px 8px 30px -4px' : 'none',
      'transition': 'box-shadow 0.2s ease-in-out'
    });
      $myLi.each(function () {
      const $anchor = $(this).find('a');
      const isActive = $anchor.hasClass('active');
      $anchor.css({
        color: isActive ? 'white' : '#6B7280',
        transition: 'color 0.2s ease-in-out'
      });
      $(this).on('mouseover', function () {
        $anchor.css('color', 'white');
      });
      $(this).on('mouseout', function () {
        if (!isActive || offset < introBounding.bottom) {
          $anchor.css('color', '#6B7280');
        }
      });
    });
  } else {
    $myNav.css({
      'transform': 'none',
      'transition': 'background-color 0.5s ease-in-out',
      'background-color': isWideScreen ? '#d1d3d6' : '#0e131a'
    });
    $myHead.css({
      'transition': 'box-shadow 0.2s ease-in-out',
      'box-shadow': 'none'
    });
    $myLi.each(function () {
      const $activeAnchor = $(this).find('a.active');
      const isActive = $activeAnchor.length > 0;
      if (isActive) {
        $myNav.css('background-color', isWideScreen ? '#d1d3d6' : '#0e131a');
        $activeAnchor.css('color', isWideScreen ? 'black' : 'white');
      }
      $(this).on('mouseover', function () {
        $(this).find('a').css('color', isWideScreen ? 'black' : 'white');
      });
      if (!isActive) {
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
  const $scrollElement = $(simpleBarInstance.getScrollElement());
  const $window = $(window);


  function both(){
    navBarColor();
    addClassOnScroll();
  }
  $scrollElement.on('scroll', both);
  $window.on('resize', both);


  
  $('.nava').click(function (event) {
    event.preventDefault();
    var id = $(this).attr("href").split("#")[1];
    if (id) {
      var el = $("#" + id);
      var container = el.closest('.simplebar-content-wrapper')
      if (el.length) {
        var scrollTo = el.offset().top - container.offset().top + container.scrollTop();
        $(container).animate({ scrollTop: scrollTo }, 'slow');
      }
    }
  both();
  });
});
