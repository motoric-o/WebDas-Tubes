$(document).ready(function () {
    $.getJSON('data/makanan.json', function (data) {
        for (let i = 0; i < data.length; i++) {
            $('#konten').append(
                `<div id="${data[i].nama}">
                <img src="${data[i].foto}" alt="">
                </div>`
            )
        }
    })
});
