// =========================================================
// DEV MODE
// =========================================================

// По умолчанию режим разработчика ВЫКЛЮЧЕН.
// Он включится только после успешного ввода
// секретного кода тестировщика.

let DEV_MODE = false;
let testerData = null;

// =========================================================
// СЕКРЕТНЫЙ ВХОД В DEV MODE
// =========================================================

const devLogin = document.getElementById("devLogin");
const devCodeInput = document.getElementById("devCodeInput");
const devLoginButton = document.getElementById("devLoginButton");
const devCancelButton = document.getElementById("devCancelButton");

// Сколько раз нужно нажать на секретную область
let devClickCount = 0;
let devClickTimer = null;


// =========================================================
// ОТКРЫТИЕ ОКНА DEV MODE
// =========================================================

function openDevLogin() {
    devLogin.classList.remove("hidden");

    devCodeInput.value = "";

    setTimeout(() => {
        devCodeInput.focus();
    }, 100);
}


// =========================================================
// ЗАКРЫТИЕ ОКНА
// =========================================================

function closeDevLogin() {
    devLogin.classList.add("hidden");
    devCodeInput.value = "";
}


// =========================================================
// ПРОВЕРКА КОДА
// =========================================================

devLoginButton.addEventListener("click", async () => {
    const code = devCodeInput.value.trim();

    if (!code) {
        alert("Введи код тестировщика.");
        return;
    }

    const success = await verifyTesterCode(code);

    if (success) {
        closeDevLogin();
    }
});


// Можно нажать Enter вместо кнопки
devCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        devLoginButton.click();
    }
});


// Отмена
devCancelButton.addEventListener("click", () => {
    closeDevLogin();
});

// =========================================================
// СЕКРЕТНЫЙ ТРИГГЕР
// 5 кликов по номеру дня
// =========================================================

const dayNumberElement = document.getElementById("dayNumber");

dayNumberElement.addEventListener("click", () => {

    devClickCount++;

    clearTimeout(devClickTimer);

    devClickTimer = setTimeout(() => {
        devClickCount = 0;
    }, 1500);

    if (devClickCount >= 5) {
        devClickCount = 0;
        openDevLogin();
    }
});

// =========================================================
// SUPABASE
// =========================================================

const SUPABASE_URL = "https://kyqmarqtduhqndbnsfer.supabase.co";
const SUPABASE_KEY = "sb_publishable_p4iG7aCbUOU_hclOhVh6wg_uxaCo92g";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// =========================================================
// ПРОВЕРКА КОДА ТЕСТИРОВЩИКА
// =========================================================

async function verifyTesterCode(code) {
    const cleanCode = code.trim();

    if (!cleanCode) {
        alert("Введи код тестировщика.");
        return false;
    }

    const { data, error } = await supabaseClient.rpc(
        "verify_event_tester",
        {
            p_code: cleanCode
        }
    );

    if (error) {
        console.error("Ошибка проверки DEV MODE:", error);
        alert("Не удалось проверить код. Проверь подключение к Supabase.");
        return false;
    }

    if (!data) {
        alert("❌ Неверный код тестировщика.");
        return false;
    }

    DEV_MODE = true;

    testerData = {
        authenticated: true
    };

    // Запоминаем DEV MODE на этом устройстве
    localStorage.setItem(
        "starkisss_newyear26_dev",
        "true"
    );

    setupTestMode();

    alert("🛠 DEV MODE включён!");

    return true;
}


/* =========================================================
   STORY DATA
   ========================================================= */

const storyDays = {

    1: {
        title: "Странное известие",
        task: "Узнайте, что случилось с созвездием.",
        location: "Мастерская Старки",

        characters: ["starki", "sugar"],

        star: false,

        scenes: [
            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "СТАРКИ!!!",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "АА—! Шугар?! Ты зачем через окно?!",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Не было времени заходить через дверь!",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Это... вообще-то моя мастерская.",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Я пришёл по очень важному делу! Исчезло созвездие!",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Исчезло?..",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Да! Совсем! Нам нужно его найти!",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Хорошо. Сначала разберёмся, что произошло. Потом будем искать.",

                position: "left"
            }
        ]
    },


    2: {
        title: "Зимний лес",
        task: "Найдите первую звезду вместе с Берри.",
        location: "Зимний лес",

        characters: ["berry", "sugar", "starki"],

        star: true,

        scenes: [
            {
                speaker: "Берри",
                character: "berry",

                text:
                    "ЗИМА! СНЕГ! ПРАЗДНИК! А ВЫ ЗНАЕТЕ, ЧТО У САНТЫ ЕСТЬ ОЛЕНИ?!",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Угу! Угу! А ещё нам нужна звезда!",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Давайте по делу. Берри, ты что-нибудь знаешь о созвездии?",

                position: "left"
            },

            {
                speaker: "Берри",
                character: "berry",

                text:
                    "Конечно! Я знаю этот лес вдоль и поперёк! И если звезда действительно упала сюда, мы обязательно её найдём.",

                position: "left"
            },

            {
                speaker: "Берри",
                character: "berry",

                text:
                    "Но придётся внимательно смотреть по сторонам. Звёзды маленькие и могут спрятаться где угодно!",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Тогда вперёд! ⭐",

                position: "right"
            }
        ]
    },


    3: {
        title: "Загадочная Frosty",
        task: "Узнайте, что хочет Frosty взамен звезды.",
        location: "Снежная поляна",

        characters: ["frosty", "starki", "sugar"],

        star: true,

        scenes: [
            {
                speaker: "Frosty",
                character: "frosty",

                text:
                    "Вы ищете звезду...",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "ААА! Ты кто?!",

                position: "right"
            },

            {
                speaker: "Frosty",
                character: "frosty",

                text:
                    "Frosty.",

                position: "left"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "И у тебя действительно есть одна из звёзд.",

                position: "right"
            },

            {
                speaker: "Frosty",
                character: "frosty",

                text:
                    "Есть. Но просто так я её не отдам.",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "А что тебе нужно взамен?..",

                position: "right"
            },

            {
                speaker: "Frosty",
                character: "frosty",

                text:
                    "Сначала докажите, что действительно хотите её найти.",

                position: "left"
            }
        ]
    },


    4: {
        title: "Испытание Луми",
        task: "Решите головоломку Луми.",
        location: "Облачная поляна",

        characters: ["lumi", "sugar", "starki"],

        star: true,

        scenes: [
            {
                speaker: "Луми",
                character: "lumi",

                text:
                    "Звезда должна попасть в руки того, кто понимает её свет.",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Эээ... Я понимаю! Она светится!",

                position: "right"
            },

            {
                speaker: "Луми",
                character: "lumi",

                text:
                    "Не совсем.",

                position: "left"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Полагаю, она приготовила нам испытание.",

                position: "right"
            },

            {
                speaker: "Луми",
                character: "lumi",

                text:
                    "Верно. Решите его — и звезда будет вашей.",

                position: "left"
            }
        ]
    },


    5: {
        title: "Горячий шоколад",
        task: "Отыщите все улики на картинке.",
        location: "Уютный уголок Синны",

        characters: ["sinna", "sugar", "starki"],

        star: true,

        scenes: [
            {
                speaker: "Синна",
                character: "sinna",

                text:
                    "Горячий шоколад?..",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Да!",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Синна. Мы вообще-то ищем звезду.",

                position: "right"
            },

            {
                speaker: "Синна",
                character: "sinna",

                text:
                    "Звезду?.. Не видела.",

                position: "left"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Почему у тебя такой подозрительный вид?",

                position: "right"
            },

            {
                speaker: "Синна",
                character: "sinna",

                text:
                    "Какой ещё вид? Я просто пью шоколад.",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Подозрительно...",

                position: "right"
            }
        ]
    },


    6: {
        title: "Минт против зимы",
        task: "Разберитесь с Минтом и найдите звезду.",
        location: "Заснеженная поляна",

        characters: ["mint", "sugar", "starki"],

        star: true,

        scenes: [
            {
                speaker: "Минт",
                character: "mint",

                text:
                    "Я уже сказал. Зима мне не нравится.",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Но это же зимний ивент!",

                position: "right"
            },

            {
                speaker: "Минт",
                character: "mint",

                text:
                    "И что? Кто сказал, что я обязан её любить?",

                position: "left"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Минт, у тебя случайно нет одной из звёзд?",

                position: "right"
            },

            {
                speaker: "Минт",
                character: "mint",

                text:
                    "...",

                position: "left"
            },

            {
                speaker: "Минт",
                character: "mint",

                text:
                    "Нет.",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Ты даже не успел подумать!",

                position: "right"
            }
        ]
    },


    7: {
        title: "Звезда Шугара",
        task: "Разберитесь, откуда взялась шестая звезда.",
        location: "Снежная дорога",

        characters: ["sugar", "starki"],

        star: true,

        scenes: [
            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Подождите. Звёзд всё ещё не хватает.",

                position: "left"
            },

            {
                speaker: "Берри",
                character: "berry",

                text:
                    "А Шугар сам не похож на звезду?..",

                position: "right"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Чего?! Нет ну вы что! Я не звезда!",

                position: "right"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Я вообще-то обычный—",

                position: "right"
            },

            {
                speaker: "Системное сообщение",
                character: null,

                text:
                    "Из кармана Шугара что-то выпало.",

                position: "center"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "...",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Шугар.",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Я НЕ ЗНАЮ, КАК ОНА ТУДА ПОПАЛА.",

                position: "right"
            }
        ]
    },


    8: {
        title: "Последняя звезда",
        task: "Найдите звезду, которой нигде не было видно.",
        location: "Неизвестное место",

        characters: ["starki", "sugar"],

        star: true,

        scenes: [
            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Шесть звёзд у нас есть.",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "А должно быть семь...",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Значит, седьмая всё это время была где-то рядом.",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Тогда ищем!",

                position: "right"
            }
        ]
    },


    9: {
        title: "Семь звёзд",
        task: "Соберите найденные звёзды вместе.",
        location: "Снежная поляна",

        characters: ["starki", "sugar", "berry"],

        star: false,

        scenes: [
            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Все семь здесь.",

                position: "left"
            },

            {
                speaker: "Берри",
                character: "berry",

                text:
                    "Значит, теперь созвездие вернётся на небо!",

                position: "right"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Тогда почему ничего не происходит?",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "...",

                position: "left"
            }
        ]
    },


    10: {
        title: "Что-то не так",
        task: "Поймите, почему звёзды не складываются.",
        location: "Снежная поляна",

        characters: ["starki", "lumi"],

        star: false,

        scenes: [
            {
                speaker: "Луми",
                character: "lumi",

                text:
                    "Вы пытаетесь вернуть их туда, где они были раньше.",

                position: "left"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Да. А разве это неправильно?",

                position: "right"
            },

            {
                speaker: "Луми",
                character: "lumi",

                text:
                    "Не обязательно.",

                position: "left"
            }
        ]
    },


    11: {
        title: "След на снегу",
        task: "Попробуйте соединить звёзды.",
        location: "Снежное поле",

        characters: ["sugar", "starki"],

        star: false,

        scenes: [
            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "А если попробовать соединить их по-другому?",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Нам нужно найти правильный порядок.",

                position: "left"
            },

            {
                speaker: "Системное сообщение",
                character: null,

                text:
                    "Проведите пальцем по снегу и соедините звёзды.",

                position: "center"
            }
        ]
    },


    12: {
        title: "Новое созвездие",
        task: "Завершите рисунок созвездия.",
        location: "Звёздное небо",

        characters: ["starki", "sugar", "lumi"],

        star: false,

        scenes: [
            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Оно двигается!",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Звёзды не ломались.",

                position: "left"
            },

            {
                speaker: "Луми",
                character: "lumi",

                text:
                    "Они просто искали новое место.",

                position: "right"
            }
        ]
    },


    13: {
        title: "Новое место",
        task: "Посмотрите, каким стало созвездие.",
        location: "Ночное небо",

        characters: ["berry", "sinna", "mint"],

        star: false,

        scenes: [
            {
                speaker: "Берри",
                character: "berry",

                text:
                    "Оно другое!",

                position: "left"
            },

            {
                speaker: "Синна",
                character: "sinna",

                text:
                    "Но красивое.",

                position: "right"
            },

            {
                speaker: "Минт",
                character: "mint",

                text:
                    "Хм. Не самое ужасное изменение.",

                position: "left"
            }
        ]
    },


    14: {
        title: "Перед рассветом",
        task: "Проведите последний вечер вместе.",
        location: "Зимний лагерь",

        characters: ["starki", "sugar", "berry", "lumi"],

        star: false,

        scenes: [
            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "Получается, мы всё это время искали не потерянные звёзды?",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Получается, мы помогли им найти новое место.",

                position: "left"
            },

            {
                speaker: "Берри",
                character: "berry",

                text:
                    "Тогда это тоже можно считать приключением!",

                position: "right"
            }
        ]
    },


    15: {
        title: "Спасибо за путешествие",
        task: "Завершите путешествие.",
        location: "Новое созвездие",

        characters: ["starki", "sugar", "berry", "lumi", "sinna", "mint"],

        star: false,

        final: true,

        scenes: [
            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Кажется, всё закончилось.",

                position: "left"
            },

            {
                speaker: "Шугар",
                character: "sugar",

                text:
                    "А мне кажется, что это только начало.",

                position: "right"
            },

            {
                speaker: "Берри",
                character: "berry",

                text:
                    "Смотрите! Новое созвездие!",

                position: "left"
            },

            {
                speaker: "Луми",
                character: "lumi",

                text:
                    "Оно будет напоминать вам об этом путешествии.",

                position: "right"
            },

            {
                speaker: "Старки",
                character: "starki",

                text:
                    "Спасибо, что отправились с нами.",

                position: "left"
            },

            {
                speaker: "Системное сообщение",
                character: null,

                text:
                    "Путешествие завершено. ✨",

                position: "center"
            }
        ]
    }

};


/* =========================================================
   CHARACTER FILES
   ========================================================= */

const characterImages = {

    starki:
        "event/characters/starki.png",

    sugar:
        "event/characters/sugar.png",

    berry:
        "event/characters/berry.png",

    lumi:
        "event/characters/lumi.png",

    sinna:
        "event/characters/sinna.png",

    mint:
        "event/characters/mint.png",

    frosty:
        "event/characters/frosty.png"

};


/* =========================================================
   DOM
   ========================================================= */

const dayNumber =
    document.getElementById("dayNumber");

const dayTask =
    document.getElementById("dayTask");

const progressFill =
    document.getElementById("progressFill");

const sceneBackground =
    document.getElementById("sceneBackground");

const characterLeft =
    document.getElementById("characterLeft");

const characterRight =
    document.getElementById("characterRight");

const characterLeftImage =
    document.getElementById("characterLeftImage");

const characterRightImage =
    document.getElementById("characterRightImage");

const storyMessage =
    document.getElementById("storyMessage");

const speaker =
    document.getElementById("speaker");

const dialogue =
    document.getElementById("dialogue");

const nextButton =
    document.getElementById("nextButton");

const backButton =
    document.getElementById("backButton");

const startScreen =
    document.getElementById("startScreen");

const nicknameInput =
    document.getElementById("nicknameInput");

const startButton =
    document.getElementById("startButton");

const chapterComplete =
    document.getElementById("chapterComplete");

const completeTitle =
    document.getElementById("completeTitle");

const completeText =
    document.getElementById("completeText");

const completeButton =
    document.getElementById("completeButton");

const storyStars =
    document.getElementById("storyStars");

const secretStars =
    document.getElementById("secretStars");

const mapOverlay =
    document.getElementById("mapOverlay");

const journalOverlay =
    document.getElementById("journalOverlay");

const mapButton =
    document.getElementById("mapButton");

const journalButton =
    document.getElementById("journalButton");

const closeMap =
    document.getElementById("closeMap");

const closeJournal =
    document.getElementById("closeJournal");

const map =
    document.getElementById("map");

const journalList =
    document.getElementById("journalList");

const testPanel =
    document.getElementById("testPanel");

const testDaySelect =
    document.getElementById("testDaySelect");

const testDayButton =
    document.getElementById("testDayButton");

const resetButton =
    document.getElementById("resetButton");


/* =========================================================
   GAME STATE
   ========================================================= */

let currentDay = 1;

let currentSceneIndex = 0;

let playerNickname = "";

let completedDays = [];

let foundStoryStars = [];

let foundSecretStars = [];


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function saveGame() {

    const saveData = {

        nickname:
            playerNickname,

        completedDays:
            completedDays,

        storyStars:
            foundStoryStars,

        secretStars:
            foundSecretStars
    };

    localStorage.setItem(
        "starkisss_newyear26",
        JSON.stringify(saveData)
    );
}


function loadGame() {

    const saved =
        localStorage.getItem(
            "starkisss_newyear26"
        );

    if (!saved) {
        return;
    }

    try {

        const data =
            JSON.parse(saved);

        playerNickname =
            data.nickname || "";

        completedDays =
            data.completedDays || [];

        foundStoryStars =
            data.storyStars || [];

        foundSecretStars =
            data.secretStars || [];

    } catch (error) {

        console.error(
            "Не удалось загрузить сохранение:",
            error
        );
    }
}


/* =========================================================
   START
   ========================================================= */

function startGame() {

    const enteredName =
        nicknameInput.value.trim();

    if (!enteredName) {

        nicknameInput.focus();

        nicknameInput.placeholder =
            "Сначала введи никнейм ⭐";

        return;
    }

    playerNickname =
        enteredName;

    saveGame();

    startScreen.classList.add("hidden");

    currentDay = 1;

    loadDay(currentDay);
}


/* =========================================================
   LOAD DAY
   ========================================================= */

function loadDay(day) {

    const story =
        storyDays[day];

    if (!story) {
        return;
    }

    currentDay =
        day;

    currentSceneIndex =
        0;

    chapterComplete.classList.add("hidden");

    nextButton.classList.remove("hidden");

    updateHeader();

    updateBackground(story.location);

    showScene();

    updateCounters();

    updateMap();

    updateJournal();

    saveGame();
}


/* =========================================================
   HEADER
   ========================================================= */

function updateHeader() {

    const story =
        storyDays[currentDay];

    dayNumber.textContent =
        `⭐ ДЕНЬ ${currentDay} / 15`;

    dayTask.textContent =
        `Задача: ${story.task}`;

    const progress =
        (currentDay / 15) * 100;

    progressFill.style.width =
        `${progress}%`;
}


/* =========================================================
   BACKGROUND
   ========================================================= */

function updateBackground(location) {

    /*
       Пока здесь только временный градиент.

       Потом мы заменим это на настоящие
       изображения фонов.
    */

    const backgrounds = {

        "Мастерская Старки":
            "linear-gradient(180deg, #25386e, #171f45)",

        "Зимний лес":
            "linear-gradient(180deg, #193c55, #101e38)",

        "Снежная поляна":
            "linear-gradient(180deg, #435c82, #263755)",

        "Облачная поляна":
            "linear-gradient(180deg, #657da8, #344769)",

        "Уютный уголок Синны":
            "linear-gradient(180deg, #604e61, #302940)",

        "Заснеженная поляна":
            "linear-gradient(180deg, #43546d, #222c42)",

        "Снежная дорога":
            "linear-gradient(180deg, #344f72, #1a2945)",

        "Неизвестное место":
            "linear-gradient(180deg, #202d59, #10172e)",

        "Звёздное небо":
            "linear-gradient(180deg, #111d4e, #080d27)",

        "Ночное небо":
            "linear-gradient(180deg, #0d1741, #05091d)",

        "Снежное поле":
            "linear-gradient(180deg, #3b5276, #17233d)",

        "Зимний лагерь":
            "linear-gradient(180deg, #4c5f7c, #27354e)",

        "Новое созвездие":
            "linear-gradient(180deg, #151e55, #080b25)"
    };

    sceneBackground.style.background =
        backgrounds[location] ||
        "linear-gradient(180deg, #263a78, #182652)";
}


/* =========================================================
   SHOW SCENE
   ========================================================= */

function showScene() {

    const story =
        storyDays[currentDay];

    const scene =
        story.scenes[currentSceneIndex];

    if (!scene) {
        finishDay();
        return;
    }

    speaker.textContent =
        scene.speaker;

    dialogue.textContent =
        scene.text;


    /*
       Персонажи
    */

    hideCharacters();


    if (scene.character) {

        const image =
            characterImages[
                scene.character
            ];

        if (scene.position === "left") {

            characterLeftImage.src =
                image;

            characterLeftImage.alt =
                scene.character;

            characterLeft.classList.remove(
                "hidden"
            );

        } else if (
            scene.position === "right"
        ) {

            characterRightImage.src =
                image;

            characterRightImage.alt =
                scene.character;

            characterRight.classList.remove(
                "hidden"
            );
        }
    }


    storyMessage.classList.remove(
        "hidden"
    );

/*
   Кнопка "Назад"
*/

if (currentSceneIndex > 0) {

    backButton.classList.remove(
        "hidden"
    );

} else {

    backButton.classList.add(
        "hidden"
    );
}
    /*
       Последняя сцена
    */

    if (
        currentSceneIndex >=
        story.scenes.length - 1
    ) {

        nextButton.textContent =
            story.final
                ? "Завершить ✨"
                : "Завершить день ⭐";

    } else {

        nextButton.textContent =
            "Далее →";
    }
}


/* =========================================================
   HIDE CHARACTERS
   ========================================================= */

function hideCharacters() {

    characterLeft.classList.add(
        "hidden"
    );

    characterRight.classList.add(
        "hidden"
    );
}


/* =========================================================
   NEXT
   ========================================================= */

function nextScene() {

    const story =
        storyDays[currentDay];

    if (
        currentSceneIndex <
        story.scenes.length - 1
    ) {

        currentSceneIndex++;

        showScene();

        return;
    }

    finishDay();
}
function previousScene() {

    if (currentSceneIndex <= 0) {
        return;
    }

    currentSceneIndex--;

    showScene();
}

/* =========================================================
   FINISH DAY
   ========================================================= */

function finishDay() {

    const story =
        storyDays[currentDay];


    if (
        !completedDays.includes(
            currentDay
        )
    ) {

        completedDays.push(
            currentDay
        );
    }


    /*
       Засчитываем сюжетную звезду,
       если она предусмотрена этим днём.
    */

    if (
        story.star &&
        !foundStoryStars.includes(
            currentDay
        )
    ) {

        foundStoryStars.push(
            currentDay
        );
    }


    saveGame();

    updateCounters();


    nextButton.classList.add(
        "hidden"
    );


    chapterComplete.classList.remove(
        "hidden"
    );


    if (story.final) {

        completeTitle.textContent =
            "✨ Путешествие завершено!";

        completeText.textContent =
            `Спасибо за участие, ${playerNickname}!`;

        completeButton.textContent =
            "Посмотреть финал";

    } else {

        completeTitle.textContent =
            `⭐ День ${currentDay} завершён!`;

        if (currentDay < 15) {

            completeText.textContent =
                "Продолжение путешествия уже совсем скоро...";

            completeButton.textContent =
                "Вернуться";

        } else {

            completeText.textContent =
                "Спасибо за путешествие!";

            completeButton.textContent =
                "Закрыть";

        }
    }
}


/* =========================================================
   COMPLETE BUTTON
   ========================================================= */

function continueAfterChapter() {

    chapterComplete.classList.add(
        "hidden"
    );


    /*
       В TEST MODE можно идти дальше сразу.
    */

    if (DEV_MODE) {
    if (currentDay < 15) {
        loadDay(currentDay + 1);
    }
    return;
}

if (currentDay < 15) {
    loadDay(currentDay + 1);
}


    /*
       В обычном режиме здесь потом
       будет проверка реальной даты.
    */

    if (currentDay < 15) {

        loadDay(
            currentDay + 1
        );
    }
}


/* =========================================================
   COUNTERS
   ========================================================= */

function updateCounters() {

    storyStars.textContent =
        foundStoryStars.length;

    secretStars.textContent =
        foundSecretStars.length;
}


/* =========================================================
   MAP
   ========================================================= */

function updateMap() {

    map.innerHTML = "";

    for (
        let day = 1;
        day <= 15;
        day++
    ) {

        const item =
            document.createElement("div");

        item.className =
            "map-day";


        if (
            completedDays.includes(day)
        ) {

            item.classList.add(
                "completed"
            );
        }


        if (
            day === currentDay
        ) {

            item.classList.add(
                "current"
            );
        }


        const story =
            storyDays[day];


        const star =
            story.star
                ? "⭐"
                : "❄️";


        item.innerHTML = `
            <span class="map-star">
                ${star}
            </span>

            <strong>
                День ${day}
            </strong>

            <br>

            <small>
                ${story.title}
            </small>
        `;


        map.appendChild(item);
    }
}


/* =========================================================
   JOURNAL
   ========================================================= */

function updateJournal() {

    journalList.innerHTML = "";

    for (
        let day = 1;
        day <= 15;
        day++
    ) {

        const story =
            storyDays[day];

        const item =
            document.createElement("div");


        const completed =
            completedDays.includes(day);


        item.className =
            "journal-entry";


        if (completed) {

            item.classList.add(
                "completed"
            );

            item.innerHTML = `
                <strong>
                    ⭐ День ${day} —
                    ${story.title}
                </strong>

                <br>

                <small>
                    ${story.task}
                </small>
            `;

        } else {

            item.classList.add(
                "locked"
            );

            item.innerHTML = `
                🔒 День ${day}
                <br>
                <small>
                    Эта глава ещё не открыта.
                </small>
            `;
        }


        journalList.appendChild(item);
    }
}


/* =========================================================
   TEST MODE
   ========================================================= */

function setupTestMode() {

    // Если DEV MODE выключен —
    // панель полностью скрыта
    if (!DEV_MODE) {

        testPanel.classList.add("hidden");

        return;
    }


    // DEV MODE включён —
    // показываем панель
    testPanel.classList.remove("hidden");


    // Очищаем старые варианты,
    // чтобы они не дублировались
    testDaySelect.innerHTML = "";


    // Создаём выбор всех 15 дней
    for (
        let day = 1;
        day <= 15;
        day++
    ) {

        const option =
            document.createElement("option");

        option.value =
            day;

        option.textContent =
            `День ${day}`;

        testDaySelect.appendChild(
            option
        );
    }


    // Выбираем текущий день
    testDaySelect.value =
        currentDay;
}


/* =========================================================
   RESET
   ========================================================= */

function resetGame() {

    const confirmed =
        confirm(
            "Сбросить весь прогресс события?"
        );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(
        "starkisss_newyear26"
    );

    location.reload();
}


/* =========================================================
   MAP / JOURNAL BUTTONS
   ========================================================= */

mapButton.addEventListener(
    "click",
    () => {

        updateMap();

        mapOverlay.classList.remove(
            "hidden"
        );
    }
);


journalButton.addEventListener(
    "click",
    () => {

        updateJournal();

        journalOverlay.classList.remove(
            "hidden"
        );
    }
);


closeMap.addEventListener(
    "click",
    () => {

        mapOverlay.classList.add(
            "hidden"
        );
    }
);


closeJournal.addEventListener(
    "click",
    () => {

        journalOverlay.classList.add(
            "hidden"
        );
    }
);


/* =========================================================
   BUTTON EVENTS
   ========================================================= */

startButton.addEventListener(
    "click",
    startGame
);


nicknameInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            startGame();
        }
    }
);


nextButton.addEventListener(
    "click",
    nextScene
);
backButton.addEventListener(
    "click",
    previousScene
);

completeButton.addEventListener(
    "click",
    continueAfterChapter
);


testDayButton.addEventListener(
    "click",
    () => {

        const day =
            Number(
                testDaySelect.value
            );

        loadDay(day);
    }
);


resetButton.addEventListener(
    "click",
    resetGame
);


/* =========================================================
   INIT
   ========================================================= */

loadGame();

setupTestMode();

updateCounters();

updateMap();

updateJournal();


/*
   Если игрок уже вводил никнейм,
   не заставляем вводить его заново.
*/

if (playerNickname) {

    nicknameInput.value =
        playerNickname;
}


/*
   Пока показываем стартовый экран.

   После нажатия "Начать"
   откроется День 1.
*/

console.log(
    "⭐ Starkisss Shop New Year 2026 loaded!"
);