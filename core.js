let SELECTORS = {
    credits: '.col-10 > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)',
    diamonds: '.col-10 > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)',
    info_container: 'div.gap-2:nth-child(2)',
    selected_player_achievments: '.text-center',
    selected_object_name: '.nitro-card-header-text',
    selected_object_desc: 'div.text-wrap:nth-child(1)',
    selected_object_owner: 'div.d-inline:nth-child(2)',
    furni_button:".btn-dark",
    menu_button:".menu-item",
    avatar: "div.d-flex:nth-child(7)",
    buybutton: '.text-decoration-underline',
    bot_bagde: '.badge-image[style*="BOT.gif"]',

};
let actionfurnilist = ["Move", "Rotate", "Pick up", "Use"]




function openCatalog() {
    if(isContainerOpen() && this.purchasable && isFurni()){
        const button = document.querySelector(SELECTORS.buybutton)
        if (button){
            button.click()
            return true
        }
    }
    return false
}

function actionWithFurni(action){
    if(actionfurnilist.indexOf(action) != -1 && isContainerOpen() && this.usable && isHaveRights() && isFurni()){
        const menu = getButtonsNameMap(SELECTORS.furni_button)
        const button = menu.get("Use")
        if (button){
            button.click()
            return true
        }
    }
    return false
}

function getButtonsNameMap(selector) {
    const elem = document.querySelectorAll(selector);
    return new Map(
        Array.from(elem).map(item => [item.textContent, item])
    );
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function isContainerOpen(){
    if (document.querySelector(SELECTORS.info_container) != null){
        return true
    }
    return false
}
function isHaveRights() {
    if (!isContainerOpen()){return null}
    const buttons = document.querySelectorAll(SELECTORS.furni_button)
    const buttons2 = document.querySelectorAll(SELECTORS.menu_button)
    if (buttons2.length == 5 || (buttons.length <= 1 && isFurni() || isBot())) {
        return false
    }

    return true
}

function isBot(){
    if (isContainerOpen && document.querySelector(SELECTORS.bot_bagde) != null){
        return true
    }
    return false
}

function isPlayer(){
    if (isContainerOpen && document.querySelector(SELECTORS.selected_player_achievments) != null){
        return true
    }
    return false
}

function isFurni(){
    if(isContainerOpen && isBot() == false && isPlayer() == false){
        return true
    }
    return false
}

function isBuyable(){
    if (isContainerOpen && document.querySelector(SELECTORS.buybutton) != null && isPlayer() == false){
        return true
    }
    return false
}

function isUsable(){
    if (isContainerOpen && getButtonsNameMap(SELECTORS.furni_button).get("Use") != null && isFurni()){
        return true
    }
    return false
}

function getCredits(){
    return document.querySelector(SELECTORS.credits).textContent
}

function getDiamonds(){
    return document.querySelector(SELECTORS.diamonds).textContent
}

function getSelectedPlayerAchievments(){
    if (isPlayer()){
        return document.querySelector(SELECTORS.selected_player_achievments).textContent
    }
    return null
}

function getSelectedObjectName(){
    if(isContainerOpen()){
        return document.querySelector(SELECTORS.selected_object_name).textContent
    }
    return null
}

function getSelectedObjectDesc(){
    if(isContainerOpen()){
        return document.querySelector(SELECTORS.selected_object_desc).textContent
    }
    return null
}

function getSelectedObjectOwner(){
    if(isContainerOpen() && isPlayer() == false){
        return document.querySelector(SELECTORS.selected_object_owner).textContent
    }
    return null
}




class Furni{
    constructor(){
        this.name = getSelectedObjectName()
        this.desc = getSelectedObjectDesc()
        this.owner = getSelectedObjectOwner()
        this.usable = isUsable()
        this.purchasable = isBuyable()
    }
    static create() {
        if (!isFurni()) {
            return null;
        }
        return new this()
    }
}

class Player{
    constructor(){
        this.nick = getSelectedObjectName()
        this.motto = getSelectedObjectDesc()
        this.achievments = getSelectedPlayerAchievments
    }
    static create() {
        if (!isPlayer()) {
            return null;
        }
        return new this()
    }
}

class myPlayer extends Player{
    constructor(){
        super()
    }
    async changeClothes(){
        document.querySelector(SELECTORS.avatar).click()
        if (this.nick == getSelectedObjectName()){
            await delay(200)
            getButtonsNameMap(SELECTORS.menu_button).get("My clothes").click()
            return true    
        }
        return false
        }
    async changeMyDance(style, dance){
        document.querySelector(SELECTORS.avatar).click()
        await delay(200)
        if (this.nick == getSelectedObjectName()){
            getButtonsNameMap(SELECTORS.menu_button).get("Dance").click()
            await delay(200)
            getButtonsNameMap(SELECTORS.menu_button).get(style).click()
            await delay(200)
            getButtonsNameMap(SELECTORS.menu_button).get(dance).click()
            document.querySelector(SELECTORS.avatar)
            return true
        }
        return false
    }
    async changeMyAction(action){
        document.querySelector(SELECTORS.avatar).click()
        await delay(200)
        if (this.nick == getSelectedObjectName()){
            getButtonsNameMap(SELECTORS.menu_button).get("Actions").click()
            await delay(200)
            getButtonsNameMap(SELECTORS.menu_button).get(action).click()
            await delay(100)
            document.querySelector(SELECTORS.avatar)
            return true
    }
        return false
    }
    async showSign(line, number){
        document.querySelector(SELECTORS.avatar).click()
        await delay(200)
        if (this.nick == getSelectedObjectName()){
            const selector = `div.menu-list-split-3:nth-child(${line}) > div:nth-child(${number})`
            getButtonsNameMap(SELECTORS.menu_button).get("Signs").click()
            await delay(200)
            document.querySelector(selector).click()
            await delay(100)
            document.querySelector(SELECTORS.avatar)
            return true
        }
        return false
    }
}

class Bot{
    constructor(){
        this.name = getSelectedObjectName()
        this.motto = getSelectedObjectDesc()
        this.owner = getSelectedObjectOwner()
    }

    static create(){
        if(!isBot){
            return null
        }
        return new this()
    }
}

console.log(`
  ██████╗ ███████╗████████╗██████╗  ██████╗ ███████╗██╗   ██╗███╗   ██╗ ██████╗███████╗
  ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗██╔════╝██║   ██║████╗  ██║██╔════╝██╔════╝
  ██████╔╝█████╗     ██║   ██████╔╝██║   ██║█████╗  ██║   ██║██╔██╗ ██║██║     ███████╗
  ██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║██╔══╝  ██║   ██║██║╚██╗██║██║     ╚════██║
  ██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝██║     ╚██████╔╝██║ ╚████║╚██████╗███████║
  ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚══════╝
                                                                                        
                               by ggosted
`);