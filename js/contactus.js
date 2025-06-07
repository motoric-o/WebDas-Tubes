function mail(event) {
    event.preventDefault();

    let check = true;

    if (document.getElementById("name").value.trim() === "") {
        document.getElementById("name").nextElementSibling.classList.add("active");
        check = false
    }
    else {
        document.getElementById("name").nextElementSibling.classList.remove("active");
    }

    if (document.getElementById("email").value.trim() === "") {
        document.getElementById("email").nextElementSibling.classList.add("active");
        check = false
    }
    else {
        document.getElementById("email").nextElementSibling.classList.remove("active");
    }

    if (document.getElementById("subject").value.trim() === "") {
        document.getElementById("subject").nextElementSibling.classList.add("active");
        check = false
    }
    else {
        document.getElementById("subject").nextElementSibling.classList.remove("active");
    }

    if (document.getElementById("message").value.trim() === "") {
        document.getElementById("message").nextElementSibling.classList.add("active");
        check = false
    }
    else {
        document.getElementById("message").nextElementSibling.classList.remove("active");
    }

    if (!check) return;

    var contact = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        subject : document.getElementById("subject").value,
        message : document.getElementById("message").value,
    };

    const serviceId = 'service_9b3enrq';
    const templateId = 'template_9m3lcja';

    emailjs.send(serviceId, templateId, contact)
    .then(function(){
        alert("Email terkirim.");
        document.querySelector("form").reset();
        document.querySelectorAll(".error-txt").forEach(e => e.classList.remove("active"));
    })
    .catch(function(error){
        console.error("Gagal mengirim email:", error);
        alert("Terjadi kesalahan saat mengirim email.");
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