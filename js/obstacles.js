class Obstacle {
    constructor(ctx, canvasWidth, canvasHeight, shotX1, shotX2) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.width = 15;
        this.height = this.width * 5;
        this.velY = Math.random() * ((1) - (-1)) + (-1)
        this.shotX1 = shotX1;
        this.shotX2 = shotX2;
        // La posicion en X queda delimitada a 140 pixeles a la derecha del player 1, y 140 pixeles a la izquierda del player2
        this.posX = Math.random() * ((this.shotX2 - 100) - (this.shotX1 + 100)) + (this.shotX1 + 100)
        // this.posX = 430
        // La posicion en Y queda delimitada al alto del canvas menos el tamaño del objeto y por arriba el 0
        // this.posY = Math.random() * ((this.canvasHeight - this.height) - 0) + 0;
        this.posY = 100

    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    move() {
        this.posY = this.posY - (this.velY * 20)
        if (this.posY <= 0) {
            this.velY *= -1
        } else if (this.posY >= (this.canvasHeight - this.height)) {
            this.velY *= -1
        }

    }
}
