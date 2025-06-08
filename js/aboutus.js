document.addEventListener("DOMContentLoaded", function() {
    const reveals = document.querySelectorAll('.reveal');
    const avatars = document.querySelectorAll('.aboutus-content-avatar');
    const vms = document.querySelectorAll('#vm')

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    vms.forEach((vm, index) => {
        setTimeout(() => {
            observer.observe(vm);
        }, index * 100);
    });

    avatars.forEach((avatar, index) => {
        setTimeout(() => {
            observer.observe(avatar);
        }, index * 100);
    });
});
