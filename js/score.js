//este literal mantiene el marcador del juego con su puntuación
class ScoreBoard {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.posX = x;
        this.posY = y;

    }

    init(ctx) {
        this.ctx = ctx
        // this.ctx.font = "30px sans-serif"
        this.ctx.font = "40px vcr osd mono"
    }

    update1(score) {
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`SCORE: `, 220, 50);
        this.ctx.fillText(+ score + ` LIFES`, 200, 90)



    }
    update2(score) {
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`SCORE: `, 870, 50);
        this.ctx.fillText(+ score + ` LIFES`, 850, 90)

    }

}