if (localStorage.getItem("favorites") == null) {
    localStorage.setItem("favorites", JSON.stringify([]));
}

var favorites = JSON.parse(localStorage.getItem("favorites"));
var displayed;

function appendFavorites() {
    $('#favorites-content').empty();

    if (favorites.length == 0) {
        $('#favorites-content').append(
            `
            <tr>
                <td colspan=3 id="favorites-noitem"><p>Kamu belum save apapun, mulai save!</p></td>
            </tr>
            `
        );
    } else {
        for (let i = 0; i < favorites.length; i++) {
            $('#favorites-content').append(
                `
            <tr class="favorites-item" id="${favorites[i]["nama"]}">
                <td class="favorite-action">
                    <button type="button" class="remove" id="${favorites[i]["nama"]}-remove">X</button>
                </td>
                <td class="favorite-item">
                    <div class="favorite-item-container">
                        <div class="favorite-img" id="${favorites[i]["nama"]}-img"></div>
                        ${favorites[i]["nama"]}
                    </div>
                </td>
                <td class="favorite-category">
                    <div class="favorite-item-container">
                        <img class="icon" src="img/favorite/${favorites[i]["kategori"]}.${favorites[i]["kategori"] == "Minuman" ? "webp" : "png"}" alt="${favorites[i]["kategori"]}">${favorites[i]["kategori"]}
                    </div>
                </td>
            </tr>
            `
            );

            $(`#${favorites[i]["nama"]}-img`).css({
                "background-image": `url(${favorites[i]["foto"]})`,
            });

            $(`#${favorites[i]["nama"]}`).click(function () {
                const clickedId = $(this).attr('id');
                document.body.style.overflow = 'hidden'
                for (let i = 0; i < favorites.length; i++) {
                    if (clickedId === favorites[i].nama) {
                        add = i;
                        displayed = favorites[i];
                        $('#background').css({ "opacity": "60%", "z-index": "2" });
                        $('#popup').css({ "top": "15%" });
                        $('#popup_img').css({
                            "background-image": `url(${favorites[i].foto})`,
                            "background-size": "cover",
                            "background-position": "center",
                            "background-repeat": "no-repeat"
                        });
                        $('#popup_title').text(favorites[i].nama);
                        $("#popup_text").text(favorites[i].deskripsi);

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

            $(`#${favorites[i]["nama"]}-remove`).click(function () {
                favorites.splice(i, 1);
                saveFavorites();
                appendFavorites();
            });
        }
    }
}

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

$(document).ready(function () {
    appendFavorites();

    $('#dropdown').on('change', function () {
        let popup_select = $('#dropdown').val();
        if (popup_select === "sejarah") {
            $("#popup_text").text(favorites[add].sejarah);
        } else if (popup_select === "resep") {
            const item = favorites[add];
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
            $("#popup_text").text(favorites[add].deskripsi);
        }
    });

    $('#cancel').click(function () {
        $('#popup').css({ "top": "-100%" });
        $('#background').css({ "opacity": "0%", "z-index": "-1" });
        setTimeout(() => {
            $('#popup_img').empty();
            $('#popup_text').empty();
            $('#popup_title').empty();
            document.body.style.overflow = ''
            $('#dropdown').val('deskripsi');
        }, 200)
    });

    $('#button-favorite').click(function () {
        let check = false;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i]["nama"] == displayed["nama"]) {
                check = true;
                favorites.splice(i, 1);
                $('#popup').css({ "top": "-100%" });
                $('#background').css({ "opacity": "0%", "z-index": "-1" });
                setTimeout(() => {
                    $('#popup_img').empty();
                    $('#popup_text').empty();
                    $('#popup_title').empty();
                    document.body.style.overflow = ''
                    $('#dropdown').val('deskripsi');
                }, 200)
                $(this).text("Favorite ♡");
                break
            }
        }

        saveFavorites();
        appendFavorites();
    });
});