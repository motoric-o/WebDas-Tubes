function scrollSubIntro() {
    $('#intro').css({ "transform": "translateY(-20px)", "margin-top": "0px", "opacity": "0%", "height": "0" });
}

function scrollExplore() {
    setTimeout(() => {
        $('#to-foods').css({ "transform": "translateY(0px)", "opacity": "100%" });
    }, 200);
    setTimeout(() => {
        $('#to-beverages').css({ "transform": "translateY(0px)", "opacity": "100%" });
    }, 400);
    setTimeout(() => {
        $('#to-snacks').css({ "transform": "translateY(0px)", "opacity": "100%" });
    }, 600);

    setTimeout(() => {
        $('#to-foods').css({ "transition": "all 0.25s ease-in-out" });
        $('#to-beverages').css({ "transition": "all 0.25s ease-in-out" });
        $('#to-snacks').css({ "transition": "all 0.25s ease-in-out" });
    }, 700);
}

function scrollCulinary() {
    $('#img-collection-culinary').css({ "transition": "all 2s ease-in-out", "transform": "translateY(0px)", "opacity": "100%" });
}


$('body').css({ "overflow-y": "hidden" });
$('#intro').css({ "opacity": "0%", "transform": "translateY(80px)" });
$('#hero-container').css({ "opacity": "0%", "transform": "translateY(80px)" });
$('#img-collection-hero').css({ "opacity": "0%", "transform": "translateY(-80px)" });
$(document).ready(function () {
    const scrollEntry = $('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id == 'sub-intro-scroll') {
                    scrollSubIntro();
                } else if (entry.target.id == 'culinary-scroll') {
                    scrollCulinary();
                } else if (entry.target.id == 'explore-scroll') {
                    scrollExplore();
                }
                
                if (entry.target.id == 'sub-intro-scroll') {
                    $('#sub-intro').addClass("revealed");
                } else if (entry.target.id == 'culinary-scroll') {
                    $('#img-collection-culinary').addClass("revealed");
                    $('#culinary-container').addClass("revealed");
                } else if (entry.target.id == 'explore-scroll') {
                    $('#explore').addClass("revealed");
                }
                
                observer.unobserve(entry.target);
            }
        });
    });

    scrollEntry.each(function () {
        observer.observe(this);
    });

    $('#hero-container').css({ "transition": "all 1s ease-in-out", "transform": "translateY(0px)", "opacity": "100%" });
    $('#img-collection-hero').css({ "transition": "all 2s ease-in-out", "transform": "translateY(0px)", "opacity": "100%" });
    setTimeout(() => {
        if ($('#sub-intro').hasClass("revealed") == false) {
            $('#intro').css({ "transition": "all 1s ease-in-out", "transform": "translateY(0px)", "opacity": "100%" });
        }
    }, 1200);
    setTimeout(() => {
        $('body').css({ "overflow-y": "auto" });
    }, 2000);

    $('#to-foods').click(function () {
        window.location = "foods.html";
    });

    $('#to-beverages').click(function () {
        window.location = "beverages.html";
    });

    $('#to-snacks').click(function () {
        window.location = "snacks.html";
    });
});