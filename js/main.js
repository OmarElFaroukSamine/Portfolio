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