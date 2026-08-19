function getButtonsNameMap(selector) {
    const elem = document.querySelectorAll(selector)
    return new Map(Array.from(elem).map(item => [item.textContent.trim(), item]))
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const SELECTORS = {
    bubble:".chat-bubble",
    message_bubble:".message",
    nick_bubble:".username",
    credits: '.col-10 > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)',
    diamonds: '.col-10 > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)',
    info_container: 'div.gap-2:nth-child(2)',
    selected_player_achievments: '.text-center',
    selected_object_name: '.nitro-card-header-text',
    selected_object_desc: 'div.text-wrap:nth-child(1)',
    selected_object_owner: 'div.d-inline:nth-child(2)',
    furni_button: '.btn-dark',
    menu_button: '.menu-item',
    avatar: 'div.d-flex:nth-child(7)',
    buybutton: '.text-decoration-underline',
    bot_bagde: '.badge-image[style*="BOT.gif"]',
    chat: '.chat-input',
    chatSendButton: '.chat-send-btn, .send-btn, button[type="submit"]'
}

const actionfurnilist = ['Move', 'Rotate', 'Pick up', 'Use']

let chathist = [];

function isContainerOpen() {
    return document.querySelector(SELECTORS.info_container) !== null
}

function isBot() {
    return isContainerOpen() && document.querySelector(SELECTORS.bot_bagde) !== null
}

function isPlayer() {
    return isContainerOpen() && document.querySelector(SELECTORS.selected_player_achievments) !== null
}

function isFurni() {
    return isContainerOpen() && !isBot() && !isPlayer()
}

function isHaveRights() {
    if (!isContainerOpen()) return null
    const buttons = document.querySelectorAll(SELECTORS.furni_button)
    const buttons2 = document.querySelectorAll(SELECTORS.menu_button)
    if (buttons2.length === 5 || (buttons.length <= 1 && (isFurni() || isBot()))) {
        return false
    }
    return true
}

function isBuyable() {
    return isContainerOpen() && document.querySelector(SELECTORS.buybutton) !== null && !isPlayer()
}

function isUsable() {
    return isFurni() && getButtonsNameMap(SELECTORS.furni_button).get('Use') !== null
}

function getCredits() {
    return document.querySelector(SELECTORS.credits)?.textContent || null
}

function getDiamonds() {
    return document.querySelector(SELECTORS.diamonds)?.textContent || null
}

function getSelectedPlayerAchievments() {
    if (!isPlayer()) return null
    return document.querySelector(SELECTORS.selected_player_achievments)?.textContent || null
}

function getSelectedObjectName() {
    if (!isContainerOpen()) return null
    return document.querySelector(SELECTORS.selected_object_name)?.textContent || null
}

function getSelectedObjectDesc() {
    if (!isContainerOpen()) return null
    return document.querySelector(SELECTORS.selected_object_desc)?.textContent || null
}

function getSelectedObjectOwner() {
    if (!isContainerOpen() || isPlayer()) return null
    return document.querySelector(SELECTORS.selected_object_owner)?.textContent || null
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
        if (!isFurni()) return null
        return new this()
    }
}

class SelectedFurni extends Furni {
    constructor() {
        super()
    }
    #check_furni(name, desc, owner) {
        return this.name === name && this.desc === desc && this.owner === owner && isHaveRights()
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
            if (actionfurnilist.indexOf(action) !== -1 && isContainerOpen() && this.usable && isHaveRights() && isFurni()) {
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
            const button = getButtonsNameMap(SELECTORS.menu_button).get('My clothes')
            if (button) {
                button.click()
                return true
            }
        }
        this.#refresh()
        return false
    }
    async stopMyDance(){
        document.querySelector(SELECTORS.avatar)?.click()
        await delay(200)
        if (this.#check_myPlayer(getSelectedObjectName(), getSelectedObjectDesc(), getSelectedPlayerAchievments())) {
            const danceBtn = getButtonsNameMap(SELECTORS.menu_button).get('Stop Dancing')
            if (danceBtn) {
                danceBtn.click()
                await delay(200)
            }}}
    async changeMyDance(style, dance) {
        document.querySelector(SELECTORS.avatar)?.click()
        await delay(200)
        if (this.#check_myPlayer(getSelectedObjectName(), getSelectedObjectDesc(), getSelectedPlayerAchievments())) {
            const danceBtn = getButtonsNameMap(SELECTORS.menu_button).get('Dance')
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
            const actionBtn = menu.get('Actions')
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
            const signsBtn = menu.get('Signs')
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
        if (!isBot()) return null
        return new this()
    }
}
function getChatHistory(){
    const chathist = [];
    document.querySelectorAll('.chat-bubble').forEach(b => {
        const nick = b.querySelector('.username')?.textContent.replace(/: $/, '').trim();
        const msg = b.querySelector('.message')?.textContent.trim();
        if (nick && msg) chathist.push(`${nick} : ${msg}`);
    });
    return chathist

}
function sendChatMessage(message) {
    if (!message || !message.trim()) return false
    if (window._sending) return false
    
    const chatInput = window._originalChat || document.querySelector(SELECTORS.chat)
    if (!chatInput) return false
    
    window._sending = true
    
    chatInput.value = message.trim()
    chatInput.focus()
    chatInput.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true
    }))
    
    setTimeout(() => { window._sending = false }, 100)
    return true
}
class Chat {
    constructor(selector) {
        this.selector = selector
        this.commands = new Map()
        this.element = null
        this.intervalId = null
        this.isProcessing = false
        this.init()
    }
    
    init() {
        this.replaceChat()
        this.startWatchdog()
    }
    
    replaceChat() {
        const original = document.querySelector(this.selector)
        if (!original) return
        
        if (original.dataset.chatInitialized === 'true') {
            this.element = original
            return
        }
        
        const clone = original.cloneNode(true)
        clone.dataset.chatInitialized = 'true'
        original.parentNode.insertBefore(clone, original)
        original.style.visibility = 'hidden'
        this.element = clone
        this.bindEvents()
        window._originalChat = original
    }
    
    bindEvents() {
        this.boundHandleKeydown = this.handleKeydown.bind(this)
        this.element.removeEventListener('keydown', this.boundHandleKeydown)
        this.element.addEventListener('keydown', this.boundHandleKeydown)
    }
    
    handleKeydown(event) {
        if (event.key === 'Enter' && !this.isProcessing) {
            this.isProcessing = true
            
            const text = this.element.value.trim()
            if (!text) {
                this.isProcessing = false
                return
            }
            
            if (this.commands.has(text)) {
                this.commands.get(text)()
                this.element.value = ''
                this.isProcessing = false
            } else {
                sendChatMessage(text)
                this.element.value = ''
                setTimeout(() => { this.isProcessing = false }, 200)
            }
        }
    }
    
    startWatchdog() {
        this.intervalId = setInterval(() => {
            if (!document.contains(this.element)) {
                this.replaceChat()
            }
        }, 500)
    }
    
    addChatCommand(command, callback) {
        this.commands.set(command, callback)
        return this
    }
    
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
        if (this.element) {
            this.element.remove()
        }
        if (window._originalChat) {
            window._originalChat.style.visibility = 'visible'
        }
    }
}

console.log('RetroFuncs loaded')
