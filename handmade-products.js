// =========================================
// 🛍️ ТОВАРЫ В НАЛИЧИИ
// =========================================

const SUPABASE_URL = "https://kyqmarqtduhqndbnsfer.supabase.co";
const SUPABASE_KEY = "sb_publishable_p4iG7aCbUOU_hclOhVh6wg_uxaCo92g";


const supabaseProducts =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


const handmadeProducts =
    document.getElementById(
        "handmadeProducts"
    );


// =========================================
// ЗАГРУЗКА ТОВАРОВ
// =========================================

async function loadHandmadeProducts() {

    if (!handmadeProducts) {
        return;
    }


    handmadeProducts.innerHTML = `
        <p class="admin-loading">
            Загружаем товары...
        </p>
    `;


    const {
        data,
        error
    } =
        await supabaseProducts
            .from("products")
            .select("*")
            .eq("status", "В наличии")
            .order("position", {
                ascending: true
            })
            .order("id", {
                ascending: true
            });


    if (error) {

        console.error(
            "Ошибка загрузки товаров:",
            error
        );


        handmadeProducts.innerHTML = `
            <p>
                Не удалось загрузить товары.
            </p>
        `;

        return;
    }

const handmadeData = (data || []).filter(product =>
    !product.category ||
    product.category === "В наличии"
);

    renderHandmadeProducts(
    handmadeData
);

}


// =========================================
// ОТОБРАЖЕНИЕ ТОВАРОВ
// =========================================

function renderHandmadeProducts(
    products
) {

    handmadeProducts.innerHTML = "";


    if (!products.length) {

        handmadeProducts.innerHTML = `
            <div class="handmade-empty">

                <p class="small-title">
                    ✦ SHOP ✦
                </p>

                <h3>
                    Сейчас ничего нет в наличии
                </h3>

                <p>
                    Но скоро здесь появятся новые вещи ✨
                </p>

            </div>
        `;

        return;
    }


    products.forEach(
        (product) => {

            const card =
                createHandmadeCard(
                    product
                );

            handmadeProducts.appendChild(
                card
            );

        }
    );


    // Запускаем галереи после создания карточек
    initHandmadeGalleries();

}


// =========================================
// СОЗДАНИЕ КАРТОЧКИ
// =========================================

function createHandmadeCard(
    product
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "handmade-card";


    // -------------------------------------
    // ФОТО
    // -------------------------------------

    const photos = [
        product.photo_1,
        product.photo_2,
        product.photo_3
    ].filter(Boolean);


    let galleryHTML = "";


    if (photos.length) {

        galleryHTML = `

            <div class="handmade-gallery">

                ${photos.map(
                    (photo, index) => `
                    
                    <div
    class="handmade-slide ${index === 0 ? "active" : ""}"
    style="--handmade-bg: url('${escapeHTML(photo)}')"
>

                        <img
                            src="${escapeHTML(photo)}"
                            alt="${escapeHTML(product.title)}"
                        >

                    </div>

                    `
                ).join("")}


                ${
                    photos.length > 1

                    ? `

                        <button
                            type="button"
                            class="handmade-gallery-prev"
                            aria-label="Предыдущее фото"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            class="handmade-gallery-next"
                            aria-label="Следующее фото"
                        >
                            ›
                        </button>

                        <div
                            class="handmade-gallery-dots"
                        ></div>

                    `

                    : ""
                }

            </div>

        `;

    } else {

        galleryHTML = `

            <div class="handmade-image">

                <span>
                    ФОТО ТОВАРА
                </span>

                <div class="handmade-badge">
                    В НАЛИЧИИ
                </div>

            </div>

        `;

    }


    // -------------------------------------
    // ССЫЛКИ
    // -------------------------------------

    let linksHTML = "";


    if (product.telegram_url) {

        linksHTML += `

            <a
                href="${escapeHTML(product.telegram_url)}"
                target="_blank"
                rel="noopener noreferrer"
                class="handmade-link handmade-link-telegram"
            >
                Узнать подробнее ↗
            </a>

        `;

    }


    if (product.wildberries_url) {

        linksHTML += `

            <a
                href="${escapeHTML(product.wildberries_url)}"
                target="_blank"
                rel="noopener noreferrer"
                class="handmade-link handmade-link-wb"
            >
                Купить на WB ↗
            </a>

        `;

    }


    if (product.ozon_url) {

        linksHTML += `

            <a
                href="${escapeHTML(product.ozon_url)}"
                target="_blank"
                rel="noopener noreferrer"
                class="handmade-link handmade-link-ozon"
            >
                Купить на Ozon ↗
            </a>

        `;

    }


    // -------------------------------------
    // КАРТОЧКА
    // -------------------------------------

    card.innerHTML = `

        <div class="handmade-image-wrapper">

            ${galleryHTML}


            ${
                photos.length

                ? `
                    <div class="handmade-badge">
                        В НАЛИЧИИ
                    </div>
                  `

                : ""
            }

        </div>


        <div class="handmade-info">

            <p class="handmade-label">
                ✦ UNIQUE ✦
            </p>


            <h3>
                ${escapeHTML(product.title)}
            </h3>


            <p>
                ${escapeHTML(
                    product.description || ""
                )}
            </p>


            <div class="handmade-bottom">

                <strong>
                    ${escapeHTML(
                        product.price || ""
                    )}
                </strong>


                <div class="handmade-links">${linksHTML}</div>

            </div>

        </div>

    `;


    return card;

}


// =========================================
// ГАЛЕРЕИ
// =========================================

function initHandmadeGalleries() {

    document
        .querySelectorAll(
            ".handmade-gallery"
        )
        .forEach(
            (gallery) => {

                const slides =
                    gallery.querySelectorAll(
                        ".handmade-slide"
                    );


                const prevButton =
                    gallery.querySelector(
                        ".handmade-gallery-prev"
                    );


                const nextButton =
                    gallery.querySelector(
                        ".handmade-gallery-next"
                    );


                const dotsContainer =
                    gallery.querySelector(
                        ".handmade-gallery-dots"
                    );


                if (
                    !slides.length ||
                    !dotsContainer
                ) {
                    return;
                }


                let currentSlide = 0;

                let autoSlide = null;


                // =================================
                // ТОЧКИ
                // =================================

                slides.forEach(
                    (slide, index) => {

                        const dot =
                            document.createElement(
                                "button"
                            );


                        dot.type =
                            "button";


                        dot.className =
                            "handmade-gallery-dot";


                        dot.setAttribute(
                            "aria-label",
                            `Фото ${index + 1}`
                        );


                        if (
                            index === 0
                        ) {

                            dot.classList.add(
                                "active"
                            );

                        }


                        dot.addEventListener(
                            "click",
                            () => {

                                showSlide(
                                    index
                                );

                                restartAutoSlide();

                            }
                        );


                        dotsContainer.appendChild(
                            dot
                        );

                    }
                );


                const dots =
                    dotsContainer.querySelectorAll(
                        ".handmade-gallery-dot"
                    );


                // =================================
                // ПОКАЗ СЛАЙДА
                // =================================

                function showSlide(
                    index
                ) {

                    if (
                        index < 0
                    ) {

                        index =
                            slides.length - 1;

                    }


                    if (
                        index >=
                        slides.length
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


                // =================================
                // НАЗАД
                // =================================

                if (
                    prevButton
                ) {

                    prevButton.addEventListener(
                        "click",
                        () => {

                            showSlide(
                                currentSlide - 1
                            );

                            restartAutoSlide();

                        }
                    );

                }


                // =================================
                // ВПЕРЁД
                // =================================

                if (
                    nextButton
                ) {

                    nextButton.addEventListener(
                        "click",
                        () => {

                            showSlide(
                                currentSlide + 1
                            );

                            restartAutoSlide();

                        }
                    );

                }


                // =================================
                // АВТОСМЕНА
                // =================================

                function startAutoSlide() {

                    if (
                        slides.length <= 1
                    ) {
                        return;
                    }


                    autoSlide =
                        setInterval(
                            () => {

                                showSlide(
                                    currentSlide + 1
                                );

                            },
                            4000
                        );

                }


                function restartAutoSlide() {

                    clearInterval(
                        autoSlide
                    );

                    startAutoSlide();

                }


                startAutoSlide();

            }
        );

}


// =========================================
// HTML-БЕЗОПАСНОСТЬ
// =========================================

function escapeHTML(
    value
) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


// =========================================
// START
// =========================================

loadHandmadeProducts();