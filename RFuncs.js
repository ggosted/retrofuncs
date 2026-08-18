function getButtonsNameMap(selector) {
    const elem = document.querySelectorAll(selector)
    return new Map(
        Array.from(elem).map(item => [item.textContent, item])
    )
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


let SELECTORS = {
    credits: '.col-10 > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)',
    diamonds: '.col-10 > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)',
    info_container: 'div.gap-2:nth-child(2)',
    selected_player_achievments: '.text-center',
    selected_object_name: '.nitro-card-header-text',
    selected_object_desc: 'div.text-wrap:nth-child(1)',
    selected_object_owner: 'div.d-inline:nth-child(2)',
    furni_button: ".btn-dark",
    menu_button: ".menu-item",
    avatar: "div.d-flex:nth-child(7)",
    buybutton: '.text-decoration-underline',
    bot_bagde: '.badge-image[style*="BOT.gif"]',
}

let actionfurnilist = ["Move", "Rotate", "Pick up", "Use"]

function isContainerOpen() {
    if (document.querySelector(SELECTORS.info_container) != null) {
        return true
    }
    return false
}

function isHaveRights() {
    if (!isContainerOpen()) { return null }
    const buttons = document.querySelectorAll(SELECTORS.furni_button)
    const buttons2 = document.querySelectorAll(SELECTORS.menu_button)
    if (buttons2.length === 5 || (buttons.length <= 1 && (isFurni() || isBot()))) {
        return false
    }
    return true
}

function isBot() {
    if (isContainerOpen() && document.querySelector(SELECTORS.bot_bagde) != null) {
        return true
    }
    return false
}

function isPlayer() {
    if (isContainerOpen() && document.querySelector(SELECTORS.selected_player_achievments) != null) {
        return true
    }
    return false
}
const RFuncsUtils = {
    getButtonsNameMap: getButtonsNameMap,
    delay: delay
}

unsafeWindow.RFuncs = {
    Utils: RFuncsUtils
};


const RFuncsCore = {
    // Данные
    SELECTORS: SELECTORS,
    actionfurnilist: actionfurnilist,

    // Проверки состояния
    isContainerOpen: isContainerOpen,
    isHaveRights: isHaveRights,
    isBot: isBot,
    isPlayer: isPlayer,
    isFurni: isFurni,
    isBuyable: isBuyable,
    isUsable: isUsable,

    // Геттеры данных
    getCredits: getCredits,
    getDiamonds: getDiamonds,
    getSelectedPlayerAchievments: getSelectedPlayerAchievments,
    getSelectedObjectName: getSelectedObjectName,
    getSelectedObjectDesc: getSelectedObjectDesc,
    getSelectedObjectOwner: getSelectedObjectOwner,

    // Классы
    Furni: Furni,
    SelectedFurni: SelectedFurni,
    Player: Player,
    myPlayer: myPlayer,
    Bot: Bot,
}

unsafeWindow.RFuncs = {
    Core: RFuncsCore,
}
