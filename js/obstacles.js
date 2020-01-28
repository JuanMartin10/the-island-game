class Obstacle {
    constructor(ctx, canvasW, playerY0, playerH) {
        this.ctx = ctx;
        this.width = 15;
        this.height = this.width * 3;
        this.velX = 0;
        this.posX = 230;
        // this.posX = Math.random() * (max - min) + min);
        //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.
        // this.posY = playerY0 + playerH - this.height - 5;
        this.posY = 150;
    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    move() {
        this.posX -= this.velX
    }
}