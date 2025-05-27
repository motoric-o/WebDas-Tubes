var introLoop;
var subintro_viewed = false;

function toggleMenu() {
    $('#header-list').toggleClass("open");
}

$(window).scroll(function () {
    var hT = $('#sub-intro').offset().top;
    var hH = $('#sub-intro').outerHeight();
    var wH = $(window).height();
    var wS = $(this).scrollTop();

    if (wS > (hT+hH-wH) && subintro_viewed == false){
        subintro_viewed = true

        $('#sub-intro').animate({ "opacity": "100%", "margin-top": "0" }, 1000);
   }
});

$(document).ready(function () {
    $('#sub-intro').css({ "opacity": "0%", "margin-top": "100px" });
    $('#foods').css({ "opacity": "0%", "margin-top": "100px" });

    $('#intro').css({ "opacity": "0%" });
    $('hero').css({ "opacity": "0%", "margin-top": "100px" });
    $('hero').animate({ "opacity": "100%", "margin-top": "0" }, 1500);
    setTimeout(() => {
        $('#intro').animate({ "opacity": "100%" }, "slow");
    }, 1200);

    for (let i = 0; i < $('.image-collection').length; i++) {
        let item = $('.image-collection')[i];
        item.id = `image-collection${i}`;

        for (let j = 0; j < item.children.length; j++) {
            let image = item.children[j];
            image.id = `${item.id}-${j}`;
            image.class = "image-collection-image";
        }
    }

    $('.image-collection').ready(function () {
        let item = $('.image-collection');

        for (let i = 0; i < item.length; i++) {
            let collection = $('.image-collection')[i];
            var rotation = -15;
            var pos = 10;

            for (let j = 0; j < collection.children.length; j++) {
                let select = collection.children[j].id;
                $(`#${select}`).css({ "rotate": `${rotation}deg`, "left": `${pos}%` });
                if (j + 1 == collection.children.length - 1) {
                    rotation = 15;
                    pos = 40;
                }
            }
        }
    });

});