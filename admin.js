// =========================================
// SUPABASE
// =========================================

const SUPABASE_URL = "https://kyqmarqtduhqndbnsfer.supabase.co";
const SUPABASE_KEY = "sb_publishable_p4iG7aCbUOU_hclOhVh6wg_uxaCo92g";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// =========================================
// ELEMENTS
// =========================================

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");

const adminLogin = document.getElementById("adminLogin");
const adminDashboard = document.getElementById("adminDashboard");

const logoutButton = document.getElementById("logoutButton");

const addOrderButton = document.getElementById("addOrderButton");
const orderForm = document.getElementById("orderForm");
const orderFormTitle = document.getElementById("orderFormTitle");
const cancelOrderButton = document.getElementById("cancelOrderButton");

const orderId = document.getElementById("orderId");
const orderNumber = document.getElementById("orderNumber");
const orderTitle = document.getElementById("orderTitle");
const orderDescription = document.getElementById("orderDescription");
const orderStatus = document.getElementById("orderStatus");
const orderPosition = document.getElementById("orderPosition");

const adminOrders = document.getElementById("adminOrders");


// =========================================
// AUTH
// =========================================

async function checkSession() {

    const { data, error } =
        await supabaseClient.auth.getSession();

    if (error) {
        console.error(error);
        return;
    }

    if (data.session) {
        showDashboard();
        loadOrders();
    } else {
        showLogin();
    }
}


function showDashboard() {

    adminLogin.hidden = true;
    adminDashboard.hidden = false;

    loadProducts();
}


// =========================================
// LOGIN
// =========================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    loginError.textContent = "";

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    const { error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {

        console.error(error);

        loginError.textContent =
            "Неверный email или пароль.";

        return;
    }

    loginForm.reset();

    showDashboard();

    loadOrders();
});


// =========================================
// LOGOUT
// =========================================

logoutButton.addEventListener("click", async () => {

    await supabaseClient.auth.signOut();

    orderForm.hidden = true;

    showLogin();
});


// =========================================
// LOAD ORDERS
// =========================================

async function loadOrders() {

    adminOrders.innerHTML = `
        <p class="admin-loading">
            Загружаем заказы...
        </p>
    `;

    const { data, error } =
        await supabaseClient
            .from("orders")
            .select("*")
            .order("status")
            .order("position", {
                ascending: true
            })
            .order("id", {
                ascending: true
            });

    if (error) {

        console.error(error);

        adminOrders.innerHTML = `
            <p class="admin-error">
                Не удалось загрузить заказы.
            </p>
        `;

        return;
    }

    renderOrders(data);
}


// =========================================
// RENDER ORDERS
// =========================================

function renderOrders(orders) {

    adminOrders.innerHTML = "";

    // Создаём четыре колонки
    const statuses = [
        "В очереди",
        "Изготавливаем",
        "Готов к отправке",
        "Доставляется"
    ];

    statuses.forEach((status) => {

        const column = document.createElement("div");

        column.className = "admin-status-column";

        column.dataset.status = status;

        column.innerHTML = `
            <div class="admin-status-column-title">
                <h3>${escapeHTML(status)}</h3>
                <span class="admin-status-count">0</span>
            </div>

            <div
                class="admin-status-dropzone"
                data-status="${escapeHTML(status)}"
            ></div>
        `;

        adminOrders.appendChild(column);
    });


    // Раскладываем заказы
    orders.forEach((order) => {

        const dropzone =
            adminOrders.querySelector(
                `.admin-status-dropzone[data-status="${CSS.escape(order.status)}"]`
            );

        if (!dropzone) {
            return;
        }

        const card = createOrderCard(order);

        dropzone.appendChild(card);
    });


    updateAdminCounts();

    enableDragAndDrop();
}


// =========================================
// CREATE ORDER CARD
// =========================================

function createOrderCard(order) {

    const card = document.createElement("div");

    card.className = "admin-order-card";

    card.draggable = true;

    card.dataset.id = order.id;

    card.dataset.status = order.status;

    card.innerHTML = `

        <div class="admin-drag-handle">
            ⋮⋮
        </div>

        <div class="admin-order-number">
            ${escapeHTML(order.order_number)}
        </div>

        <div class="admin-order-title">
            ${escapeHTML(order.title)}
        </div>

        <div class="admin-order-description">
            ${escapeHTML(order.description || "")}
        </div>

        <div class="admin-order-status">
            ${escapeHTML(order.status)}
        </div>

        <div class="admin-order-actions">

            <button
                type="button"
                class="admin-edit-button"
                data-action="edit"
                data-id="${order.id}"
            >
                ✎ Изменить
            </button>

            <button
                type="button"
                class="admin-delete-button"
                data-action="delete"
                data-id="${order.id}"
            >
                🗑 Удалить
            </button>

        </div>
    `;

    return card;
}


// =========================================
// DRAG & DROP
// =========================================

let draggedCard = null;


function enableDragAndDrop() {

    const cards =
        document.querySelectorAll(
            ".admin-order-card"
        );

    const dropzones =
        document.querySelectorAll(
            ".admin-status-dropzone"
        );


    // -------------------------
    // DRAG START
    // -------------------------

    cards.forEach((card) => {

        card.addEventListener("dragstart", (event) => {

            draggedCard = card;

            card.classList.add(
                "admin-dragging"
            );

            event.dataTransfer.effectAllowed =
                "move";

            event.dataTransfer.setData(
                "text/plain",
                card.dataset.id
            );
        });


        // -------------------------
        // DRAG END
        // -------------------------

        card.addEventListener("dragend", () => {

            card.classList.remove(
                "admin-dragging"
            );

            draggedCard = null;

            document
                .querySelectorAll(
                    ".admin-drag-over"
                )
                .forEach((element) => {

                    element.classList.remove(
                        "admin-drag-over"
                    );
                });
        });
    });


    // -------------------------
    // DRAG OVER
    // -------------------------

    dropzones.forEach((dropzone) => {

        dropzone.addEventListener(
            "dragover",
            (event) => {

                event.preventDefault();

                event.dataTransfer.dropEffect =
                    "move";

                dropzone.classList.add(
                    "admin-drag-over"
                );
            }
        );


        // -------------------------
        // DRAG LEAVE
        // -------------------------

        dropzone.addEventListener(
            "dragleave",
            (event) => {

                if (
                    !dropzone.contains(
                        event.relatedTarget
                    )
                ) {

                    dropzone.classList.remove(
                        "admin-drag-over"
                    );
                }
            }
        );


        // -------------------------
        // DROP
        // -------------------------

        dropzone.addEventListener(
            "drop",
            async (event) => {

                event.preventDefault();

                dropzone.classList.remove(
                    "admin-drag-over"
                );

                if (!draggedCard) {
                    return;
                }


                // Определяем новую позицию
                const cards =
                    Array.from(
                        dropzone.querySelectorAll(
                            ".admin-order-card"
                        )
                    );


                // Если карточка уже находится
                // в этой колонке — переставляем её
                if (
                    draggedCard.parentElement ===
                    dropzone
                ) {

                    const mouseY =
                        event.clientY;

                    let inserted = false;

                    for (const card of cards) {

                        if (
                            card === draggedCard
                        ) {
                            continue;
                        }

                        const rect =
                            card.getBoundingClientRect();

                        const middle =
                            rect.top +
                            rect.height / 2;

                        if (mouseY < middle) {

                            dropzone.insertBefore(
                                draggedCard,
                                card
                            );

                            inserted = true;

                            break;
                        }
                    }

                    if (!inserted) {
                        dropzone.appendChild(
                            draggedCard
                        );
                    }

                } else {

                    // Перенос в другую колонку
                    dropzone.appendChild(
                        draggedCard
                    );
                }


                // Новый статус
                const newStatus =
                    dropzone.dataset.status;


                // Сохраняем порядок
                await saveDraggedOrder(
                    draggedCard,
                    newStatus
                );
            }
        );
    });
}


// =========================================
// SAVE DRAGGED ORDER
// =========================================

async function saveDraggedOrder(
    card,
    newStatus
) {

    const id =
        Number(card.dataset.id);


    // Получаем все карточки
    // в новой колонке
    const dropzone =
        card.closest(
            ".admin-status-dropzone"
        );


    const cards =
        Array.from(
            dropzone.querySelectorAll(
                ".admin-order-card"
            )
        );


    const newPosition =
        cards.indexOf(card) + 1;


    // Обновляем заказ
    const { error } =
        await supabaseClient
            .from("orders")
            .update({
                status: newStatus,
                position: newPosition
            })
            .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "Не удалось сохранить перемещение заказа.\n\n" +
            error.message
        );

        await loadOrders();

        return;
    }


    // Обновляем статус на карточке
    card.dataset.status =
        newStatus;

    const statusElement =
        card.querySelector(
            ".admin-order-status"
        );

    if (statusElement) {
        statusElement.textContent =
            newStatus;
    }


    // Пересохраняем позиции
    // остальных карточек
    await normalizePositions(dropzone);


    updateAdminCounts();
}


// =========================================
// NORMALIZE POSITIONS
// =========================================

async function normalizePositions(
    dropzone
) {

    const cards =
        Array.from(
            dropzone.querySelectorAll(
                ".admin-order-card"
            )
        );


    for (
        let index = 0;
        index < cards.length;
        index++
    ) {

        const id =
            Number(
                cards[index].dataset.id
            );

        const position =
            index + 1;


        const { error } =
            await supabaseClient
                .from("orders")
                .update({
                    position
                })
                .eq("id", id);


        if (error) {

            console.error(
                "Ошибка сохранения позиции:",
                error
            );
        }
    }
}


// =========================================
// UPDATE COUNTERS
// =========================================

function updateAdminCounts() {

    document
        .querySelectorAll(
            ".admin-status-column"
        )
        .forEach((column) => {

            const dropzone =
                column.querySelector(
                    ".admin-status-dropzone"
                );

            const count =
                column.querySelector(
                    ".admin-status-count"
                );

            if (!dropzone || !count) {
                return;
            }

            count.textContent =
                dropzone.querySelectorAll(
                    ".admin-order-card"
                ).length;
        });
}


// =========================================
// BUTTON ACTIONS
// =========================================

adminOrders.addEventListener(
    "click",
    async (event) => {

        const button =
            event.target.closest(
                "button"
            );

        if (!button) {
            return;
        }


        const id =
            Number(button.dataset.id);

        const action =
            button.dataset.action;


        if (action === "edit") {

            editOrder(id);
        }


        if (action === "delete") {

            await deleteOrder(id);
        }
    }
);


// =========================================
// ADD ORDER
// =========================================

addOrderButton.addEventListener(
    "click",
    () => {

        orderForm.reset();

        orderId.value = "";

        orderFormTitle.textContent =
            "Новый заказ";

        orderStatus.value =
            "В очереди";

        orderPosition.value = 1;

        orderForm.hidden = false;

        orderForm.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
);


// =========================================
// CANCEL
// =========================================

cancelOrderButton.addEventListener(
    "click",
    () => {

        orderForm.reset();

        orderForm.hidden = true;
    }
);


// =========================================
// SAVE ORDER
// =========================================

orderForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const id =
            orderId.value;


        const orderData = {

            order_number:
                orderNumber.value.trim(),

            title:
                orderTitle.value.trim(),

            description:
                orderDescription.value.trim(),

            status:
                orderStatus.value,

            position:
                Number(orderPosition.value)
        };


        let result;


        if (id) {

            // UPDATE
            result =
                await supabaseClient
                    .from("orders")
                    .update(orderData)
                    .eq("id", id);

        } else {

            // INSERT
            result =
                await supabaseClient
                    .from("orders")
                    .insert([
                        orderData
                    ]);
        }


        if (result.error) {

            console.error(
                result.error
            );

            alert(
                "Не удалось сохранить заказ.\n\n" +
                result.error.message
            );

            return;
        }


        orderForm.reset();

        orderForm.hidden = true;

        await loadOrders();
    }
);


// =========================================
// EDIT ORDER
// =========================================

async function editOrder(id) {

    const { data, error } =
        await supabaseClient
            .from("orders")
            .select("*")
            .eq("id", id)
            .single();


    if (error) {

        console.error(error);

        alert(
            "Не удалось загрузить заказ."
        );

        return;
    }


    orderId.value =
        data.id;

    orderNumber.value =
        data.order_number;

    orderTitle.value =
        data.title;

    orderDescription.value =
        data.description || "";

    orderStatus.value =
        data.status;

    orderPosition.value =
        data.position || 1;


    orderFormTitle.textContent =
        "Редактирование заказа";


    orderForm.hidden = false;


    orderForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// =========================================
// DELETE ORDER
// =========================================

async function deleteOrder(id) {

    const confirmed =
        confirm(
            "Удалить этот заказ?\n\n" +
            "Это действие нельзя отменить."
        );


    if (!confirmed) {
        return;
    }


    const { error } =
        await supabaseClient
            .from("orders")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "Не удалось удалить заказ.\n\n" +
            error.message
        );

        return;
    }


    await loadOrders();
}


// =========================================
// SECURITY HELPER
// =========================================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// =========================================
// START
// =========================================

// =========================================
// 🛍️ ТОВАРЫ В НАЛИЧИИ
// =========================================

const addProductButton =
    document.getElementById("addProductButton");

const productForm =
    document.getElementById("productForm");

const productFormTitle =
    document.getElementById("productFormTitle");

const cancelProductButton =
    document.getElementById("cancelProductButton");

const productId =
    document.getElementById("productId");

const productTitle =
    document.getElementById("productTitle");

const productPrice =
    document.getElementById("productPrice");

const productDescription =
    document.getElementById("productDescription");

const productPhoto1 =
    document.getElementById("productPhoto1");

const productPhoto2 =
    document.getElementById("productPhoto2");

const productPhoto3 =
    document.getElementById("productPhoto3");

const productTelegram =
    document.getElementById("productTelegram");

const productWB =
    document.getElementById("productWB");

const productOzon =
    document.getElementById("productOzon");

const productStatus =
    document.getElementById("productStatus");

const productPosition =
    document.getElementById("productPosition");

const productCategory =
    document.getElementById("productCategory");

    const productPage = 
    document.getElementById("productPage");

const adminProducts =
    document.getElementById("adminProducts");


// Текущий редактируемый товар

let editingProduct = null;


// =========================================
// ЗАГРУЗКА ТОВАРОВ
// =========================================

async function loadProducts() {

    if (!adminProducts) {
        return;
    }


    adminProducts.innerHTML = `
        <p class="admin-loading">
            Загружаем товары...
        </p>
    `;


    const { data, error } =
        await supabaseClient
            .from("products")
            .select("*")
            .order("position", {
                ascending: true
            })
            .order("id", {
                ascending: true
            });


    if (error) {

        console.error(error);

        adminProducts.innerHTML = `
            <p class="admin-error">
                Не удалось загрузить товары.<br><br>
                ${escapeHTML(error.message)}
            </p>
        `;

        return;
    }


    renderProducts(data || []);
}


// =========================================
// ОТОБРАЖЕНИЕ ТОВАРОВ
// =========================================

function renderProducts(products) {

    adminProducts.innerHTML = "";


    if (!products.length) {

        adminProducts.innerHTML = `
            <p class="admin-loading">
                Пока нет добавленных товаров ✦
            </p>
        `;

        return;
    }


    products.forEach(product => {

        const card =
            createProductCard(product);

        adminProducts.appendChild(card);

    });

}


// =========================================
// КАРТОЧКА ТОВАРА В АДМИНКЕ
// =========================================

function createProductCard(product) {

    const card =
        document.createElement("article");


    card.className =
        "admin-product-card";


    card.dataset.id =
        product.id;


    const firstPhoto =
        product.photo_1 ||
        product.photo_2 ||
        product.photo_3 ||
        "";


    const photoHTML =
        firstPhoto

            ? `
                <img
                    src="${escapeHTML(firstPhoto)}"
                    alt="${escapeHTML(product.title)}"
                >
              `

            : `
                <div class="admin-product-no-photo">
                    ✦ Нет фото
                </div>
              `;


    card.innerHTML = `

        <div class="admin-product-preview">

            ${photoHTML}

        </div>


        <div class="admin-product-details">

            <div class="admin-product-top">

                <div>

                    <div class="admin-product-position">
                        Позиция #${escapeHTML(product.position)}
                    </div>

                    <h3>
                        ${escapeHTML(product.title)}
                    </h3>

                </div>


                <span
                    class="admin-product-status"
                >
                    ${escapeHTML(product.status)}
                </span>

            </div>


            <p class="admin-product-description">
                ${escapeHTML(
                    product.description || ""
                )}
            </p>


            <strong class="admin-product-price">
                ${escapeHTML(product.price || "")}
            </strong>


            <div class="admin-product-links">

                ${
                    product.telegram_url
                        ? `
                            <a
                                href="${escapeHTML(product.telegram_url)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Подробнее ↗
                            </a>
                          `
                        : ""
                }


                ${
                    product.wildberries_url
                        ? `
                            <a
                                href="${escapeHTML(product.wildberries_url)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                WB ↗
                            </a>
                          `
                        : ""
                }


                ${
                    product.ozon_url
                        ? `
                            <a
                                href="${escapeHTML(product.ozon_url)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ozon ↗
                            </a>
                          `
                        : ""
                }

            </div>


            <div class="admin-product-actions">

                <button
                    type="button"
                    class="admin-edit-button"
                    data-product-action="edit"
                    data-id="${product.id}"
                >
                    ✎ Изменить
                </button>


                <button
                    type="button"
                    class="admin-delete-button"
                    data-product-action="delete"
                    data-id="${product.id}"
                >
                    🗑 Удалить
                </button>

            </div>

        </div>

    `;


    return card;

}


// =========================================
// ОТКРЫТЬ ФОРМУ ДОБАВЛЕНИЯ
// =========================================

if (addProductButton) {

    addProductButton.addEventListener(
        "click",
        () => {

            editingProduct = null;


            productForm.reset();


            productId.value = "";


            productFormTitle.textContent =
                "Новый товар";


            productStatus.value =
                "В наличии";

                productPage.value = 
    "handmade.html";


            productPosition.value =
                1;


            productForm.hidden =
                false;


            productForm.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );

}


// =========================================
// ОТМЕНА
// =========================================

if (cancelProductButton) {

    cancelProductButton.addEventListener(
        "click",
        () => {

            editingProduct = null;

            productForm.reset();

            productForm.hidden =
                true;

        }
    );

}


// =========================================
// ЗАГРУЗКА ФОТО
// =========================================

async function uploadProductPhoto(file) {

    if (!file) {
        return null;
    }


    const extension =
        file.name.includes(".")
            ? file.name
                .split(".")
                .pop()
                .toLowerCase()
            : "jpg";


    const randomPart =
        Math.random()
            .toString(36)
            .substring(2, 10);


    const filePath =
        `products/${Date.now()}-${randomPart}.${extension}`;


    const { error } =
        await supabaseClient
            .storage
            .from("product-images")
            .upload(
                filePath,
                file,
                {
                    cacheControl: "3600",
                    upsert: false
                }
            );


    if (error) {

        console.error(
            "Ошибка загрузки фотографии:",
            error
        );

        throw error;

    }


    const { data } =
        supabaseClient
            .storage
            .from("product-images")
            .getPublicUrl(filePath);


    return data.publicUrl;

}


// =========================================
// УДАЛЕНИЕ ФАЙЛА ИЗ STORAGE
// =========================================

function getStoragePathFromUrl(url) {

    if (!url) {
        return null;
    }


    const marker =
        "/storage/v1/object/public/product-images/";


    const index =
        url.indexOf(marker);


    if (index === -1) {
        return null;
    }


    return decodeURIComponent(
        url.substring(
            index + marker.length
        )
    );

}


async function deleteStorageFile(url) {

    const path =
        getStoragePathFromUrl(url);


    if (!path) {
        return;
    }


    const { error } =
        await supabaseClient
            .storage
            .from("product-images")
            .remove([
                path
            ]);


    if (error) {

        console.warn(
            "Не удалось удалить фото:",
            error
        );

    }

}


// =========================================
// СОХРАНЕНИЕ ТОВАРА
// =========================================

if (productForm) {

    productForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const isEditing =
                Boolean(productId.value);


            const oldProduct =
                editingProduct;


            const title =
                productTitle.value.trim();


            const price =
                productPrice.value.trim();


            const description =
                productDescription.value.trim();


            const telegram =
                productTelegram.value.trim();


            const wb =
                productWB.value.trim();


            const ozon =
                productOzon.value.trim();


            const status =
                productStatus.value;


            const position =
                Number(
                    productPosition.value
                ) || 1;


            /*
                Показываем загрузку
            */

            const submitButton =
                productForm.querySelector(
                    'button[type="submit"]'
                );


            const originalButtonText =
                submitButton
                    ? submitButton.textContent
                    : "";


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Сохраняем...";

            }


            try {

                // -------------------------
                // ФОТО
                // -------------------------

                let photo1 =
                    oldProduct?.photo_1 ||
                    null;


                let photo2 =
                    oldProduct?.photo_2 ||
                    null;


                let photo3 =
                    oldProduct?.photo_3 ||
                    null;


                /*
                    Если выбрано новое фото —
                    загружаем его.
                */

                if (productPhoto1.files[0]) {

                    photo1 =
                        await uploadProductPhoto(
                            productPhoto1.files[0]
                        );

                }


                if (productPhoto2.files[0]) {

                    photo2 =
                        await uploadProductPhoto(
                            productPhoto2.files[0]
                        );

                }


                if (productPhoto3.files[0]) {

                    photo3 =
                        await uploadProductPhoto(
                            productPhoto3.files[0]
                        );

                }


                // -------------------------
                // ДАННЫЕ ТОВАРА
                // -------------------------
const productData = { 
    title, 
    description, 
    price, 
    photo_1: photo1, 
    photo_2: photo2, 
    photo_3: photo3, 
    telegram_url: telegram || null, 
    wildberries_url: wb || null, 
    ozon_url: ozon || null, 
    status, 
    position, 
    category: productCategory.value,
    page: productPage.value
};


                let result;


                // -------------------------
                // UPDATE
                // -------------------------

                if (isEditing) {

                    result =
                        await supabaseClient
                            .from("products")
                            .update(
                                productData
                            )
                            .eq(
                                "id",
                                productId.value
                            );

                }

                // -------------------------
                // INSERT
                // -------------------------

                else {

                    result =
                        await supabaseClient
                            .from("products")
                            .insert([
                                productData
                            ]);

                }


                if (result.error) {

                    throw result.error;

                }


                /*
                    Если при редактировании
                    заменили фотографии —
                    удаляем старые.
                */

                if (isEditing && oldProduct) {

                    if (
                        productPhoto1.files[0] &&
                        oldProduct.photo_1 &&
                        oldProduct.photo_1 !== photo1
                    ) {

                        await deleteStorageFile(
                            oldProduct.photo_1
                        );

                    }


                    if (
                        productPhoto2.files[0] &&
                        oldProduct.photo_2 &&
                        oldProduct.photo_2 !== photo2
                    ) {

                        await deleteStorageFile(
                            oldProduct.photo_2
                        );

                    }


                    if (
                        productPhoto3.files[0] &&
                        oldProduct.photo_3 &&
                        oldProduct.photo_3 !== photo3
                    ) {

                        await deleteStorageFile(
                            oldProduct.photo_3
                        );

                    }

                }


                // -------------------------
                // ГОТОВО
                // -------------------------

                editingProduct = null;


                productForm.reset();

                productForm.hidden =
                    true;


                await loadProducts();


            } catch (error) {

                console.error(error);


                alert(
                    "Не удалось сохранить товар.\n\n" +
                    error.message
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        originalButtonText;

                }

            }

        }
    );

}


// =========================================
// ИЗМЕНЕНИЕ / УДАЛЕНИЕ
// =========================================

if (adminProducts) {

    adminProducts.addEventListener(
        "click",
        async (event) => {

            const button =
                event.target.closest(
                    "button[data-product-action]"
                );


            if (!button) {
                return;
            }


            const id =
                Number(
                    button.dataset.id
                );


            const action =
                button.dataset.productAction;


            if (
                action === "edit"
            ) {

                await editProduct(id);

            }


            if (
                action === "delete"
            ) {

                await deleteProduct(id);

            }

        }
    );

}


// =========================================
// РЕДАКТИРОВАНИЕ
// =========================================

async function editProduct(id) {

    const { data, error } =
        await supabaseClient
            .from("products")
            .select("*")
            .eq("id", id)
            .single();


    if (error) {

        console.error(error);

        alert(
            "Не удалось загрузить товар."
        );

        return;

    }


    editingProduct =
        data;


    productId.value =
        data.id;


    productTitle.value =
        data.title || "";


    productPrice.value =
        data.price || "";


    productDescription.value =
        data.description || "";


    productTelegram.value =
        data.telegram_url || "";


    productWB.value =
        data.wildberries_url || "";


    productOzon.value =
        data.ozon_url || "";


    productStatus.value =
        data.status || "В наличии";


    productPosition.value =
        data.position || 1;


    productCategory.value = 
        data.category || "В наличии";

        productPage.value = 
    data.page || "handmade.html";


    /*
        При редактировании
        input file оставляем пустым.
        Старые фото сохранятся,
        пока ты не выберешь новые.
    */

    productPhoto1.value = "";
    productPhoto2.value = "";
    productPhoto3.value = "";


    productFormTitle.textContent =
        "Редактирование товара";


    productForm.hidden =
        false;


    productForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// =========================================
// УДАЛЕНИЕ
// =========================================

async function deleteProduct(id) {

    const confirmed =
        confirm(
            "Удалить этот товар?\n\n" +
            "Фотографии тоже будут удалены.\n" +
            "Это действие нельзя отменить."
        );


    if (!confirmed) {
        return;
    }


    const { data, error: loadError } =
        await supabaseClient
            .from("products")
            .select("*")
            .eq("id", id)
            .single();


    if (loadError) {

        console.error(loadError);

        alert(
            "Не удалось загрузить товар."
        );

        return;

    }


    const { error } =
        await supabaseClient
            .from("products")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "Не удалось удалить товар.\n\n" +
            error.message
        );

        return;

    }


    /*
        Удаляем фотографии
        после удаления записи.
    */

    await deleteStorageFile(
        data.photo_1
    );

    await deleteStorageFile(
        data.photo_2
    );

    await deleteStorageFile(
        data.photo_3
    );


    await loadProducts();

}
// =========================================
// START
// =========================================

checkSession();