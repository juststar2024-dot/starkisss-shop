// =========================================
// МЕРЧ — ЗАГРУЗКА ТОВАРОВ
// =========================================


// =========================================
// ОФИЦИАЛЬНЫЙ МЕРЧ
// =========================================

const officialMerchProducts =
    document.getElementById("officialMerchProducts");


async function loadOfficialMerch() {

    if (!officialMerchProducts) {
        return;
    }

    officialMerchProducts.innerHTML = `
        <p class="admin-loading">
            Загружаем мерч...
        </p>
    `;


    const {
        data,
        error
    } =
        await supabaseProducts
            .from("products")
            .select("*")
            .eq("category", "Мерч магазина")
            .eq("status", "В наличии")
            .order("position", {
                ascending: true
            })
            .order("id", {
                ascending: true
            });


    if (error) {

        console.error(
            "Ошибка загрузки мерча:",
            error
        );

        officialMerchProducts.innerHTML = `
            <p>
                Не удалось загрузить мерч.
            </p>
        `;

        return;
    }


    renderOfficialMerch(data || []);
}


function renderOfficialMerch(products) {

    officialMerchProducts.innerHTML = "";

    if (!products.length) {

        officialMerchProducts.innerHTML = `
            <p>
                Пока нет товаров в этом разделе ✦
            </p>
        `;

        return;
    }


    products.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "merch-card";


        card.innerHTML = `

            <div class="merch-image">

                ${
                    product.photo_1
                        ? `
                            <img
                                src="${product.photo_1}"
                                alt="${product.title}"
                            >
                          `
                        : `
                            <span>
                                ФОТО МЕРЧА
                            </span>
                          `
                }

            </div>


            <div class="merch-info">

                <p class="merch-label">
                    ✦ OFFICIAL ✦
                </p>


                <h3>
                    ${product.title}
                </h3>


                <p>
                    ${product.description || ""}
                </p>


                <div class="merch-price">
                    ${product.price || ""}
                </div>


                ${
                    product.telegram_url
                        ? `
                            <a
                                href="${product.telegram_url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="merch-button"
                            >
                                Подробнее ↗
                            </a>
                          `
                        : ""
                }

            </div>

        `;


        officialMerchProducts
            .appendChild(card);

    });
}



// =========================================
// ФАНДОМНЫЙ МЕРЧ
// =========================================

const fandomMerchProducts =
    document.getElementById("fandomMerchProducts");


async function loadFandomMerch() {

    if (!fandomMerchProducts) {
        return;
    }


    fandomMerchProducts.innerHTML = `
        <p class="admin-loading">
            Загружаем фандомный мерч...
        </p>
    `;


    const {
        data,
        error
    } =
        await supabaseProducts
            .from("products")
            .select("*")
            .eq("category", "Фандомный мерч")
            .eq("status", "В наличии")
            .order("position", {
                ascending: true
            })
            .order("id", {
                ascending: true
            });


    if (error) {

        console.error(
            "Ошибка загрузки фандомного мерча:",
            error
        );


        fandomMerchProducts.innerHTML = `
            <p>
                Не удалось загрузить фандомный мерч.
            </p>
        `;


        return;
    }


    renderFandomMerch(data || []);
}


function renderFandomMerch(products) {

    fandomMerchProducts.innerHTML = "";


    if (!products.length) {

        fandomMerchProducts.innerHTML = `
            <p>
                Пока нет товаров в этом разделе ✦
            </p>
        `;

        return;
    }


    products.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "merch-card fandom-card";


        card.innerHTML = `

            <div class="merch-image">

                ${
                    product.photo_1
                        ? `
                            <img
                                src="${product.photo_1}"
                                alt="${product.title}"
                            >
                          `
                        : `
                            <span>
                                ФОТО МЕРЧА
                            </span>
                          `
                }

            </div>


            <div class="merch-info">

                <p class="merch-label">
                    ✦ FANDOM ✦
                </p>


                <h3>
                    ${product.title}
                </h3>


                <p>
                    ${product.description || ""}
                </p>


                <div class="merch-price">
                    ${product.price || ""}
                </div>


                ${
                    product.telegram_url
                        ? `
                            <a
                                href="${product.telegram_url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="merch-button"
                            >
                                Подробнее ↗
                            </a>
                          `
                        : ""
                }

            </div>

        `;


        fandomMerchProducts
            .appendChild(card);

    });
}
// =========================================
// ЮЧ — YOUR CHARACTER HERE
// =========================================

const ychMerchProducts =
    document.getElementById("ychMerchProducts");


async function loadYchMerch() {

    if (!ychMerchProducts) {
        return;
    }


    ychMerchProducts.innerHTML = `
        <p class="admin-loading">
            Загружаем ЮЧ...
        </p>
    `;


    const {
        data,
        error
    } =
        await supabaseProducts
            .from("products")
            .select("*")
            .eq("category", "ЮЧ")
            .eq("status", "В наличии")
            .order("position", {
                ascending: true
            })
            .order("id", {
                ascending: true
            });


    if (error) {

        console.error(
            "Ошибка загрузки ЮЧ:",
            error
        );


        ychMerchProducts.innerHTML = `
            <p>
                Не удалось загрузить ЮЧ.
            </p>
        `;


        return;
    }


    renderYchMerch(data || []);
}


function renderYchMerch(products) {

    ychMerchProducts.innerHTML = "";


    if (!products.length) {

        ychMerchProducts.innerHTML = `
            <p>
                Пока нет товаров в этом разделе ✦
            </p>
        `;

        return;
    }


    products.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "merch-card ych-card";


        card.innerHTML = `

            <div class="merch-image">

                ${
                    product.photo_1
                        ? `
                            <img
                                src="${product.photo_1}"
                                alt="${product.title}"
                            >
                          `
                        : `
                            <span>
                                ФОТО ЮЧ
                            </span>
                          `
                }

            </div>


            <div class="merch-info">

                <p class="merch-label">
                    ✦ YOUR CHARACTER HERE ✦
                </p>


                <h3>
                    ${product.title}
                </h3>


                <p>
                    ${product.description || ""}
                </p>


                <div class="merch-price">
                    ${product.price || ""}
                </div>


                ${
                    product.telegram_url
                        ? `
                            <a
                                href="${product.telegram_url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="merch-button"
                            >
                                Подробнее ↗
                            </a>
                          `
                        : ""
                }

            </div>

        `;


        ychMerchProducts
            .appendChild(card);

    });
}


// =========================================
// ЗАПУСК
// =========================================

loadOfficialMerch();
loadFandomMerch();
loadYchMerch();