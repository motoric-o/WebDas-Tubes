$(document).ready(function () {
    $('#popup').css({"top": "-100%"});
    $.getJSON('data/makanan.json', function (data) {
        for (let i = 0; i < data.length; i++) {
            $('#konten').append(
                `<div id="${data[i].nama}" class="food-item">
                    <img src="${data[i].foto}" alt="">
                    <div>
                        <h2>${data[i].nama}</h2>
                    </div>
                </div>`
            )
        }

        $('.food-item').click(function () {
            const clickedId = $(this).attr('id');

            for (let i = 0; i < data.length; i++) {
                let cekid = data[i].nama
                if (clickedId === cekid ) {
                    $('#popup').css({"top": "20%"});
                    $('#konten').append(
                        `<p id="tulisan">
                            ${data[i]['deskripsi']}
                        </p>`
                    )
                    break
                }
            }
        });

    })
});
