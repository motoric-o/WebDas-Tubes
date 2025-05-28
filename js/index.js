var subintro_viewed = [false, false, false];
var scrollFade = ['#sub-intro', '#foods'];
var scrollOffset = ['100px', '0']

function scrollSubIntro() {
    $('#intro').animate({"margin-bottom": "0", "margin-top": "0", "opacity": "0%", "height": "0"}, 1000);
}

function onScroll(selector, idx) {
    var hT = $(selector).offset().top;
    var hH = $(selector).outerHeight();
    var wH = $(window).height();
    var wS = $(window).scrollTop();

    if (idx == 0) {
        scrollSubIntro();
    }

    if (wS > (hT + hH - wH) && subintro_viewed[idx] == false) {
        subintro_viewed[idx] = true;

        $(selector).animate({ "opacity": "100%", "margin-top": scrollOffset[idx] }, 1000);
    }

    
}

$(window).scroll(function () {
    for (let i=0; i < scrollFade.length; i++) {
        onScroll(scrollFade[i], i);
    }
});

$(document).ready(function () {
    let width = window.innerWidth;

    var heroMargin = 0;

    if (width > 768) {
        heroMargin = 100;
    }

    $('#sub-intro').css({ "opacity": "0%", "margin-top": "100px" });
    $('#foods').css({ "opacity": "0%" });
    $('#intro').css({ "opacity": "0%", "margin-top": "250px" });
    $('hero').css({ "opacity": "0%", "margin-top": `${heroMargin+100}px` });
    $('hero').animate({ "opacity": "100%", "margin-top": `${heroMargin}px` }, 1500);
    setTimeout(() => {
        $('#intro').animate({ "opacity": "100%", "margin-top": "200px" }, "slow");
    }, 1200);

    for (let i = 0; i < $('.image-collection-content').length; i++) {
        let item = $('.image-collection-content')[i];
        item.id = `image-collection-content${i}`;

        for (let j = 0; j < item.children.length; j++) {
            let image = item.children[j];
            image.id = `${item.id}-${j}`;
            image.class = "image-collection-content-image";
        }
    }

    $('.image-collection-content').ready(function () {
        let item = $('.image-collection-content');

        for (let i = 0; i < item.length; i++) {
            let collection = $('.image-collection-content')[i];
            var rotation = -15;
            var pos = 15;

            for (let j = 0; j < collection.children.length; j++) {
                let select = collection.children[j].id;
                $(`#${select}`).css({ "rotate": `${rotation}deg`, "left": `${pos}%` });
                if (j + 1 == collection.children.length - 1) {
                    rotation = 15;
                    pos = 45;
                }
            }
        }
    });

});