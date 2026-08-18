
function getButtonsNameMap(selector) {
    const elem = document.querySelectorAll(selector)
    return new Map(
        Array.from(elem).map(item => [item.textContent, item])
    )
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const RFuncsUtils = {
    getButtonsNameMap: getButtonsNameMap,
    delay: delay
}

unsafeWindow.RFuncs = {
    Utils: RFuncsUtils
};
console.log('RFuncs Utils загружен!');