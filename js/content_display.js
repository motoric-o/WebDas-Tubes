if (localStorage.getItem("favorites") == null) {
    localStorage.setItem("favorites", JSON.stringify([]));
}

var favorites = JSON.parse(localStorage.getItem("favorites"));

$(document).ready(function () {
    var category = 'Makanan';

    if (window.location.pathname == '/beverages.html') {
        category = 'Minuman';
    } else if (window.location.pathname == '/snacks.html') {
        category = 'Snack';
    }

    var dataPath = `data/${category}.json`;
    var displayed;

    $.getJSON(dataPath, function (data) {
        let add = 0
        var timeout = 100

        for (let i = 0; i < data.length; i++) {
            $('#konten').append(
                `<div id="${data[i].nama}" class="konten_isi">
                    <div class="konten_nama">
                        <h2>${data[i].nama}</h2>
                    </div>
                </div>`
            );

            $(`#${data[i].nama}`).css({
                "grid-area": `${data[i].nama}`,
                "background-image": `url(${data[i].foto})`,
                "background-size": "cover",
                "background-position": "center",
                "background-repeat": "no-repeat",
                "text-align": "center",
                "opacity": "0%",
                "transform": "translateY(-50px)",
                "transition": "all 0.75s ease-in-out"
            });

            if (screen.width < 768 || window.innerWidth < 768) {
                s = "";

                for (let i = 0; i < data.length; i++) {
                    s += `"${data[i].nama}"`;
                }
                $('#konten').css({
                    "grid-template-areas": s
                });
            } else {
                s = "";
                for (let i = 0; i < data.length; i += 3) {
                    s += `"`
                    for (let j = i; j < i + 3; j++) {

                        if (data[j] != undefined) {
                            s += `${data[j].nama}`;
                        } else if (data[j] == undefined) {
                            s += "none";
                        }

                        if (j != i + 2) {
                            s += " ";
                        }

                    }
                    s += `"`;

                    if (i != data.length - (data.length % 3)) {
                        s += " ";
                    }
                }
                $('#konten').css({
                    "grid-template-areas": s
                });
            }

            setTimeout(() => {
                $(`#${data[i].nama}`).css({
                    "opacity": "100%",
                    "transform": "translateY(0px)"
                });
            }, timeout);

            setTimeout(() => {
                $(`#${data[i].nama}`).css({
                    "transition": "all 0.25s ease-in-out"
                });
            }, timeout + 750);

            timeout += 200;
        }

        $('.konten_isi').click(function () {
            const clickedId = $(this).attr('id');
            document.body.style.overflow = 'hidden'
            for (let i = 0; i < data.length; i++) {
                if (clickedId === data[i].nama) {
                    add = i;
                    displayed = data[i];
                    $('#background').css({ "opacity": "60%", "z-index": "2" });
                    $('#popup').css({ "top": "15%" });
                    $('#popup_img').css({
                        "background-image": `url(${data[i].foto})`,
                        "background-size": "cover",
                        "background-position": "center",
                        "background-repeat": "no-repeat"
                    });
                    $('#popup_title').text(data[i].nama);
                    $("#popup_text").text(data[i].deskripsi);

                    let check = false;
                    for (let j = 0; j < favorites.length; j++) {
                        if (favorites[j]["nama"] == displayed["nama"]) {
                            check = true;
                            $('#button-favorite').text("✔");
                            break;
                        }
                    }

                    if (check == false) {
                        $('#button-favorite').text("Favorite ♡");
                    }
                    break;
                }
            }
        });
        $('#dropdown').on('change', function () {
            let popup_select = $('#dropdown').val();
            $('#popup_text').hide();
            if (popup_select === "sejarah") {
                $("#popup_text").text(data[add].sejarah);
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
                $("#popup_text").text(data[add].deskripsi);
            }
            $('#popup_text').show(250);
        });

        $('#cancel').click(function () {
            $('#popup').css({ "top": "-100%" });
            $('#background').css({ "opacity": "0%" });
            setTimeout(() => {
                $('#popup_img').empty();
                $('#popup_text').empty();
                $('#popup_title').empty();
                document.body.style.overflow = ''
                $('#dropdown').val('deskripsi');
            }, 200);
            setTimeout(() => {
                $('#background').css({ "z-index": "-1" });
            }, 750);
        });

        $(window).on("resize", function () {
            if (screen.width < 768 || window.innerWidth < 768) {
                let s = '';

                for (let i = 0; i < $('.konten_isi:visible').length; i++) {
                    s += `"${$('.konten_isi:visible')[i].id}"`;
                }

                $('#konten').css({
                    "grid-template-areas": s
                });
            } else {
                s = ""
                for (let i = 0; i < $('.konten_isi:visible').length; i += 3) {
                    s += `"`;
                    for (let j = i; j < i + 3; j++) {

                        if ($('.konten_isi:visible')[j] != undefined) {
                            s += `${$('.konten_isi:visible')[j].id}`;
                        } else if ($('.konten_isi:visible')[j] == undefined) {
                            s += "none";
                        }

                        if (j != i + 2) {
                            s += " ";
                        }

                    }
                    s += `"`;

                    if (i != $('.konten_isi:visible').length - ($('.konten_isi:visible').length % 3)) {
                        s += " ";
                    }
                }

                $('#konten').css({
                    "grid-template-areas": s
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

            if (screen.width >= 768 || window.innerWidth >= 768) {
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
                    "grid-template-areas": s
                });
            } else {
                let s = '';

                for (let i = 0; i < $('.konten_isi:visible').length; i++) {
                    s += `"${$('.konten_isi:visible')[i].id}"`;
                }

                $('#konten').css({
                    "grid-template-areas": s
                });
            }
        });
    });

    $('#button-favorite').click(function () {
        let check = false;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i]["nama"] == displayed["nama"]) {
                check = true;
                favorites.splice(i, 1);
                $(this).text("Favorite ♡");
                break
            }
        }

        if (check == false) {
            displayed["kategori"] = category;
            favorites.push(displayed);
            $(this).text("✔");
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    });
});