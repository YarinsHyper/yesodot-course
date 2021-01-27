export default class inputHandler {

    constructor(player, playerKeys, context) {

        document.addEventListener("keydown", event => {
            switch (event.code) {
                case playerKeys.up:
                    if (player.onPlatform) {
                        player.moveUp();
                    }
                    break;

                case playerKeys.left:
                    player.moveLeft();
                    break;

                case playerKeys.right:
                    player.moveRight();
                    break;

                case playerKeys.kick:
                    // player.kick(context);
                    player.kickCheck();
                    // player.kick();
                    break;
            }
        });

        document.addEventListener("keyup", event => {
            switch (event.code) {
                case playerKeys.left:
                    player.stop();
                    break;

                case playerKeys.up:
                    player.stop();
                    break;

                case playerKeys.right:
                    player.stop();
                    break;

                case playerKeys.kick:
                    // player.stopKick(context);
                    player.stop();
                    break;
            }
        });
    }
}