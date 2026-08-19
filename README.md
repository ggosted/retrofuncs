# retrofuncs
Данный скрипт предназначен для автоматизации взаимодействия с элементами интерфейса в SodaHotel. 

ВСПОМОГАТЕЛЬНЫЕ
delay(ms) - задержка в милисекундах (вызывать строго с await!)
getButtonsNameMap(selector) - Выводит map вида textContent:element. (map)

ПРОВЕРКИ(true/false)
isContainerOpen() - Проверяет открыто ли боковое меню с описанием мебели/игрока/бота
isBot() - Проверяет является ли выбранный объект ботом
isPlayer() - Проверяет является ли выбранный объект игроком
isFurni() - Проверяет является ли выбранный объект мебелью
isHaveRights() - Проверяет есть ли в комнате права (для этого нужно кликнуть либо (на) игрока,  мебель,  бота)
isBuyable() - Можно ли купить эту мебель
isUsable() - Можно ли использовать эту мебель

ПОЛУЧЕНИЕ ДАННЫХ
getCredits() - Получить количество твоих монет(строка)
getDiamonds() - Получить количество твоих алмазов(строка)
getSelectedPlayerAchievments() - Получить количество опыта/достижений у выбранного игрока(строка)
getSelectedObjectName() - Получить название выбранного объекта(строка)
getSelectedObjectDesc() - Получить описание выбранного объекта(строка)
getSelectedObjectOwner() - Получить владельца выбранного объекта(строка)
getChatHistory() - Получить текущую истории чата.(список)

ФУНКЦИИ
sendChatMessage(message) - Отправка сообщения в чат

КЛАССЫ
class Furni - Хранит данные о мебели, которая выбрана. Список данных - Название, описание, владелец, можно ли использовать, можно ли купить
class SelectedFurni - Хранит те же данные, которые в Furni. Позволяет взаимодействовать с мебелью. Имеет функции:
    openCatalog() - Находит эту мебель в каталоге
    actionWithFurni(action) - Взаимодействует этой мебелью. Список действий: ['Move', 'Rotate', 'Pick up', 'Use']
class Player - Хранит данные о игроке, который выбран. Список данных - никнейм, описание, достижения
class myPlayer - Хранит те же данные что и Player. Позволяет взаимодействовать с ТВОИМ персонажем. Имеет функции:
    сhangeClothes() - Открывает меню смены одежды
    changeMyDance(style, dance) - Изменяет танец игрока. Доступные стили: Classic, Freestyle, Drill, Fortnite
        Доступные танцы в Classic: Dance, Pogo Mogo, Duck Funk, The Rollie
        Доступные танцы в Freestyle: The Shuffle, Robot, Hype Jump, The Sway, Wave Rider, Breakdown, Bubbling, Rave Nod
        Доступные танцы в Drill: Get Sturdy, Woo Walk, Rah Rah, Milly Rock, Smoove Walk, Dun Dun
        Доступные танцы в Fortnite: Floss, Take the L, Orange Justice, Default Dance
    stopMyDance() - Останавливает текущий танец
    changeMyAction(action) - Включает действие персонажа. Доступные: Sit, Wave, Laugh, Blow, Idle
    showSign(line, number) - Игрок показывает знак. Line - это линия сверху вниз в меню Sign(1 - 6), number - Какой по номеру знак(от начала линии!). 1-3
class Bot - Хранит данные о выбранном боте. Список данных: Имя, описание, владелец
Все вышеуказанные классы создаются так:
var = class.create()
и их методы возвращают true/false.

class Chat - Этот класс создаётся для перехвата сообщений в чат. Позволяет создать свою команду.
addChatCommand(Команда, функция.) - создаёт команду, которая выполняет ту или иную функцию. 

