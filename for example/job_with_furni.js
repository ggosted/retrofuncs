// Создание объекта мебели
const furni = Furni.create();
if (furni) {
    console.log(`Имя: ${furni.name}`);
    console.log(`Владелец: ${furni.owner}`);
    
    // Использование мебели
    if (furni.usable) {
        actionWithFurni("Use");
        actionWithFurni("Rotate");
        actionWithFurni("Move");
        //actionWithFurni("Pick up");
    }
    
    // Покупка мебели
    if (furni.purchasable) {
        openCatalog();
    }
}