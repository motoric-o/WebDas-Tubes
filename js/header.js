function toggleMenu() {
    $('#header-list').toggleClass("open");
}

$(document).ready(function () {
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
                $(`#${select}`).css({"rotate" : `${rotation}deg`, "left" : `${pos}%`});
                if (j+1 == collection.children.length-1) {
                    rotation = 15;
                    pos = 40;
                }
            }
        }
    });
});