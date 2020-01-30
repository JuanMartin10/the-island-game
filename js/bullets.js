class Bullet {
    constructor(ctx, x, y, y0, playerH, velX) {
        this.ctx = ctx
        this.posX = x;
        this.posY = y;
        this.posY0 = y0
        this.playerHeight = playerH
        this.velX = velX + 1;
        this.radius = 5;
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "black";
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move() {
        this.posX += this.velX * 4
    }
}