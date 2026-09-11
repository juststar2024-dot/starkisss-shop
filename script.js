// =========================
// ⭐ ЗВЁЗДЫ
// =========================

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
            distanceX * distanceX +
            distanceY * distanceY
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


// =========================
// 🖼️ ГАЛЕРЕИ В УСЛУГАХ
// =========================

document.querySelectorAll(".service-gallery").forEach((gallery) => {

    const slides = gallery.querySelectorAll(".gallery-slide");
    const prevButton = gallery.querySelector(".gallery-prev");
    const nextButton = gallery.querySelector(".gallery-next");
    const dotsContainer = gallery.querySelector(".gallery-dots");

    if (
        !slides.length ||
        !prevButton ||
        !nextButton ||
        !dotsContainer
    ) {
        return;
    }

    let currentSlide = 0;
    let autoSlide;


    // ---------- ТОЧКИ ----------

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


    // ---------- ПОКАЗ СЛАЙДА ----------

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


    // ---------- СЛЕДУЮЩИЙ ----------

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }


    // ---------- ПРЕДЫДУЩИЙ ----------

    function prevSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    }


    // ---------- КНОПКИ ----------

    nextButton.addEventListener("click", () => {

        nextSlide();
        restartAutoSlide();

    });

    prevButton.addEventListener("click", () => {

        prevSlide();
        restartAutoSlide();

    });


    // ---------- АВТОПЕРЕКЛЮЧЕНИЕ ----------

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


// =========================
// 🐰 STARKI
// =========================

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


        // Мышка далеко
        if (distance > 300) {

            starki.classList.remove("scared");

            moveX *= 0.85;
            moveY *= 0.85;

            starki.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

            return;

        }


        // Мышка приближается
        starki.classList.add("scared");

        const angle = Math.atan2(dy, dx);
        const power = (300 - distance) / 300;
        const escape = power * 100;

        moveX = -Math.cos(angle) * escape;
        moveY = -Math.sin(angle) * escape;

        starki.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });


    document.addEventListener("mouseleave", () => {

        moveX = 0;
        moveY = 0;

        starki.style.transform = "translate(0, 0)";
        starki.classList.remove("scared");

    });

}


// =========================
// 💖 THANKS MASCOT
// =========================

const thanksMascot = document.querySelector(".thanks-mascot");
const thanksSpeech = document.querySelector("#thanksSpeech");

if (thanksMascot && thanksSpeech) {

    const thanksPhrases = [
        "Эй! Не тыкай в меня! ⭐",
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
        "（｡>‿‿<｡ ）",
        "Вы не видели Фелия?",
        "Фларри, перестань! ≧◡≦",
        "Ирид? Не знаю, кто это...",
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

        thanksSpeech.textContent =
            thanksPhrases[randomPhrase];

    });

}


// =========================
// 💕 LIKES MASCOT
// =========================

const likesMascot =
    document.querySelector(".likes-mascot");

if (likesMascot) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            likesMascot.classList.add("show");

        } else {

            likesMascot.classList.remove("show");

        }

    });

}


/* =========================================
   ГАЛЕРЕЯ НОВИНОК
   ========================================= */

const mediaGalleries = document.querySelectorAll(".new-product-image");

mediaGalleries.forEach(gallery => {

    const video = gallery.querySelector(".new-product-video");
    const photos = gallery.querySelectorAll(".new-product-photo");
    const thumbnails = gallery.querySelectorAll(".media-thumbnail");

    if (!video || thumbnails.length === 0) return;


    /* =========================================
       СОЗДАЁМ РАЗМЫТЫЙ ФОН
       ========================================= */

    let blurBackground = gallery.querySelector(".media-blur-bg");

    if (!blurBackground) {
        blurBackground = document.createElement("div");
        blurBackground.className = "media-blur-bg";

        blurBackground.style.position = "absolute";
        blurBackground.style.inset = "0";
        blurBackground.style.overflow = "hidden";
        blurBackground.style.zIndex = "0";
        blurBackground.style.pointerEvents = "none";
        blurBackground.style.background = "#171124";

        gallery.prepend(blurBackground);
    }


    /* =========================================
       ОБНОВЛЕНИЕ РАЗМЫТОГО ФОНА
       ========================================= */

    function updateBlurBackground(type) {

        blurBackground.innerHTML = "";

        let source;

        if (type === "video") {
            source = video;
        }

        if (type === "photo1") {
            source = photos[0];
        }

        if (type === "photo2") {
            source = photos[1];
        }

        if (!source) return;


        /* Создаём копию выбранного медиа */

        let backgroundMedia;

        if (source.tagName === "VIDEO") {

            backgroundMedia = document.createElement("video");

            backgroundMedia.src = source.currentSrc || source.src;

            backgroundMedia.autoplay = true;
            backgroundMedia.muted = true;
            backgroundMedia.loop = true;
            backgroundMedia.playsInline = true;

            backgroundMedia.setAttribute("muted", "");
            backgroundMedia.setAttribute("autoplay", "");
            backgroundMedia.setAttribute("loop", "");
            backgroundMedia.setAttribute("playsinline", "");

        } else {

            backgroundMedia = document.createElement("img");

            backgroundMedia.src = source.src;
            backgroundMedia.alt = "";

        }


        /* Стиль размытого фона */

        backgroundMedia.style.position = "absolute";
        backgroundMedia.style.inset = "-30px";

        backgroundMedia.style.width = "calc(100% + 60px)";
        backgroundMedia.style.height = "calc(100% + 60px)";

        backgroundMedia.style.objectFit = "cover";
        backgroundMedia.style.objectPosition = "center";

        backgroundMedia.style.filter = "blur(25px)";
        backgroundMedia.style.transform = "scale(1.15)";

        backgroundMedia.style.opacity = "0.75";

        backgroundMedia.style.pointerEvents = "none";


        blurBackground.appendChild(backgroundMedia);


        /* Если это видео — запускаем его */

        if (backgroundMedia.tagName === "VIDEO") {

            const playPromise = backgroundMedia.play();

            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        }
    }


    /* =========================================
       ПЕРЕКЛЮЧЕНИЕ МЕДИА
       ========================================= */

    thumbnails.forEach(thumbnail => {

        thumbnail.addEventListener("click", () => {

            const media = thumbnail.dataset.media;


            /* Сначала скрываем всё */

            video.classList.remove("active-media");

            photos.forEach(photo => {
                photo.classList.remove("active-media");
            });

            thumbnails.forEach(item => {
                item.classList.remove("active");
            });


            /* Показываем выбранное */

            if (media === "video") {

                video.classList.add("active-media");

                video.muted = true;

                const playPromise = video.play();

                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }

                updateBlurBackground("video");
            }


            if (media === "photo1") {

                if (photos[0]) {
                    photos[0].classList.add("active-media");
                }

                video.pause();

                updateBlurBackground("photo1");
            }


            if (media === "photo2") {

                if (photos[1]) {
                    photos[1].classList.add("active-media");
                }

                video.pause();

                updateBlurBackground("photo2");
            }


            /* Подсвечиваем выбранную миниатюру */

            thumbnail.classList.add("active");

        });

    });


    /* =========================================
       НАЧАЛЬНЫЙ ФОН
       ========================================= */

    updateBlurBackground("video");

});
// =========================================
// РАЗМЫТЫЙ ФОН ДЛЯ ГАЛЕРЕИ УСЛУГ
// =========================================

document.querySelectorAll(".service-gallery .gallery-slide").forEach(slide => {

    const img = slide.querySelector("img");

    if (img) {
        slide.style.setProperty(
            "--gallery-bg",
            `url("${img.src}")`
        );
    }

});