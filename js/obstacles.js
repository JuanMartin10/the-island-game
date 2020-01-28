class Obstacle {
    constructor(ctx, canvasWidth, canvasHeight, shotX1, shotX2) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.width = 15;
        this.height = this.width * 5;
        this.velX = 0;
        this.shotX1 = shotX1;
        this.shotX2 = shotX2;
        // La posicion en X queda delimitada a 140 pixeles a la derecha del player 1, y 140 pixeles a la izquierda del player2
        this.posX = Math.random() * ((this.shotX2 - 100) - (this.shotX1 + 100)) + (this.shotX1 + 100)
        this.posY = Math.random() * ((this.canvasHeight - this.height) - 0) + 0;
        console.log(`Ancho juego ${this.shotX1}`)
        console.log(`Posicion en X: ${this.posX}`)
        console.log(`Alto juego ${this.shotX2}`)
        console.log(`Posicion en Y: ${this.posY}`)
        //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.
        // this.posY = playerY0 + playerH - this.height - 5;

    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    move() {
        this.posX -= this.velX
    }
}