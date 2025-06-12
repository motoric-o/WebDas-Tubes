$(document).ready(function () {
    const $reveals = $('.reveal');
    const $avatars = $('.aboutus-content-avatar');
    const $vms = $('.vm');
    const avatarScroll = $('#avatar-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id == 'avatar-scroll') {
                    $avatars.each(function (index) {
                        const avatar = this;
                        setTimeout(() => {
                            $(avatar).addClass('visible');
                        }, index * 100);
                    });
                } else {
                    if (screen.width >= 1024 || window.innerWidth >= 1024) {
                        if (entry.target.classList.contains("aboutus-content-avatar") == false) {
                            $(entry.target).addClass('visible');
                        }
                    } else {
                        $(entry.target).addClass('visible');
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    });

    $reveals.each(function () {
        observer.observe(this);
    });

    $vms.each(function (index) {
        setTimeout(() => {
            const vm = this;
            setTimeout(() => {
                observer.observe(vm);
            }, index * 100);
        }, 400);
    });

    $avatars.each(function (index) {
        setTimeout(() => {
            observer.observe(this);
        }, index * 100);
    });

    avatarScroll.each(function () {
        observer.observe(this);
    })
});
