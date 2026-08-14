// Создание объекта игрока
const player = Player.create();
if (player) {
    console.log(`Ник: ${player.nick}`);
    console.log(`Достижения: ${player.achievments}`);
}

// Управление своим персонажем
const myCharacter = new myPlayer();
await myCharacter.changeMyDance("Classic", "Pogo Mogo");
await myCharacter.showSign(4, 2);
await myCharacter.changeMyAction("Blow");