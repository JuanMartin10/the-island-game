const Game = {
    name: 'The Island Game',
    description: 'The Island Game, 1vs1 shooter game',
    author: 'Juan Antonio Martin',
    license: undefined,
    version: '1.0',
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    framesCounter: 0,
    player1: undefined,
    player2: undefined,
    fps: 24,
    // keys1: {
    //     // W: 87; S: 83; D: 68
    //     UP: 87,
    //     DOWN: 83,
    //     SHOT: 68
    // },
    // keys2: {
    //     // UP: 38; S: 40; D: 37
    //     UP: 38,
    //     DOWN: 40,
    //     SHOT: 37
    // },



    init() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start();
    },

    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++;
            this.clearBullets();
            this.clear();
            this.drawAll();
            this.moveAll();
            if (this.isCollision()) {
                console.log("Game Over Chaval");
                this.isCollisionPlayer1();
            }
            if (this.isCollision2()) {
                console.log("Game Over Chavalote");
                this.isCollisionPlayer2();
            }
        }, 1000 / this.fps)
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player1 = new Player(this.ctx, this.canvas.width, this.canvas.height, { UP: { code: 87, down: false }, DOWN: { code: 83, down: false }, SHOT: { code: 68, down: false } }, "./img/player1war.png", 40, 500, 10);
        this.player2 = new Player(this.ctx, this.canvas.width, this.canvas.height, { UP: { code: 38, down: false }, DOWN: { code: 40, down: false }, SHOT: { code: 37, down: false } }, "./img/player2war.png", 1140, 500, -10);

    },

    drawAll() {
        this.background.draw();
        this.player1.draw(this.framesCounter);
        this.player2.draw(this.framesCounter);
    },

    moveAll() {
        this.player1.move()
        this.player2.move()
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    // LIMPIEZA DE BULLETS
    clearBullets() {
        //funcion para limpiar bullets de player1
        this.player1.bullets.forEach((obs, idx) => {
            if (obs.posX >= (1280)) {
                this.player1.bullets.splice(idx, 1);
            }
        })

        //funcion para limpiar bullets de player2
        this.player2.bullets.forEach((obs, idx) => {
            if (obs.posX <= 0) {
                this.player2.bullets.splice(idx, 1);
            }
        })
    },

    // Comprobación de si las bullets del player 2 colisionan con el player1
    isCollision() {
        return this.player2.bullets.some(
            bull =>
                this.player1.posX + this.player1.width - 15 >= bull.posX &&
                this.player1.posY + this.player1.height >= bull.posY &&
                this.player1.posX <= bull.posX + 0
        );
    },

    // Comprobación de si las bullets del player1 colisionan con el player2
    isCollision2() {
        return this.player1.bullets.some(
            bull =>
                this.player2.posX + this.player2.width >= bull.posX &&
                this.player2.posY + this.player2.height >= bull.posY &&
                this.player2.posX <= bull.posX + 0
        );
    },

    // Eliminación del array de bullets del player 1 cuando choca con player 2
    isCollisionPlayer1() {
        this.player2.bullets.forEach((obs, idx) => { this.player2.bullets.splice(idx, 1) })
    },


    // Eliminación del array de bullets del player 2 cuando choca con player 1
    isCollisionPlayer2() {
        this.player1.bullets.forEach((obs, idx) => { this.player1.bullets.splice(idx, 1) })
    },


}





