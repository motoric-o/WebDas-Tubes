if (localStorage.getItem("favorites") == null) {
    localStorage.setItem("favorites", JSON.stringify([]));
}

var favorites = JSON.parse(localStorage.getItem("favorites"));

function appendFavorites() {
    for (let i = 0; i < favorites.length; i++) {
        const item = $(
            `
            <tr>
                <td class="favorites-action">
                    1
                    <button type="button" class="remove">X</button>
                </td>
                <td class="favorites-item">
                    <p></p>
                </td>
                <td class="favorites-category">
                    <p></p>
                </td>
            </tr>
            `
        );


    }
}

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    favorites = localStorage.getItem("favorites");
}

$(document).ready(function () {
    if (favorites.length == 0) {
        const item = $(
            `
            <tr>
                <td colspan=3 id="favorites-noitem">Kamu belum save apapun, mulai save!</td>
            </tr>
            `
        );

        $('#favorites-content').append(item);
    }
});