$(document).ready(function () {
    const $reveals = $('.reveal');
    const $avatars = $('.aboutus-content-avatar');
    const $vms = $('.vm');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
                observer.unobserve(entry.target);
            }
        });
    });

    $reveals.each(function () {
        observer.observe(this);
    });

    $vms.each(function (index) {
        const vm = this;
        setTimeout(() => {
            observer.observe(vm);
        }, index * 100);
    });

    $avatars.each(function (index) {
        const avatar = this;
        setTimeout(() => {
            observer.observe(avatar);
        }, index * 100);
    });
});
