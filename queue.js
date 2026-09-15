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
// LOAD ORDERS
// =========================================

async function loadQueue() {

    const { data: orders, error } = await supabaseClient
        .from("orders")
        .select("*")
        .order("position", { ascending: true })
        .order("id", { ascending: true });

    if (error) {
        console.error("Ошибка загрузки заказов:", error);
        return;
    }

    renderQueue(orders);
}


// =========================================
// RENDER QUEUE
// =========================================

function renderQueue(orders) {

    // Очищаем все списки
    document.querySelectorAll(".queue-column-list").forEach(list => {
        list.innerHTML = "";
    });


    // Раскладываем заказы по колонкам
    orders.forEach(order => {

        const list = document.querySelector(
            `.queue-column-list[data-status="${order.status}"]`
        );

        if (!list) {
            console.warn(
                "Не найдена колонка для статуса:",
                order.status
            );
            return;
        }


        const card = document.createElement("article");
        card.className = "queue-card";

        card.innerHTML = `
            <div class="queue-number">
                ${escapeHTML(order.order_number)}
            </div>

            <div class="queue-info">
                <h3>
                    ${escapeHTML(order.title)}
                </h3>

                <p>
                    ${escapeHTML(order.description || "")}
                </p>
            </div>
        `;

        list.appendChild(card);
    });


    updateCounts();
    showEmptyColumns();
}


// =========================================
// UPDATE COUNTERS
// =========================================

function updateCounts() {

    document.querySelectorAll(".queue-column").forEach(column => {

        const list = column.querySelector(".queue-column-list");
        const count = column.querySelector(".queue-column-count");

        if (!list || !count) {
            return;
        }

        const cards = list.querySelectorAll(".queue-card");

        count.textContent = cards.length;
    });
}


// =========================================
// EMPTY COLUMNS
// =========================================

function showEmptyColumns() {

    document.querySelectorAll(".queue-column-list").forEach(list => {

        const hasCards = list.querySelector(".queue-card");

        if (!hasCards) {

            list.innerHTML = `
                <div class="queue-empty">
                    <span>✦</span>
                    <p>
                        Пока здесь<br>
                        пусто
                    </p>
                </div>
            `;
        }
    });
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
// AUTO REFRESH
// =========================================

// Загружаем сразу
loadQueue();

// Проверяем изменения раз в минуту
setInterval(loadQueue, 60000);