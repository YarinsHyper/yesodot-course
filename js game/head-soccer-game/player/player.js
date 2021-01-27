export default class Player {

    constructor(gameWidth, gameHeight, playerInfo) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.playerName = playerInfo.playerName;

        this.left = false;
        this.right = false;
        this.up = false;
        this.kicking = false;

        this.backwardSpeed = false;
        this.gravity = false;
        this.onPlatform = true;

        this.width = playerInfo.width;
        this.height = playerInfo.height;
        this.ballWidth = 55;
        this.ballHeight = 45;
        this.angle = 0;

        this.maxSpeed = 10;
        this.maxJumpSpeed = 16;

        this.speed = 0;
        this.jumpSpeed = 0;

        this.position = {
            x: playerInfo.x,
            y: playerInfo.y,
            x2: playerInfo.x + this.width,
            y2: playerInfo.y + this.height
        };
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
        this.left = true;
    }

    moveRight() {
        this.speed = this.maxSpeed;
        this.right = true;
    }

    moveUp() {
        this.jumpSpeed = -this.maxJumpSpeed;
        this.up = true;
        this.gravity = true;
        this.onPlatform = false;
    }

    stop() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.speed = 0;
        this.kicking = false;
    }

    kickCheck() {
        this.kicking = true;
    }

    friction() {
        if (!this.backwardSpeed) {
            return;
        }
        if (this.speed > 0) {
            this.speed -= 0.25;
        }
        else if (this.speed < 0) {
            this.speed += 0.25;
        }
        else {
            this.backwardSpeed = false;
        }
    }

    kick() {
        if (!this.kicking) {
            if (this.angle === 0) {
                return;
            }
            if (this.playerName === "player1") {
                this.angle -= 5;
            }
            else if (this.playerName === "player2") {
                this.angle += 5;
            }
        }
        else {
            if (this.playerName === "player1") {
                if (this.angle < 60) {
                    this.angle += 5;
                }
            }
            else if (this.playerName === "player2") {
                if (this.angle > -60) {
                    this.angle -= 5;
                }
            }
        }
    }

    airMovement() {
        if (!this.gravity) {
            return;
        }
        if (this.jumpSpeed < this.maxJumpSpeed) {
            this.jumpSpeed += 1;
        }
        else {
            this.gravity = false;
        }
        if (this.jumpSpeed == this.maxJumpSpeed && this.position.y == this.gameHeight - 180) {
            this.jumpSpeed = 0;
            this.onPlatform = true;
        }
    }

    draw(context, imagePlayer, imageLeg) {
        let playerImage = new Image();
        let legImage = new Image();
        playerImage.src = imagePlayer;
        legImage.src = imageLeg;
        context.drawImage(playerImage, this.position.x, this.position.y, this.width, this.height);
        if (this.playerName === "player2") {
            context.save();
            context.translate(this.position.x + (this.width / 2), this.position.y + (this.height / 2));
            context.rotate(this.angle * Math.PI / 180);
            context.drawImage(legImage, this.width / 4, this.height / 7, this.ballWidth, this.ballHeight);
            context.restore();
        }
        else {
            context.save();
            context.translate(this.position.x + (this.width / 2), this.position.y + (this.height / 2));
            context.rotate(this.angle * Math.PI / 180);
            context.drawImage(legImage, -this.width / 1.3, this.height / 7, this.ballWidth, this.ballHeight);
            context.restore();
        }
    }

    update(deltaTime) {
        if (!deltaTime) return;

        this.position.x += this.speed;
        this.position.y += this.jumpSpeed;

        if (this.position.x < 25) this.position.x = 25;
        if (this.position.x + this.width > this.gameWidth - 25) this.position.x = this.gameWidth - this.width - 25;
        if ((this.position.x <= 185 || this.position.x >= this.gameWidth - 185) && (this.position.y < 380)) this.position.y = 380;

        this.friction();
        this.airMovement();
        this.kick();
    }
}