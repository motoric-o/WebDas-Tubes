var subintro_viewed = [false, false, false];
var scrollFade = ['#sub-intro', '#culinary-scroll', '#explore-scroll'];

function scrollSubIntro() {
    $('#intro').css({ "transform": "translateY(-20px)", "margin-top": "0px", "opacity": "0%", "height": "0" });
}

function scrollExplore() {
    setTimeout(() => {
        $('#to-foods').css({ "transform": "translateY(0px)", "opacity": "100%" });
    }, 200);
    setTimeout(() => {
        $('#to-beverages').css({ "transform": "translateY(0px)", "opacity": "100%" });
    }, 400);
    setTimeout(() => {
        $('#to-snacks').css({ "transform": "translateY(0px)", "opacity": "100%" });
    }, 600);

    setTimeout(() => {
        $('#to-foods').css({ "transition": "all 0.25s ease-in-out" });
        $('#to-beverages').css({ "transition": "all 0.25s ease-in-out" });
        $('#to-snacks').css({ "transition": "all 0.25s ease-in-out" });
    }, 700);
}

function scrollCulinary() {
    $('#img-collection-culinary').css({ "transition": "all 2s ease-in-out", "transform": "translateY(0px)", "opacity": "100%" });
}

function onScroll(selector, idx) {
    var hT = $(selector).offset().top;
    var hH = $(selector).outerHeight();
    var wH = $(window).height();
    var wS = $(this).scrollTop();

    if (wS > (hT + hH - wH) && subintro_viewed[idx] == false) {
        subintro_viewed[idx] = true;

        if (selector == '#sub-intro') {
            scrollSubIntro();
        } else if (selector == '#culinary-scroll') {
            scrollCulinary();
        } else if (selector == '#explore-scroll') {
            scrollExplore();
        }

        if (selector == '#culinary-scroll') {
            selector = "#culinary-container";
        } else if (selector == '#explore-scroll') {
            selector = '#explore'
        }

        $(selector).css({ "transition": "all 1s ease-in-out", "transform": "translateY(0px)", "opacity": "100%" });
    }
}

$(window).scroll(function () {
    for (let i = 0; i < scrollFade.length; i++) {
        onScroll(scrollFade[i], i);
    }
});


$('body').css({ "overflow-y": "hidden" });
$('#sub-intro').css({ "opacity": "0%" });
$('#explore').css({ "opacity": "0%", "transform": "translateY(50px)" });
$('#intro').css({ "opacity": "0%", "transform": "translateY(100px)" });
$('#hero-container').css({ "opacity": "0%", "transform": "translateY(80px)" });
$('#culinary-container').css({ "opacity": "0%", "transform": "translateY(80px)" });
$('#img-collection-hero').css({ "opacity": "0%", "transform": "translateY(-80px)" });
$('#img-collection-culinary').css({ "opacity": "0%", "transform": "translateY(-80px)" });
$(document).ready(function () {
    $('#hero-container').css({ "transition": "all 1s ease-in-out", "transform": "translateY(0px)", "opacity": "100%" });
    $('#img-collection-hero').css({ "transition": "all 2s ease-in-out", "transform": "translateY(0px)", "opacity": "100%" });
    setTimeout(() => {
        $('#intro').css({ "transition": "all 1s ease-in-out", "transform": "translateY(0px)", "opacity": "100%" });
    }, 1200);
    setTimeout(() => {
        $('body').css({ "overflow-y": "auto" });
    }, 2000);

    $('#to-foods').click(function() {
        window.location = "foods.html";
    });

    $('#to-beverages').click(function() {
        window.location = "beverages.html";
    });

    $('#to-snacks').click(function() {
        window.location = "snacks.html";
    });
});