class GameOver {
    constructor(ctx, img) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = img;
        this.gravity = 0;
        this.posX = 500;
        this.posY = 203;
    }



    draw() {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
        );
        // Escritura de "player"
        // this.ctx.fillStyle = "black";
        // this.ctx.fillText(`player 1`, 500, 600);
    }
}