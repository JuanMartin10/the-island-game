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
    life1: 5,
    life2: 5,
    shotX1: 140,
    shotX2: 1140,
    fps: 24,
    obstacles: [],

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
            // console.log(this.life1)
            this.framesCounter++;
            this.clearBullets();
            this.clear();
            this.drawAll();
            this.moveAll();
            if (this.isCollision()) {
                this.isCollisionPlayer1();
                this.life1 = this.life1 - 1;
                this.life1 === 0 ? alert("Game Over, Ha ganado player 2") : null;
            }
            if (this.isCollision2()) {
                this.isCollisionPlayer2();
                this.life2 = this.life2 - 1;
                this.life2 === 0 ? alert("Game Over, Ha ganado player 1") : null;
            }
            this.generateObstacles();

        }, 1000 / this.fps)
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player1 = new Player(this.ctx, this.canvas.width, this.canvas.height, { UP: { code: 87, down: false }, DOWN: { code: 83, down: false }, SHOT: { code: 68, down: false } }, "./img/player1warfani.png", 40, 500, 10, this.life1, this.shotX1);
        this.player2 = new Player(this.ctx, this.canvas.width, this.canvas.height, { UP: { code: 38, down: false }, DOWN: { code: 40, down: false }, SHOT: { code: 37, down: false } }, "./img/player2warchris.png", 1140, 500, -10, this.life2, this.shotX2);
        this.obstacles = [];
    },

    drawAll() {
        this.background.draw();
        this.player1.draw(this.framesCounter);
        this.player2.draw(this.framesCounter);
        this.obstacles.forEach(obs => obs.draw());

    },

    moveAll() {
        this.player1.move()
        this.player2.move()
        this.obstacles.forEach(obs => obs.move());
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    generateObstacles() {
        if (this.framesCounter % 70 == 0) {
            //Generamos obstaculos cada 70 frames.
            console.log(this.obstacles);
            this.obstacles.push(new Obstacle(this.ctx)); //pusheamos nuevos obstaculos
        }
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
                bull.posY + 5 >= this.player1.posY &&
                bull.posX - 5 <= this.player1.posX + this.player1.width &&
                bull.posY - 5 <= this.player1.posY + this.player1.height
        );
    },

    // Comprobación de si las bullets del player1 colisionan con el player2
    isCollision2() {
        return this.player1.bullets.some(
            bull => bull.posY + 5 >= this.player2.posY &&
                bull.posX + 5 >= this.player2.posX &&
                bull.posY - 5 <= this.player2.posY + this.player2.height
        );
    },

    // Eliminación del array de bullets del player 1 cuando choca con player 2
    isCollisionPlayer1() {
        this.player2.bullets.some((bull, idx) => {
            if (this.isCollision()) {
                this.player2.bullets.splice(idx, 1)
            }
        }
        )
    },


    // Eliminación del array de bullets del player 2 cuando choca con player 1
    isCollisionPlayer2() {
        this.player1.bullets.some((bull, idx) => {
            if (this.isCollision2()) {
                this.player1.bullets.splice(idx, 1)
            }
        }
        )
    },


}





