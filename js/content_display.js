$(document).ready(function () {
    var dataPath = 'data/makanan.json'

    if (window.location.pathname == '/beverages.html') {
        dataPath = 'data/minuman.json'
    }
    $.getJSON(dataPath, function (data) {
        let add = 0

        for (let i = 0; i < data.length; i++) {
            $('#konten').append(
                `<div id="${data[i].nama}" class="konten_isi">
                    <div class="konten_nama">
                        <h2>${data[i].nama}</h2>
                    </div>
                </div>`
            )

            $(`#${data[i].nama}`).css({
                "grid-area": `${data[i].nama}`,
                "background-image": `url(${data[i].foto})`,
                "background-size": "cover",
                "background-position": "center",
                "background-repeat": "no-repeat",
                "text-align": "center"
            });

            if (window.innerWidth < 768) {
                s = ""


                for (let i = 0; i < data.length; i++) {
                    s += `"${data[i].nama}"`
                }
                $('#konten').css({
                    "grid-template-areas": s.trim(),
                    "grid-template-rows": `repeat(${data.length}, 300px)`
                });
            } else {
                s = ""
                for (let i = 0; i < data.length; i += 3) {
                    s += `"`
                    for (let j = i; j < i + 3; j++) {

                        if (data[j] != undefined) {
                            s += `${data[j].nama}`
                        } else if (data[j] == undefined) {
                            s += "none"
                        }

                        if (j != i + 2) {
                            s += " "
                        }

                    }
                    s += `"`

                    if (i != data.length - (data.length % 3)) {
                        s += " "
                    }
                }
                $('#konten').css({
                    "grid-template-areas": s,
                    "grid-template-rows": `repeat(${Math.ceil(data.length / 3)}, 450px)`
                });
            }
        }

        $('.konten_isi').click(function () {
            const clickedId = $(this).attr('id');
            document.body.style.overflow = 'hidden'
            for (let i = 0; i < data.length; i++) {
                if (clickedId === data[i].nama) {
                    add = i
                    $('#background').css({ "top": "0" });
                    $('#popup').css({ "top": "15%" });
                    $('#popup_img').css({
                        "background-image": `url(${data[i].foto})`,
                        "background-size": "cover",
                        "background-position": "center",
                        "background-repeat": "no-repeat"
                    })
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
                $('#dropdown').val('deskripsi');
            }, 200)
        });

        $(window).on("resize", function () {
            if (window.innerWidth < 768) {
                s = ""

                for (let i = 0; i < data.length; i++) {
                    s += `"${data[i].nama}"`
                }
                $('#konten').css({
                    "grid-template-areas": s.trim(),
                    "grid-template-rows": `repeat(${data.length}, 300px)`
                });
            } else {
                s = ""
                for (let i = 0; i < data.length; i += 3) {
                    s += `"`
                    for (let j = i; j < i + 3; j++) {

                        if (data[j] != undefined) {
                            s += `${data[j].nama}`
                        } else if (data[j] == undefined) {
                            s += "none"
                        }

                        if (j != i + 2) {
                            s += " "
                        }

                    }
                    s += `"`

                    if (i != data.length - (data.length % 3)) {
                        s += " "
                    }
                }
                console.log(s)
                $('#konten').css({
                    "grid-template-areas": s,
                    "grid-template-rows": `repeat(${Math.ceil(data.length / 3)}, 450px)`
                });
            }
        })
        $('#search_content').on('input', function () {
            const query = $(this).val().toLowerCase().trim();
            const words = query.split();
            let visibleCount = 0;

            $('.konten_isi').each(function () {
                const name = $(this).attr('id').toLowerCase();
                const isMatch = words.every(word => name.includes(word));
                $(this).toggle(isMatch);
                if (isMatch) visibleCount++;
            });

            if (window.innerWidth >= 768) {
                const rows = Math.ceil(visibleCount / 3);
                let s = '';
                const visibleItems = $('.konten_isi:visible');

                for (let i = 0; i < visibleItems.length; i += 3) {
                    s += '"';
                    for (let j = i; j < i + 3; j++) {
                        if (visibleItems[j]) {
                            s += $(visibleItems[j]).attr('id');
                        } else {
                            s += 'none';
                        }
                        if (j < i + 2) s += ' ';
                    }
                    s += '" ';
                }

                $('#konten').css({
                    "grid-template-areas": s.trim(),
                    "grid-template-rows": `repeat(${rows}, 450px)`
                });
            } else {
                const areas = $('.konten_isi:visible').map(function () {
                    return `"${$(this).attr('id')}"`;
                }).get().join(' ');

                $('#konten').css({
                    "grid-template-areas": areas.trim(),
                    "grid-template-rows": `repeat(${visibleCount}, 300px)`
                });
            }
        });
    });
});
