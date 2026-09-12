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
// =========================================
// ГАЛЕРЕЯ ТОВАРОВ В НАЛИЧИИ
// =========================================

document.querySelectorAll(".handmade-gallery").forEach(gallery => {
    const slides = gallery.querySelectorAll(".handmade-slide");
    const prevButton = gallery.querySelector(".handmade-gallery-prev");
    const nextButton = gallery.querySelector(".handmade-gallery-next");
    const dotsContainer = gallery.querySelector(".handmade-gallery-dots");

    if (!slides.length) return;

    let currentSlide = 0;
    let autoSlide;

    // Создаём точки
    slides.forEach((slide, index) => {
        const dot = document.createElement("button");

        dot.className = "handmade-gallery-dot";

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.setAttribute("aria-label", `Фото ${index + 1}`);

        dot.addEventListener("click", () => {
            showSlide(index);
            restartAutoSlide();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".handmade-gallery-dot");

    // Показать конкретное фото
    function showSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }

        currentSlide = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    // Следующее фото
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Предыдущее фото
    function previousSlide() {
        showSlide(currentSlide - 1);
    }

    // Автоматическая смена
    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, 4000);
    }

    // Перезапускаем таймер после ручного переключения
    function restartAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // Кнопка назад
    if (prevButton) {
        prevButton.addEventListener("click", event => {
            event.stopPropagation();
            previousSlide();
            restartAutoSlide();
        });
    }

    // Кнопка вперёд
    if (nextButton) {
        nextButton.addEventListener("click", event => {
            event.stopPropagation();
            nextSlide();
            restartAutoSlide();
        });
    }

    // Размытый фон для каждого изображения
    slides.forEach(slide => {
        const img = slide.querySelector("img");

        if (img) {
            slide.style.setProperty(
                "--handmade-bg",
                `url("${img.src}")`
            );
        }
    });

    // Запускаем автоматическую смену
    startAutoSlide();
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