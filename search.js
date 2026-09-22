// =========================================
// 🔍 ПОИСК ПО ТОВАРАМ — STARKISSS SHOP
// =========================================


// =========================================
// SUPABASE
// =========================================

const SEARCH_SUPABASE_URL =
    "https://kyqmarqtduhqndbnsfer.supabase.co";

const SEARCH_SUPABASE_KEY =
    "sb_publishable_p4iG7aCbUOU_hclOhVh6wg_uxaCo92g";


let searchSupabase = null;


// =========================================
// ПОДКЛЮЧЕНИЕ SUPABASE
// =========================================

function initSearchSupabase() {

    if (searchSupabase) {
        return true;
    }

    if (!window.supabase) {

        console.error(
            "❌ Supabase ещё не загружен!"
        );

        return false;
    }

    searchSupabase =
        window.supabase.createClient(
            SEARCH_SUPABASE_URL,
            SEARCH_SUPABASE_KEY
        );

    return true;
}


// =========================================
// 🔎 ПОИСК ТОВАРОВ
// =========================================

async function searchProducts(query) {

    const text =
        query
            .trim()
            .toLowerCase();


    // Пустой запрос
    if (!text) {
        return [];
    }


    // Проверяем Supabase
    if (!initSearchSupabase()) {

        console.error(
            "❌ Не удалось подключить Supabase для поиска."
        );

        return [];
    }


    // Получаем товары
    const {
        data,
        error
    } =
        await searchSupabase
            .from("products")
            .select("*")
            .eq("status", "В наличии");


    // Ошибка Supabase
    if (error) {

        console.error(
            "❌ Ошибка поиска товаров:",
            error
        );

        return [];
    }


    const products =
        data || [];


    // Фильтруем товары
    return products.filter(product => {

        const title =
            (product.title || "")
                .toLowerCase();


        const description =
            (product.description || "")
                .toLowerCase();


        const category =
            (product.category || "")
                .toLowerCase();


        return (
            title.includes(text) ||
            description.includes(text) ||
            category.includes(text)
        );

    });

}


// =========================================
// 🔍 ИНТЕРФЕЙС ПОИСКА
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =====================================
        // ЭЛЕМЕНТЫ ПОИСКА
        // =====================================

        const searchButton =
            document.getElementById(
                "searchButton"
            );


        const searchOverlay =
            document.getElementById(
                "searchOverlay"
            );


        const searchClose =
            document.getElementById(
                "searchClose"
            );


        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const searchResults =
            document.getElementById(
                "searchResults"
            );


        // =====================================
        // ПРОВЕРКА
        // =====================================

        if (
            !searchButton ||
            !searchOverlay ||
            !searchClose ||
            !searchInput ||
            !searchResults
        ) {

            console.warn(
                "⚠️ Элементы поиска не найдены на этой странице."
            );

            return;
        }


        // =====================================
        // ОТКРЫТЬ ПОИСК
        // =====================================

        searchButton.addEventListener(
            "click",
            () => {

                searchOverlay.classList.add(
                    "active"
                );

                searchInput.focus();

            }
        );


        // =====================================
        // ЗАКРЫТЬ ПОИСК
        // =====================================

        searchClose.addEventListener(
            "click",
            () => {

                searchOverlay.classList.remove(
                    "active"
                );

            }
        );


        // =====================================
        // ЗАКРЫТЬ ПО КЛИКУ НА ФОН
        // =====================================

        searchOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    searchOverlay
                ) {

                    searchOverlay.classList.remove(
                        "active"
                    );

                }

            }
        );


        // =====================================
        // ЗАКРЫТЬ ПО ESCAPE
        // =====================================

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    searchOverlay.classList.remove(
                        "active"
                    );

                }

            }
        );


        // =====================================
        // 🔎 ПОИСК ПРИ ВВОДЕ
        // =====================================

        searchInput.addEventListener(
            "input",
            async () => {


                const query =
                    searchInput.value.trim();


                // =================================
                // ПУСТОЕ ПОЛЕ
                // =================================

                if (!query) {

                    searchResults.innerHTML = `
                        <p class="search-hint">
                            Начни вводить название товара ✦
                        </p>
                    `;

                    return;
                }


                // =================================
                // ЗАГРУЗКА
                // =================================

                searchResults.innerHTML = `
                    <p class="search-hint">
                        Ищу товары... ✦
                    </p>
                `;


                // =================================
                // ИЩЕМ
                // =================================

                const products =
                    await searchProducts(
                        query
                    );


                // =================================
                // НИЧЕГО НЕ НАШЛИ
                // =================================

                if (!products.length) {

                    searchResults.innerHTML = `
                        <p class="search-hint">
                            Ничего не найдено 😔
                        </p>
                    `;

                    return;
                }


                // =================================
                // ПОКАЗЫВАЕМ РЕЗУЛЬТАТЫ
                // =================================

                searchResults.innerHTML =
                    products
                        .map(product => {

                            return `
                                <div
                                    class="search-result"
                                    data-page="${product.page || "handmade.html"}"
                                    data-product-id="${product.id}"
                                >

                                    <img
                                        src="${product.photo_1 || ""}"
                                        alt="${product.title || "Товар"}"
                                    >

                                    <div
                                        class="search-result-info"
                                    >

                                        <h3>
                                            ${product.title || "Без названия"}
                                        </h3>

                                        <p>
                                            ${product.price || ""} ₽
                                        </p>

                                        <span>
                                            ${product.category || "В наличии"}
                                        </span>

                                    </div>

                                </div>
                            `;

                        })
                        .join("");


                // =================================
                // ПЕРЕХОД К ТОВАРУ
                // =================================

                document
                    .querySelectorAll(
                        ".search-result"
                    )
                    .forEach(result => {


                        result.addEventListener(
                            "click",
                            () => {


                                const page =
                                    result.dataset.page;


                                const productId =
                                    result.dataset.productId;


                                // Закрываем поиск
                                searchOverlay.classList.remove(
                                    "active"
                                );


                                // Переходим
                                window.location.href =
                                    `${page}#product-${productId}`;

                            }
                        );

                    });

            }
        );

    }
);