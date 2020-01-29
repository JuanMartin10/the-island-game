//este literal mantiene el marcador del juego con su puntuación
class ScoreBoard {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.posX = x;
        this.posY = y;

    }

    init(ctx) {
        this.ctx = ctx
        this.ctx.font = "30px sans-serif"
    }

    update1(score) {
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`PLAYER 1: ` + score + ` vidas`, 200, 50);
        console.log("la vida", score)
    }
    update2(score) {
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`PLAYER 2: ` + score + ` vidas`, 800, 50);
        console.log("pinta el score")
    }

}