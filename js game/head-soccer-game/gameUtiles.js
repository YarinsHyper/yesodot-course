export function showSoccerItems(GAME_HEIGHT, GAME_WIDTH, context, soccerNet, soccerNetTwo) {
    context.fillStyle = "darkgrey";
    context.fillRect(5, GAME_HEIGHT - 340, 20, 260);
    context.fillRect(5, GAME_HEIGHT - 360, 180, 20);
    context.fillRect(GAME_WIDTH - 25, GAME_HEIGHT - 360, 20, 280);
    context.fillRect(GAME_WIDTH - 5, GAME_HEIGHT - 360, -180, 20);
    context.drawImage(soccerNet, 23, GAME_HEIGHT - 407, 170, 392);
    context.drawImage(soccerNetTwo, GAME_WIDTH - 184, GAME_HEIGHT - 407, 160, 392);
}

export function showScoreBar(context, backgroundImage, GAME_WIDTH, GAME_HEIGHT) {
    context.drawImage(backgroundImage, 0, 0, GAME_WIDTH, GAME_HEIGHT - 80);
    context.fillStyle = "darkgray";
    context.fillRect(0, 0, GAME_WIDTH, 55);
    context.fillStyle = "darkblue";
    context.fillRect(GAME_WIDTH / 2 + 55, 0, 70, 55);
    context.fillStyle = "darkred";
    context.fillRect(GAME_WIDTH / 2 - 165, 0, 70, 55);
    context.font = "45px Arial";
    context.fillStyle = "white";
}

export function showGameText(context, GAME_WIDTH, GAME_HEIGHT, score1, gameTimer, score2, grassImage, scoreString, colorString, timesUpString, fontString) {
    context.font = fontString;
    context.fillStyle = colorString;
    context.fillText(timesUpString, GAME_WIDTH / 2 - 145, 235);
    context.fillStyle = colorString;
    context.fillText(scoreString, GAME_WIDTH / 2 - 190, 165);
    context.drawImage(grassImage, 0, GAME_HEIGHT - 81, GAME_WIDTH, 80);
    context.fillStyle = "white";
    context.font = "550x Arial";
    context.fillText("" + localStorage.getItem(score2) + "   - " + "       -  " + localStorage.getItem(score1), GAME_WIDTH / 2 - 150, 42);
    context.fillText("[" + gameTimer + "]", GAME_WIDTH / 2 - 58, 42);
}