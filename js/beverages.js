$(document).ready(function () {
    $.getJSON('data/minuman.json', function (data) {
        let add = 0
        for (let i = 0; i < data.length; i++) {
            $('#konten').append(
                `<div id="${data[i].nama}" class="konten_isi">
                    <img src="${data[i].foto}" alt="">
                    <div class="konten_nama">
                        <h2>${data[i].nama}</h2>
                    </div>
                </div>`
            )
            $(`#${data[i].nama}`).css({ "grid-area": `${data[i].nama}` });
        }

        $('.konten_isi').click(function () {
            const clickedId = $(this).attr('id');
            document.body.style.overflow = 'hidden'
            $('#dropdown').val('deskripsi');
            for (let i = 0; i < data.length; i++) {
                if (clickedId === data[i].nama) {
                    add = i
                    $('#background').css({ "top": "0" });
                    $('#popup').css({ "top": "15%" });
                    $('#popup_img').empty().append(
                        `<img src="${data[i].foto}" alt="">`
                    )
                    $('#popup_title').text(data[i].nama)
                    $("#popup_text").text(data[i].deskripsi);
                    break
                }
            }
        });
        $('#dropdown').on('change', function () {
            let popup_select = $('#dropdown').val();
            if (popup_select === "sejarah") {
                $("#popup_text").text(data[add].sejarah)
            } else if (popup_select === "resep") {
                const item = data[add];
                $("#popup_text").empty();

                $('#popup_text').append("<h3>Bahan:</h3>");
                item.resep.bahan.forEach(bahan => {
                    $('#popup_text').append(`<p> - ${bahan}</p>`);
                });

                $('#popup_text').append("<h3>Langkah:</h3>");
                item.resep.cara_membuat.forEach((cara_membuat, index) => {
                    $('#popup_text').append(`<p>${index + 1}. ${cara_membuat}</p>`);
                });
            } else {
                $("#popup_text").text(data[add].deskripsi)
            }
        });

        $('#cancel').click(function () {
            $('#popup').css({ "top": "-100%" });
            $('#background').css({ "top": "-100%" });
            setTimeout(() => {
                $('#popup_img').empty();
                $('#popup_text').empty();
                $('#popup_title').empty();
                document.body.style.overflow = ''
            }, 500)

        });
    });
});
