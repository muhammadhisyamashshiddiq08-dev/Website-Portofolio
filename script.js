document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // 2. Logika Animated Counter (Wajib)
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Semakin kecil, semakin cepat

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    // Gunakan IntersectionObserver agar counter berjalan saat terlihat
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Hanya jalan sekali
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // 3. Scrollspy & Navbar Active State
    // Bootstrap 5 menangani scrollspy via data-bs-spy, tapi kita butuh custom logic 
    // untuk memastikan class active pada navbar saat di-scroll (karena SPA).
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll("#mainNavbar .nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });

        navLi.forEach((li) => {
            li.classList.remove("active");
            if (li.getAttribute("href") === `#${current}`) {
                li.classList.add("active");
            }
        });
    });

    // 4. Smooth Scroll untuk Navbar (jika belum support CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                window.scrollTo({
                    top: target.offsetTop - 70, // offset untuk navbar fixed
                    behavior: 'smooth'
                });
            }
        });
    });
});