function mail() {
    var contact = {
        name : document.getElementById("nama").value,
        email : document.getElementById("email").value,
        subject : document.getElementById("subjek").value,
        message : document.getElementById("pesan").value
    };

    emailjs.send("service_2l7af29", "template_tlh50cx", contact).then(function(){
        alert("Email terkirim.");
    });
};

