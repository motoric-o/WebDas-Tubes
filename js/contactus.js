(function () {
    emailjs.init({
        publicKey: "ebbGHZ7XpKqSPXCjE",
    });
})();

function mail(event) {
    event.preventDefault();

    let check = true;

    $(".error-txt").removeClass("active");

    if ($.trim($("#name").val()) === "") {
        $("#name").next(".error-txt").addClass("active");
        check = false;
    }

    if ($.trim($("#email").val()) === "") {
        $("#email").next(".error-txt").addClass("active");
        check = false;
    }

    if ($.trim($("#subject").val()) === "") {
        $("#subject").next(".error-txt").addClass("active");
        check = false;
    }

    if ($.trim($("#message").val()) === "") {
        $("#message").next(".error-txt").addClass("active");
        check = false;
    }

    if (!check) {
        $(".contact-form")[0].scrollIntoView({ behavior: "smooth" });
        return;
    }

    var contact = {
        name: $("#name").val(),
        email: $("#email").val(),
        subject: $("#subject").val(),
        message: $("#message").val(),
    };

    const serviceId = 'service_9b3enrq';
    const templateId = 'template_9m3lcja';

    emailjs.send(serviceId, templateId, contact)
        .then(() => {
            popUp("Berhasil", "Email Anda sudah terkirim.", "success");
            $("form")[0].reset();
        })
        .catch(function (error) {
            console.error("Gagal mengirim email:", error);
            popUp("Gagal", "Terjadi kesalahan saat mengirim email.", "error");
        });
}

function popUp(title, message, tipe = "success") {
    const $pop = $("#pop-up");
    const $content = $("#pop-up-content");
    const $sub = $("#title");
    const $pesan = $("#message-pop");
    const $ipop = $("#icon-pop");

    $pop.addClass("active").css("display", "flex");
    $content.attr("class", `pop-up-content ${tipe}`);
    $sub.text(title);
    $pesan.text(message);
    $ipop.text((tipe === "success" ? "✅ " : "❌ ") + title);
}

function tutup() {
    $("#pop-up").css("display", "none");
}

$(document).ready(function () {
    $(".contact-input-group input, .contact-input-group textarea").on("input", function () {
        const $error = $(this).next(".error-txt");
        if ($.trim($(this).val()) !== "") {
            $error.removeClass("active");
        }
    });
});