
    const getButtonsNameMap = unsafeWindow.RFuncs.Utils.getButtonsNameMap;
    const delay = unsafeWindow.RFuncs.Utils.delay;
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

function isFurni() {
    if (isContainerOpen() && isBot() == false && isPlayer() == false) {
        return true
    }
    return false
}

function isBuyable() {
    if (isContainerOpen() && document.querySelector(SELECTORS.buybutton) != null && isPlayer() == false) {
        return true
    }
    return false
}

function isUsable() {
    if (isContainerOpen() && getButtonsNameMap(SELECTORS.furni_button).get("Use") != null && isFurni()) {
        return true
    }
    return false
}

function getCredits() {
    return document.querySelector(SELECTORS.credits).textContent
}

function getDiamonds() {
    return document.querySelector(SELECTORS.diamonds).textContent
}

function getSelectedPlayerAchievments() {
    if (isPlayer()) {
        return document.querySelector(SELECTORS.selected_player_achievments).textContent
    }
    return null
}

function getSelectedObjectName() {
    if (isContainerOpen()) {
        return document.querySelector(SELECTORS.selected_object_name).textContent
    }
    return null
}

function getSelectedObjectDesc() {
    if (isContainerOpen()) {
        return document.querySelector(SELECTORS.selected_object_desc).textContent
    }
    return null
}

function getSelectedObjectOwner() {
    if (isContainerOpen() && isPlayer() == false) {
        return document.querySelector(SELECTORS.selected_object_owner).textContent
    }
    return null
}

class Furni {
    constructor() {
        this.name = getSelectedObjectName()
        this.desc = getSelectedObjectDesc()
        this.owner = getSelectedObjectOwner()
        this.usable = isUsable()
        this.purchasable = isBuyable()
    }
    static create() {
        if (!isFurni()) {
            return null
        }
        return new this()
    }
}

class SelectedFurni extends Furni {
    constructor() {
        super()
    }
    #check_furni(name, desc, owner) {
        return this.name == name && this.desc == desc && this.owner == owner && isHaveRights()
    }
    #refresh() {
        this.name = getSelectedObjectName()
        this.desc = getSelectedObjectDesc()
        this.owner = getSelectedObjectOwner()
        this.usable = isUsable()
        this.purchasable = isBuyable()
    }

    openCatalog() {
        if (this.#check_furni(getSelectedObjectName(), getSelectedObjectDesc(), getSelectedObjectOwner())) {
            if (isContainerOpen() && this.purchasable) {
                const button = document.querySelector(SELECTORS.buybutton)
                if (button) {
                    button.click()
                    return true
                }
            }
        }
        this.#refresh()
        return false
    }

    actionWithFurni(action) {
        if (this.#check_furni(getSelectedObjectName(), getSelectedObjectDesc(), getSelectedObjectOwner())) {
            if (actionfurnilist.indexOf(action) != -1 && isContainerOpen() && this.usable && isHaveRights() && isFurni()) {
                const menu = getButtonsNameMap(SELECTORS.furni_button)
                const button = menu.get(action)
                if (button) {
                    button.click()
                    return true
                }
            }
        }
        this.#refresh()
        return false
    }
}

class Player {
    constructor() {
        this.nick = getSelectedObjectName()
        this.motto = getSelectedObjectDesc()
        this.achievments = getSelectedPlayerAchievments()
    }
    static create() {
        if (!isPlayer()) return null
        return new this()
    }
}

class myPlayer extends Player {
    constructor() {
        super()
    }

    #check_myPlayer(nick, motto, achievments) {
        return this.nick === nick && this.motto === motto && this.achievments === achievments
    }

    #refresh() {
        this.nick = getSelectedObjectName()
        this.motto = getSelectedObjectDesc()
        this.achievments = getSelectedPlayerAchievments()
    }

    async changeClothes() {
        document.querySelector(SELECTORS.avatar)?.click()
        await delay(200)
        if (this.#check_myPlayer(getSelectedObjectName(), getSelectedObjectDesc(), getSelectedPlayerAchievments())) {
            const button = getButtonsNameMap(SELECTORS.menu_button).get("My clothes")
            if (button) {
                button.click()
                return true
            }
        }
        this.#refresh()
        return false
    }

    async changeMyDance(style, dance) {
        document.querySelector(SELECTORS.avatar)?.click()
        await delay(200)
        if (this.#check_myPlayer(getSelectedObjectName(), getSelectedObjectDesc(), getSelectedPlayerAchievments())) {
            const danceBtn = getButtonsNameMap(SELECTORS.menu_button).get("Dance")
            if (danceBtn) {
                danceBtn.click()
                await delay(200)
            }
            const styleBtn = getButtonsNameMap(SELECTORS.menu_button).get(style)
            if (styleBtn) {
                styleBtn.click()
                await delay(200)
            }
            const danceStyleBtn = getButtonsNameMap(SELECTORS.menu_button).get(dance)
            if (danceStyleBtn) {
                danceStyleBtn.click()
            }

            await delay(100)
            document.querySelector(SELECTORS.avatar)?.click()
            return true
        }
        this.#refresh()
        return false
    }

    async changeMyAction(action) {
        document.querySelector(SELECTORS.avatar)?.click()
        await delay(200)
        if (this.#check_myPlayer(getSelectedObjectName(), getSelectedObjectDesc(), getSelectedPlayerAchievments())) {
            const menu = getButtonsNameMap(SELECTORS.menu_button)
            const actionBtn = menu.get("Actions")
            if (actionBtn) {
                actionBtn.click()
                await delay(200)
            }

            const specificAction = getButtonsNameMap(SELECTORS.menu_button).get(action)
            if (specificAction) {
                specificAction.click()
            }

            await delay(100)
            document.querySelector(SELECTORS.avatar)?.click()
            return true
        }
        this.#refresh()
        return false
    }

    async showSign(line, number) {
        document.querySelector(SELECTORS.avatar)?.click()
        await delay(200)
        if (this.#check_myPlayer(getSelectedObjectName(), getSelectedObjectDesc(), getSelectedPlayerAchievments())) {
            const selector = `div.menu-list-split-3:nth-child(${line}) > div:nth-child(${number})`
            
            const menu = getButtonsNameMap(SELECTORS.menu_button)
            const signsBtn = menu.get("Signs")
            if (signsBtn) {
                signsBtn.click()
                await delay(200)
            }

            const sign = document.querySelector(selector)
            if (sign) {
                sign.click()
            }

            await delay(100)
            document.querySelector(SELECTORS.avatar)?.click()
            return true
        }
        this.#refresh()
        return false
    }
}

class Bot {
    constructor() {
        this.name = getSelectedObjectName()
        this.motto = getSelectedObjectDesc()
        this.owner = getSelectedObjectOwner()
    }

    static create() {
        if (!isBot()) {
            return null
        }
        return new this()
    }
}

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
};

unsafeWindow.RFuncs = {
    Core: RFuncsCore,
};