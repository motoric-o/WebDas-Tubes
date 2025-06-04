var subintro_viewed = [false, false, false];
var scrollFade = ['#sub-intro', '#culinary-scroll'];
var scrollOffsetSmall = ['130px', '50px'];
var scrollOffsetBig = ['65px', '180px'];

function scrollSubIntro() {
    $('#intro').animate({ "margin-top": "0", "opacity": "0%", "height": "0" }, 1000);
}

function onScroll(selector, idx) {
    var hT = $(selector).offset().top;
    var hH = $(selector).outerHeight();
    var wH = $(window).height();
    var wS = $(this).scrollTop();

    if (wS > (hT + hH - wH) && subintro_viewed[idx] == false) {
        subintro_viewed[idx] = true;

        if (idx == 0) {
            scrollSubIntro();
        }

        if (idx == 1) {
            selector = "#culinary";
        }
        
        let width = window.innerWidth;
        var scrollOffset = scrollOffsetSmall[idx];

        if (width >= 768) {
            scrollOffset = scrollOffsetBig[idx];
        }


        $(selector).animate({ "opacity": "100%", "margin-top": scrollOffset }, 1000);
    }
}

$(window).scroll(function () {
    for (let i = 0; i < scrollFade.length; i++) {
        onScroll(scrollFade[i], i);
    }
});

$(document).ready(function () {
    let width = window.innerWidth;

    var heroMargin = 65;
    var introMargin = 130;
    var culinaryMargin = 100;

    if (width > 768) {
        heroMargin = 100;
        culinaryMargin = 200;
    }

    $('#sub-intro').css({ "opacity": "0%", "margin-top": "100px" });
    $('#culinary').css({ "opacity": "0%", "margin-top": `${culinaryMargin + 50}px` });
    $('#intro').css({ "opacity": "0%", "margin-top": `${introMargin + 50}px` });
    $('hero').css({ "opacity": "0%", "margin-top": `${heroMargin + 100}px` });
    $('hero').animate({ "opacity": "100%", "margin-top": `${heroMargin}px` }, 1500);
    setTimeout(() => {
        if (subintro_viewed[0] == false) {
            $('#intro').animate({ "opacity": "100%", "margin-top": `${introMargin}px` }, "slow");
        }
    }, 1200);
});