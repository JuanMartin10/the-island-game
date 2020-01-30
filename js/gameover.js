class GameOver {
    constructor(ctx, img) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = img;
        this.gravity = 0;
        this.posX = 180;
        this.posY = 150;
    }



    draw() {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
        );
    }
}