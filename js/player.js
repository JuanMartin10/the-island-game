class Player {
    constructor(ctx, w, h, keys, img, posX, posY) {
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

        this.keys = keys;

        this.bullets = [];

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
            this.velY = 100;
        }

        if (this.posY <= this.posY1 && this.keys.DOWN.down) {
            this.posY += 30;
            this.velY += 10;
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
                case this.keys.SHOT.code:
                    this.direction.down = true;
                    this.shoot();
                    console.log("dispara")
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
                    this.direction.down = false;
                    console.log("dispara2")
                    break;
            }
        })
    }

    shoot() {
        //Instanciamos nuevas balas
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.posY0, this.height));
        console.log(`Instancia las balas`)
    }
}