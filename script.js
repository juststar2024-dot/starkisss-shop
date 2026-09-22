// =========================
// ⭐ ЗВЁЗДЫ
// =========================

const isMobile =
    window.matchMedia("(max-width: 800px)").matches;


// Больше звёзд, но без mousemove
const starCount =
    isMobile ? 45 : 90;


for (let i = 0; i < starCount; i++) {

    const star =
        document.createElement("div");

    star.classList.add("star");


    // Случайная позиция
    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";


    // Разный размер
    const size =
        Math.random() * 2 + 1;

    star.style.width =
        `${size}px`;

    star.style.height =
        `${size}px`;


    // Разная задержка
    star.style.animationDelay =
        `${Math.random() * 4}s`;


    // Разная скорость мерцания
    star.style.animationDuration =
        `${2 + Math.random() * 3}s`;


    document.body.appendChild(star);

}

// =========================
// 🖼️ ГАЛЕРЕИ В УСЛУГАХ
// =========================

document
    .querySelectorAll(".service-gallery")
    .forEach((gallery) => {

        const slides =
            gallery.querySelectorAll(
                ".gallery-slide"
            );

        const prevButton =
            gallery.querySelector(
                ".gallery-prev"
            );

        const nextButton =
            gallery.querySelector(
                ".gallery-next"
            );

        const dotsContainer =
            gallery.querySelector(
                ".gallery-dots"
            );


        if (
            !slides.length ||
            !prevButton ||
            !nextButton ||
            !dotsContainer
        ) {
            return;
        }


        let currentSlide = 0;


        // =====================================
        // ТОЧКИ
        // =====================================

        slides.forEach(
            (slide, index) => {

                const dot =
                    document.createElement(
                        "button"
                    );


                dot.classList.add(
                    "gallery-dot"
                );


                if (index === 0) {

                    dot.classList.add(
                        "active"
                    );

                }


                dot.setAttribute(
                    "aria-label",
                    `Фото ${index + 1}`
                );


                dot.addEventListener(
                    "click",
                    () => {

                        showSlide(index);

                    }
                );


                dotsContainer.appendChild(
                    dot
                );

            }
        );


        const dots =
            dotsContainer.querySelectorAll(
                ".gallery-dot"
            );


        // =====================================
        // ПОКАЗ СЛАЙДА
        // =====================================

        function showSlide(index) {

            if (index < 0) {

                index =
                    slides.length - 1;

            }


            if (
                index >= slides.length
            ) {

                index = 0;

            }


            currentSlide =
                index;


            slides.forEach(
                (slide, i) => {

                    slide.classList.toggle(
                        "active",
                        i === currentSlide
                    );

                }
            );


            dots.forEach(
                (dot, i) => {

                    dot.classList.toggle(
                        "active",
                        i === currentSlide
                    );

                }
            );

        }


        // =====================================
        // НАЗАД
        // =====================================

        prevButton.addEventListener(
            "click",
            () => {

                showSlide(
                    currentSlide - 1
                );

            }
        );


        // =====================================
        // ВПЕРЁД
        // =====================================

        nextButton.addEventListener(
            "click",
            () => {

                showSlide(
                    currentSlide + 1
                );

            }
        );


        // =====================================
        // РАЗМЫТЫЙ ФОН
        // =====================================

        slides.forEach(
            slide => {

                const img =
                    slide.querySelector("img");


                if (img) {

                    slide.style.setProperty(
                        "--gallery-bg",
                        `url("${img.src}")`
                    );

                }

            }
        );


        // =====================================
        // НАЧАЛЬНЫЙ СЛАЙД
        // =====================================

        showSlide(0);

    });


// =========================
// 🐰 STARKI
// =========================

const starki =
    document.querySelector(".starki");

if (starki) {

    let moveX = 0;
    let moveY = 0;

    let mouseX = 0;
    let mouseY = 0;

    let starkiFrame = null;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;


            if (starkiFrame) {
                return;
            }


            starkiFrame =
                requestAnimationFrame(() => {

                    const rect =
                        starki.getBoundingClientRect();


                    const centerX =
                        rect.left +
                        rect.width / 2;

                    const centerY =
                        rect.top +
                        rect.height / 2;


                    const dx =
                        mouseX - centerX;

                    const dy =
                        mouseY - centerY;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    // Мышка далеко
                    if (distance > 300) {

                        starki.classList.remove(
                            "scared"
                        );


                        moveX *= 0.85;
                        moveY *= 0.85;


                        starki.style.transform =
                            `translate(${moveX}px, ${moveY}px)`;


                    } else {

                        // Мышка приближается
                        starki.classList.add(
                            "scared"
                        );


                        const angle =
                            Math.atan2(dy, dx);


                        const power =
                            (300 - distance) / 300;


                        const escape =
                            power * 100;


                        moveX =
                            -Math.cos(angle) *
                            escape;


                        moveY =
                            -Math.sin(angle) *
                            escape;


                        starki.style.transform =
                            `translate(${moveX}px, ${moveY}px)`;

                    }


                    starkiFrame = null;

                });

        },
        { passive: true }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            moveX = 0;
            moveY = 0;

            starki.style.transform =
                "translate(0, 0)";

            starki.classList.remove(
                "scared"
            );

        }
    );

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


/* =========================================
   ГАЛЕРЕЯ НОВИНОК
   ========================================= */

const mediaGalleries =
    document.querySelectorAll(".new-product-image");


mediaGalleries.forEach(gallery => {

    const video =
        gallery.querySelector(".new-product-video");

    const photos =
        gallery.querySelectorAll(".new-product-photo");

    const thumbnails =
        gallery.querySelectorAll(".media-thumbnail");


    if (!video || thumbnails.length === 0) {
        return;
    }


    /* =========================================
       РАЗМЫТЫЙ ФОН
       ========================================= */

    let blurBackground =
        gallery.querySelector(".media-blur-bg");


    if (!blurBackground) {

        blurBackground =
            document.createElement("div");

        blurBackground.className =
            "media-blur-bg";

        blurBackground.style.position =
            "absolute";

        blurBackground.style.inset =
            "0";

        blurBackground.style.overflow =
            "hidden";

        blurBackground.style.zIndex =
            "0";

        blurBackground.style.pointerEvents =
            "none";

        blurBackground.style.background =
            "#171124";

        gallery.prepend(
            blurBackground
        );

    }


    /* =========================================
       ОБЩИЕ СТИЛИ BLUR
       ========================================= */

    function styleBlurMedia(media) {

        media.style.position = "absolute";

        media.style.inset = "-30px";

        media.style.width =
            "calc(100% + 60px)";

        media.style.height =
            "calc(100% + 60px)";

        media.style.objectFit =
            "cover";

        media.style.objectPosition =
            "center";

        media.style.filter =
            "blur(25px)";

        media.style.transform =
            "scale(1.15)";

        media.style.opacity =
            "0.75";

        media.style.pointerEvents =
            "none";

    }


    /* =========================================
       BLUR ИЗ ФОТО
       ========================================= */

    function setImageBlur(source) {

        const image =
            document.createElement("img");

        image.src =
            source.src;

        image.alt = "";

        styleBlurMedia(
            image
        );

        blurBackground
            .appendChild(image);

    }


    /* =========================================
       BLUR ИЗ СТОП-КАДРА ВИДЕО
       ========================================= */

    function setVideoBlur() {

        if (
            !video.videoWidth ||
            !video.videoHeight
        ) {

            blurBackground.style.background =
                "#171124";

            return;

        }


        try {

            const canvas =
                document.createElement("canvas");

            canvas.width =
                video.videoWidth;

            canvas.height =
                video.videoHeight;


            const context =
                canvas.getContext("2d");


            if (!context) {
                return;
            }


            context.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height
            );


            const image =
                document.createElement("img");


            image.alt = "";


            image.src =
                canvas.toDataURL(
                    "image/jpeg",
                    0.7
                );


            styleBlurMedia(
                image
            );


            blurBackground
                .appendChild(image);


        } catch (error) {

            console.warn(
                "Не удалось создать blur для видео:",
                error
            );

            blurBackground.style.background =
                "#171124";

        }

    }


    /* =========================================
       ОБНОВЛЕНИЕ BLUR
       ========================================= */

    function updateBlurBackground(type) {

        blurBackground.innerHTML = "";


        if (type === "video") {

            /*
                Ждём кадр видео,
                но больше НЕ создаём второе видео.
            */

            if (video.readyState >= 2) {

                if (
                    "requestVideoFrameCallback"
                    in video
                ) {

                    video.requestVideoFrameCallback(
                        () => {
                            setVideoBlur();
                        }
                    );

                } else {

                    setTimeout(
                        setVideoBlur,
                        50
                    );

                }

            } else {

                video.addEventListener(
                    "loadeddata",
                    () => {
                        setVideoBlur();
                    },
                    { once: true }
                );

            }

        }


        if (type === "photo1") {

            if (photos[0]) {
                setImageBlur(
                    photos[0]
                );
            }

        }


        if (type === "photo2") {

            if (photos[1]) {
                setImageBlur(
                    photos[1]
                );
            }

        }

    }


    /* =========================================
       ПЕРЕКЛЮЧЕНИЕ МЕДИА
       ========================================= */

    thumbnails.forEach(
        thumbnail => {

            thumbnail.addEventListener(
                "click",
                () => {

                    const media =
                        thumbnail.dataset.media;


                    video.classList.remove(
                        "active-media"
                    );


                    photos.forEach(
                        photo => {

                            photo.classList.remove(
                                "active-media"
                            );

                        }
                    );


                    thumbnails.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* ---------- ВИДЕО ---------- */

                    if (
                        media === "video"
                    ) {

                        video.classList.add(
                            "active-media"
                        );


                        video.muted = true;


                        const playPromise =
                            video.play();


                        if (
                            playPromise !== undefined
                        ) {

                            playPromise.catch(
                                () => {}
                            );

                        }


                        updateBlurBackground(
                            "video"
                        );

                    }


                    /* ---------- ФОТО 1 ---------- */

                    if (
                        media === "photo1"
                    ) {

                        if (photos[0]) {

                            photos[0]
                                .classList
                                .add(
                                    "active-media"
                                );

                        }


                        video.pause();


                        updateBlurBackground(
                            "photo1"
                        );

                    }


                    /* ---------- ФОТО 2 ---------- */

                    if (
                        media === "photo2"
                    ) {

                        if (photos[1]) {

                            photos[1]
                                .classList
                                .add(
                                    "active-media"
                                );

                        }


                        video.pause();


                        updateBlurBackground(
                            "photo2"
                        );

                    }


                    thumbnail.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    /* =========================================
       ВИДЕО ИГРАЕТ ТОЛЬКО НА ЭКРАНЕ
       ========================================= */

    video.preload =
        "metadata";

    video.muted =
        true;

    video.playsInline =
        true;


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                /*
                                    Играем только если
                                    сейчас выбрано видео.
                                */

                                if (
                                    video.classList.contains(
                                        "active-media"
                                    )
                                ) {

                                    video.play()
                                        .catch(
                                            () => {}
                                        );

                                }

                            } else {

                                video.pause();

                            }

                        }
                    );

                },
                {
                    threshold: 0.35
                }
            );


        observer.observe(
            video
        );

    }


    /* =========================================
       НАЧАЛЬНОЕ СОСТОЯНИЕ
       ========================================= */

    updateBlurBackground(
        "video"
    );

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

// =========================================
// ⭐ СЕКРЕТНЫЙ ЕЖЕДНЕВНЫЙ БОНУС
// =========================================

const bonusMascot =
    document.querySelector(".mascot-image");

const bonusModal =
    document.querySelector("#dailyBonusModal");

const bonusClose =
    document.querySelector("#dailyBonusClose");

const bonusOk =
    document.querySelector("#dailyBonusOk");

const bonusReward =
    document.querySelector("#dailyBonusReward");

const bonusRarity =
    document.querySelector("#dailyBonusRarity");

const bonusTimer =
    document.querySelector("#dailyBonusTimer");

const bonusIssued =
    document.querySelector("#dailyBonusIssued");

const bonusExpires =
    document.querySelector("#dailyBonusExpires");


/*
    Если элементов бонуса нет на странице,
    просто ничего не делаем.
*/

if (
    bonusMascot &&
    bonusModal &&
    bonusClose &&
    bonusOk &&
    bonusReward &&
    bonusRarity &&
    bonusTimer &&
    bonusIssued &&
    bonusExpires
) {

    // =====================================
    // НАСТРОЙКИ
    // =====================================

    const BONUS_STORAGE_KEY =
        "starkisss_daily_bonus";

    const BONUS_DURATION =
        24 * 60 * 60 * 1000;


    // =====================================
    // СИНХРОНИЗАЦИЯ С ВРЕМЕНЕМ СЕРВЕРА
    // =====================================

    let serverTimeOffset = 0;


    async function syncServerTime() {

        try {

            const response =
                await fetch(
                    "/.netlify/functions/server-time",
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {
                throw new Error(
                    "Не удалось получить серверное время"
                );
            }


            const data =
                await response.json();


            if (
                typeof data.now !== "number"
            ) {
                throw new Error(
                    "Сервер вернул неправильное время"
                );
            }


            /*
                Разница между серверными часами
                и часами устройства.
            */

            serverTimeOffset =
                data.now - Date.now();


        } catch (error) {

            console.warn(
                "Не удалось синхронизировать время:",
                error
            );

            /*
                Если Netlify временно недоступен,
                используем время устройства.
            */

            serverTimeOffset = 0;

        }

    }


    function getRealTime() {

        return Date.now() + serverTimeOffset;

    }


    // =====================================
    // НАГРАДЫ
    // =====================================

    const rewards = [

        {
            reward: "3% скидки ✦",
            rarity: "Обычная",
            chance: 50
        },

        {
            reward: "5% скидки ✦",
            rarity: "Частая",
            chance: 25
        },

        {
            reward: "7% скидки ✦",
            rarity: "Редкая",
            chance: 12
        },

        {
            reward: "10% скидки ✦",
            rarity: "Очень редкая",
            chance: 5
        },

        {
            reward: "1 значок бесплатно ✦",
            rarity: "Очень редкая",
            chance: 3
        },

        {
            reward: "1 3D стикер бесплатно ✦",
            rarity: "Очень редкая",
            chance: 2
        },

        {
            reward: "Брелочек в подарок ✦",
            rarity: "Особая",
            chance: 3
        }

    ];


    // =====================================
    // ФОРМАТИРОВАНИЕ ДАТЫ
    // =====================================

    function formatBonusDate(timestamp) {

        const date =
            new Date(timestamp);


        return date.toLocaleString(
            "ru-RU",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    // =====================================
    // СЛУЧАЙНАЯ НАГРАДА
    // =====================================

    function getRandomReward() {

        const random =
            Math.random() * 100;

        let current = 0;


        for (const item of rewards) {

            current += item.chance;


            if (random < current) {
                return item;
            }

        }


        return rewards[0];

    }


    // =====================================
    // ЧИТАЕМ СОХРАНЁННЫЙ БОНУС
    // =====================================

    function getSavedBonus() {

        const saved =
            localStorage.getItem(
                BONUS_STORAGE_KEY
            );


        if (!saved) {
            return null;
        }


        try {

            return JSON.parse(saved);

        } catch {

            localStorage.removeItem(
                BONUS_STORAGE_KEY
            );

            return null;

        }

    }


    // =====================================
    // СОЗДАЁМ НОВЫЙ БОНУС
    // =====================================

    function createBonus() {

        const createdAt =
            getRealTime();


        const reward =
            getRandomReward();


        const bonus = {

            reward:
                reward.reward,

            rarity:
                reward.rarity,

            createdAt:
                createdAt

        };


        localStorage.setItem(
            BONUS_STORAGE_KEY,
            JSON.stringify(bonus)
        );


        return bonus;

    }


    // =====================================
    // ПОЛУЧАЕМ АКТУАЛЬНЫЙ БОНУС
    // =====================================

    function getBonus() {

        const saved =
            getSavedBonus();


        if (!saved) {
            return createBonus();
        }


        const age =
            getRealTime() -
            saved.createdAt;


        if (age >= BONUS_DURATION) {

            localStorage.removeItem(
                BONUS_STORAGE_KEY
            );


            return createBonus();

        }


        return saved;

    }


    // =====================================
    // ТАЙМЕР
    // =====================================

    let timerInterval = null;


    function updateTimer(createdAt) {

        clearInterval(timerInterval);


        function tick() {

            const elapsed =
                getRealTime() -
                createdAt;


            const remaining =
                Math.max(
                    0,
                    BONUS_DURATION -
                    elapsed
                );


            const hours =
                Math.floor(
                    remaining / 3600000
                );


            const minutes =
                Math.floor(
                    (remaining % 3600000) /
                    60000
                );


            const seconds =
                Math.floor(
                    (remaining % 60000) /
                    1000
                );


            const formatted =
                `${String(hours).padStart(2, "0")}:` +
                `${String(minutes).padStart(2, "0")}:` +
                `${String(seconds).padStart(2, "0")}`;


            if (remaining > 0) {

                bonusTimer.textContent =
                    `Следующий бонус через ${formatted}`;

            } else {

                bonusTimer.textContent =
                    "Новый бонус уже доступен ✦";

            }


            if (remaining <= 0) {

                clearInterval(
                    timerInterval
                );

            }

        }


        tick();


        timerInterval =
            setInterval(
                tick,
                1000
            );

    }


    // =====================================
    // ОТКРЫВАЕМ БОНУС
    // =====================================

    async function openBonus() {

        /*
            Перед открытием ещё раз
            синхронизируемся с сервером.
        */

        await syncServerTime();


        const bonus =
            getBonus();


        const expiresAt =
            bonus.createdAt +
            BONUS_DURATION;


        // Награда
        bonusReward.textContent =
            bonus.reward;


        // Редкость
        bonusRarity.textContent =
            bonus.rarity;


        // Дата выдачи
        bonusIssued.textContent =
            formatBonusDate(
                bonus.createdAt
            );


        // Дата окончания
        bonusExpires.textContent =
            formatBonusDate(
                expiresAt
            );


        // Таймер
        updateTimer(
            bonus.createdAt
        );


        // Открываем окно
        bonusModal.classList.add(
            "show"
        );

    }


    // =====================================
    // ЗАКРЫВАЕМ ОКНО
    // =====================================

    function closeBonus() {

        bonusModal.classList.remove(
            "show"
        );


        clearInterval(
            timerInterval
        );

    }


    // =====================================
    // КЛИК ПО STARKI
    // =====================================

    bonusMascot.addEventListener(
        "click",
        openBonus
    );


    // =====================================
    // КНОПКА "ЗАБРАТЬ БОНУС"
    // =====================================

    bonusOk.addEventListener(
        "click",
        () => {

            window.open(
                "https://t.me/StarkisssSupport_bot",
                "_blank"
            );

        }
    );


    // =====================================
    // КНОПКА ЗАКРЫТИЯ
    // =====================================

    bonusClose.addEventListener(
        "click",
        closeBonus
    );


    // =====================================
    // КЛИК ПО ЗАТЕМНЕНИЮ
    // =====================================

    bonusModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === bonusModal
            ) {

                closeBonus();

            }

        }
    );


    // =====================================
    // ПЕРВАЯ СИНХРОНИЗАЦИЯ
    // =====================================

    syncServerTime();

}
// =========================================
// ⭐ ПЕРЕКЛЮЧАТЕЛЬ РЕФЕРЕНСОВ STARKI
// =========================================

const mascotReferenceImage =
    document.querySelector(
        "#mascotReferenceImage"
    );

const mascotReferenceCaption =
    document.querySelector(
        "#mascotReferenceCaption"
    );

const mascotReferenceDots =
    document.querySelector(
        "#mascotReferenceDots"
    );

const mascotReferencePrev =
    document.querySelector(
        ".mascot-reference-prev"
    );

const mascotReferenceNext =
    document.querySelector(
        ".mascot-reference-next"
    );


if (
    mascotReferenceImage &&
    mascotReferenceCaption &&
    mascotReferenceDots &&
    mascotReferencePrev &&
    mascotReferenceNext
) {

    const references = [

        {
            image:
                "./image/StarkiOrig.jpg",

            alt:
                "Starki — основной референс",

            title:
                "Основной референс"
        },

        {
            image:
                "./image/StarkiCost.jpg",

            alt:
                "Starki — вариант костюма",

            title:
                "Вариант костюма"
        }

    ];


    let currentReference = 0;


    // =====================================
    // ТОЧКИ
    // =====================================

    references.forEach(
        (reference, index) => {

            const dot =
                document.createElement(
                    "button"
                );


            dot.className =
                "mascot-reference-dot";


            dot.setAttribute(
                "aria-label",
                `Референс ${index + 1}`
            );


            if (index === 0) {

                dot.classList.add(
                    "active"
                );

            }


            dot.addEventListener(
                "click",
                () => {

                    showReference(
                        index
                    );

                }
            );


            mascotReferenceDots.appendChild(
                dot
            );

        }
    );


    const referenceDots =
        mascotReferenceDots.querySelectorAll(
            ".mascot-reference-dot"
        );


    // =====================================
    // ПОКАЗ РЕФЕРЕНСА
    // =====================================

    function showReference(index) {

        if (index < 0) {

            index =
                references.length - 1;

        }


        if (
            index >=
            references.length
        ) {

            index = 0;

        }


        currentReference =
            index;


        const reference =
            references[
                currentReference
            ];


        mascotReferenceImage.style.opacity =
            "0";


        setTimeout(
            () => {

                mascotReferenceImage.src =
                    reference.image;

                mascotReferenceImage.alt =
                    reference.alt;


                mascotReferenceImage.style.opacity =
                    "1";

            },
            150
        );


        mascotReferenceCaption.innerHTML =
            `<span>${String(
                currentReference + 1
            ).padStart(2, "0")}</span>
            ${reference.title}`;


        referenceDots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex ===
                    currentReference
                );

            }
        );

    }


    // =====================================
    // НАЗАД
    // =====================================

    mascotReferencePrev.addEventListener(
        "click",
        () => {

            showReference(
                currentReference - 1
            );

        }
    );


    // =====================================
    // ВПЕРЁД
    // =====================================

    mascotReferenceNext.addEventListener(
        "click",
        () => {

            showReference(
                currentReference + 1
            );

        }
    );

}
// =========================================
// ✨ АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ
// =========================================

const revealSections = document.querySelectorAll(`
    .about-section,
    .new-arrivals,
    .services-section,
    .order-queue,
    .mascot-reference-section,
    .mascot-about,
    .fanart-section,
    .merch-section,
    .merch-bottom,
    .info-section
`);


const revealCards = document.querySelectorAll(`
    .service-card,
    .new-product-card,
    .queue-column,
    .fanart-card,
    .merch-card
`);


/* =========================================
   СЕКЦИИ
   ========================================= */

revealSections.forEach(section => {
    section.classList.add("scroll-reveal");
});


/* =========================================
   КАРТОЧКИ
   ========================================= */

revealCards.forEach((card, index) => {

    card.classList.add("scroll-reveal-card");

    /*
        Небольшая задержка для каждой карточки.
        Максимум 240 мс, чтобы они не ждали слишком долго.
    */

    const delay =
        Math.min(index % 4, 3) * 80;

    card.style.setProperty(
        "--reveal-delay",
        `${delay}ms`
    );

});


/* =========================================
   OBSERVER
   ========================================= */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                entry.target.classList.add(
                    "is-visible"
                );


                /*
                    После появления больше
                    не следим за элементом.
                */

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


/* =========================================
   ЗАПУСК
   ========================================= */

document
    .querySelectorAll(
        ".scroll-reveal, .scroll-reveal-card"
    )
    .forEach(element => {

        revealObserver.observe(
            element
        );

    });
// =========================================
// 📱 МОБИЛЬНОЕ БОКОВОЕ МЕНЮ
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const mobileMenuButton =
            document.getElementById(
                "mobileMenuButton"
            );

        const mobileMenuOverlay =
            document.getElementById(
                "mobileMenuOverlay"
            );

        const mobileMenuClose =
            document.getElementById(
                "mobileMenuClose"
            );


        // Если элементов нет —
        // просто ничего не делаем

        if (
            !mobileMenuButton ||
            !mobileMenuOverlay ||
            !mobileMenuClose
        ) {
            return;
        }


        // ОТКРЫТЬ МЕНЮ

        mobileMenuButton.addEventListener(
            "click",
            () => {

                mobileMenuOverlay.classList.add(
                    "active"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );


        // ЗАКРЫТЬ ПО КРЕСТИКУ

        mobileMenuClose.addEventListener(
            "click",
            () => {

                mobileMenuOverlay.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }
        );


        // ЗАКРЫТЬ ПО КЛИКУ ВНЕ ПАНЕЛИ

        mobileMenuOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    mobileMenuOverlay
                ) {

                    mobileMenuOverlay.classList.remove(
                        "active"
                    );

                    document.body.style.overflow =
                        "";

                }

            }
        );


        // ЗАКРЫТЬ ПО КЛИКУ НА ССЫЛКУ

        const mobileMenuLinks =
            mobileMenuOverlay.querySelectorAll(
                ".mobile-menu-nav a"
            );


        mobileMenuLinks.forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenuOverlay.classList.remove(
                            "active"
                        );

                        document.body.style.overflow =
                            "";

                    }
                );

            }
        );


        // ESC

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    mobileMenuOverlay.classList.remove(
                        "active"
                    );

                    document.body.style.overflow =
                        "";

                }

            }
        );

    }
);