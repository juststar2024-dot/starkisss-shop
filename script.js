const starCount = 100;
const stars = [];

for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");

    star.classList.add("star");

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 3 + "s";

    document.body.appendChild(star);

    stars.push(star);
}

document.addEventListener("mousemove", (event) => {
    stars.forEach((star) => {
        const rect = star.getBoundingClientRect();

        const starX = rect.left + rect.width / 2;
        const starY = rect.top + rect.height / 2;

        const distanceX = starX - event.clientX;
        const distanceY = starY - event.clientY;

        const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY
        );

        if (distance < 150) {
            const strength = (150 - distance) / 150;

            const moveX = distanceX * strength * 0.15;
            const moveY = distanceY * strength * 0.15;

            star.style.translate = `${moveX}px ${moveY}px`;
        } else {
            star.style.translate = "0px 0px";
        }
    });
});
/* ========================================= */
/* ГАЛЕРЕИ В УСЛУГАХ */
/* ========================================= */

document.querySelectorAll(".service-gallery").forEach((gallery) => {

    const slides = gallery.querySelectorAll(".gallery-slide");
    const prevButton = gallery.querySelector(".gallery-prev");
    const nextButton = gallery.querySelector(".gallery-next");
    const dotsContainer = gallery.querySelector(".gallery-dots");

    let currentSlide = 0;
    let autoSlide;


    /* ---------- СОЗДАЁМ ТОЧКИ ---------- */

    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.classList.add("gallery-dot");

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            showSlide(index);
            restartAutoSlide();
        });

        dotsContainer.appendChild(dot);

    });


    const dots = dotsContainer.querySelectorAll(".gallery-dot");


    /* ---------- ПОКАЗ СЛАЙДА ---------- */

    function showSlide(index) {

        currentSlide = index;

        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });

        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    /* ---------- СЛЕДУЮЩИЙ ---------- */

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }


    /* ---------- ПРЕДЫДУЩИЙ ---------- */

    function prevSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    }


    /* ---------- КНОПКИ ---------- */

    nextButton.addEventListener("click", () => {

        nextSlide();
        restartAutoSlide();

    });


    prevButton.addEventListener("click", () => {

        prevSlide();
        restartAutoSlide();

    });


    /* ---------- АВТОПЕРЕКЛЮЧЕНИЕ ---------- */

    function startAutoSlide() {

        autoSlide = setInterval(() => {

            nextSlide();

        }, 4000);

    }


    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    startAutoSlide();

});
/* =========================
   STARKI УБЕГАЕТ ОТ МЫШКИ
========================= */

/* ================= STARKI ================= */

const starki = document.querySelector(".starki");

if (starki) {

    let moveX = 0;
    let moveY = 0;

    document.addEventListener("mousemove", (event) => {

        const rect = starki.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        /* мышка далеко — Starki спокойно подпрыгивает */

        if (distance > 300) {

            starki.classList.remove("scared");

            moveX *= 0.85;
            moveY *= 0.85;

            starki.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

            return;
        }

        /* мышка приближается */

        starki.classList.add("scared");

        const angle = Math.atan2(dy, dx);

        const power = (300 - distance) / 300;

        const escape = power * 100;

        moveX = -Math.cos(angle) * escape;
        moveY = -Math.sin(angle) * escape;

        starki.style.transform =
            `translate(${moveX}px, ${moveY}px)`;
    });


    /* когда мышка уходит со страницы */

    document.addEventListener("mouseleave", () => {

        moveX = 0;
        moveY = 0;

        starki.style.transform =
            "translate(0, 0)";

        starki.classList.remove("scared");

    });

}
const thanksMascot = document.querySelector(".thanks-mascot");
const thanksSpeech = document.querySelector("#thanksSpeech");

if (thanksMascot && thanksSpeech) {

    const thanksPhrases = [
        "Эй! Не тыкайся в меня! ⭐",
        "О, салют! :3",
        "Ты меня поймал...",
        "Я вообще-то занят сиянием!",
        "Хи-хи, спасибо за визит! ✨",
        "Звёзды говорят, что ты классный.",
        "Ммм... а ты точно не за заказом?",
        "Старки одобряет! ✦",
        "*подмигивает*",
        "Не забудь заглянуть в магазин!",
        "Псс... там новинки появились 👀",
        "Я тут главный по звёздам!",
        "Что? У меня что-то на лице?",
        "Ладно, можешь ещё раз навести :3"
    ];

    let lastPhrase = -1;

    thanksMascot.addEventListener("mouseenter", () => {

        let randomPhrase;

        do {
            randomPhrase = Math.floor(
                Math.random() * thanksPhrases.length
            );
        } while (
            randomPhrase === lastPhrase &&
            thanksPhrases.length > 1
        );

        lastPhrase = randomPhrase;

        thanksSpeech.textContent = thanksPhrases[randomPhrase];
    });
}