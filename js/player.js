class Player {
    constructor(ctx, w, h, keys, img, posX, posY, velX, life, shotPos) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.image = new Image()
        this.image.src = img;

        this.width = 100;
        this.height = 140;

        this.posX = posX;
        this.posY0 = 0;
        this.posY1 = 500;
        this.posY = posY;

        this.direction = {
            top: false,
            down: false,
        }

        this.velY = 10;
        this.velX = velX;

        this.shot = shotPos;

        this.life = life;

        this.keys = keys;

        this.bullets = [];
        this.delay = true

        this.setListeners();
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height
        );

        this.bullets.forEach(bullet => bullet.draw());
    }
    // Movimiento del muñeco hacia arriba
    move() {
        if (this.posY >= this.posY0 && this.keys.UP.down) {
            this.posY -= 30;
            this.velY = 1;
        }

        if (this.posY <= this.posY1 && this.keys.DOWN.down) {
            this.posY += 30;
            this.velY += 1;
        }

        this.bullets.forEach(bullet => bullet.move()); //Movemos las balas

    }

    setListeners() {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.UP.code:
                    this.keys.UP.down = true;
                    this.move();
                    break;
                case this.keys.DOWN.code:
                    this.keys.DOWN.down = true;
                    this.move();
                    break;
            }
        })
        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case this.keys.UP.code:
                    this.keys.UP.down = false;
                    break;
                case this.keys.DOWN.code:
                    this.keys.DOWN.down = false;
                    break;
                case this.keys.SHOT.code:
                    this.keys.SHOT.down = false;
                    this.shoot();
                    break;
            }
        })
    }

    shoot() {
        //Instanciamos nuevas balas
        if (this.delay) {
            this.bullets.push(new Bullet(this.ctx, this.shot, this.posY + 74, this.posY0, this.height, this.velX))
            this.delay = false
            setTimeout(() => {
                this.delay = true
            }, 10);
        }

    }
}