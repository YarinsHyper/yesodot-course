export default class Ball {

    constructor(gameWidth, gameHeight, ballInfo) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.left = false;
        this.right = false;
        this.up = false;

        this.backwardSpeed = true;
        this.gravity = false;
        this.onPlatform = true;

        this.width = ballInfo.width;
        this.height = ballInfo.height;

        this.maxSpeed = 12;
        this.maxJumpSpeed = 34;

        this.speed = 0;
        this.jumpSpeed = 0;

        this.position = {
            x: ballInfo.x,
            y: ballInfo.y,
            x2: ballInfo.x + this.width,
            y2: ballInfo.y + this.height
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

    friction() {
        if (!this.backwardSpeed) {
            return;
        }
        if (this.speed > 0) {
            this.speed -= 2;
        }
        else if (this.speed < 0) {
            this.speed += 2;
        }
        else {
            this.backwardSpeed = false;
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

    draw(context, imageBall) {
        let ballImage = new Image();
        ballImage.src = imageBall;
        context.drawImage(ballImage, this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        if (!deltaTime) return;

        this.position.x += this.speed;
        this.position.y += this.jumpSpeed;

        if (this.position.x < 25) this.position.x = 25;
        if (this.position.x > this.GameWidth - 25) this.position.x = this.GameWidth - 25;
        // if (this.position.x2 > this.gameWidth - 25) this.position.x2 = this.gameWidth - this.width - 25;
        // if ((this.position.x <= 185 || this.position.x >= this.gameWidth - 185) && (this.position.y < 380)) this.position.y = 360;
        // if ((this.position.x <= 185 || this.position.x >= this.gameWidth - 185) && (this.position.y < 360)) this.position.y = 380;

        this.friction();
        this.airMovement();
    }
}