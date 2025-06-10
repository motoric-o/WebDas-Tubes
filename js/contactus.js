function mail(event) {
    event.preventDefault();

    let check = true;

    document.querySelectorAll(".error-txt").forEach(e => e.classList.remove("active"));

    if (document.getElementById("name").value.trim() === "") {
        document.getElementById("name").nextElementSibling.classList.add("active");
        check = false
    }

    if (document.getElementById("email").value.trim() === "") {
        document.getElementById("email").nextElementSibling.classList.add("active");
        check = false
    }

    if (document.getElementById("subject").value.trim() === "") {
        document.getElementById("subject").nextElementSibling.classList.add("active");
        check = false
    }

    if (document.getElementById("message").value.trim() === "") {
        document.getElementById("message").nextElementSibling.classList.add("active");
        check = false
    }

    if (!check) {
        document.querySelector(".contact-form").scrollIntoView({ behavior: "smooth" });
        return;
    }


    var contact = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        subject : document.getElementById("subject").value,
        message : document.getElementById("message").value,
    };

    const serviceId = 'service_9b3enrq';
    const templateId = 'template_9m3lcja';

    emailjs.send(serviceId, templateId, contact)
    .then(() => {
        popUp("Berhasil", "Email Anda sudah terkirim.", "success");
        document.querySelector("form").reset();
    })
    .catch(function(error){
        console.error("Gagal mengirim email:", error);
        popUp("Gagal", "Terjadi kesalahan saat mengirim email.", "error");
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const input = document.querySelectorAll(".contact-input-group input, .contact-input-group textarea");

    input.forEach(input => {
        input.addEventListener("input", function() {
            const error = this.nextElementSibling;
            if (this.value.trim() !== "") {
                error.classList.remove("active");
            }
        });
    });
});

function popUp(title, message, tipe = "success") {
    const pop = document.getElementById("pop-up");
    const content = document.getElementById("pop-up-content");
    const sub = document.getElementById("title");
    const pesan = document.getElementById("message-pop");
    const ipop =document.getElementById("icon-pop");

    pop.classList.add("active");
    pop.style.display = "flex";
    content.className = `pop-up-content ${tipe}`;
    sub.textContent = title;
    pesan.textContent = message;
    ipop.textContent = tipe === "success" ? "✅ " + title : "❌ " + title;
}

function tutup() {
    const pop = document.getElementById("pop-up");
    pop.style.display = "none";
}