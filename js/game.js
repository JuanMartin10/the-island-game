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
    fps: 60,
    obstacles: [],
    contObstacles: 0,
    score1: undefined,
    score2: undefined,



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
            this.drawScore();
            if (this.isCollision()) {
                this.isCollisionPlayer1();
                this.life1 = this.life1 - 1;
                this.life1 === 0 ? (this.gameover1.draw(), this.clearInterval()) : null;
            }
            if (this.isCollision2()) {
                this.isCollisionPlayer2();
                this.life2 = this.life2 - 1;
                this.life2 === 0 ? (this.gameover2.draw(), this.clearInterval()) : null;
            }
            this.gameover();

            if (this.contObstacles < 6) this.generateObstacles();

            this.isCollisionObjectBullets2()
            this.isCollisionObjectBullets1()




        }, 1000 / this.fps)
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player1 = new Player(this.ctx, this.canvas.width, this.canvas.height, { UP: { code: 87, down: false }, DOWN: { code: 83, down: false }, SHOT: { code: 68, down: false } }, "./img/player1war.png", 40, 500, 10, this.life1, this.shotX1);
        this.player2 = new Player(this.ctx, this.canvas.width, this.canvas.height, { UP: { code: 38, down: false }, DOWN: { code: 40, down: false }, SHOT: { code: 37, down: false } }, "./img/player2war.png", 1140, 500, -10, this.life2, this.shotX2);
        this.obstacles = [];
        this.score1 = new ScoreBoard(this.ctx, 40, 120);
        this.score2 = new ScoreBoard(this.ctx, 1140, 120);
        this.score1.init(this.ctx);
        this.score2.init(this.ctx);



    },
    drawScore() {
        //con esta funcion pintamos el marcador
        this.score1.update1(this.life1);
        this.score2.update2(this.life2);

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
        if (this.framesCounter % 10 == 0) {
            this.contObstacles++
            this.obstacles.push(new Obstacle(this.ctx, this.canvas.width, this.canvas.height, this.shotX1, this.shotX2)); //pusheamos nuevos obstaculos
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
            bull =>
                bull.posY + 5 >= this.player2.posY &&
                bull.posX + 5 >= this.player2.posX &&
                bull.posY - 5 <= this.player2.posY + this.player2.height

        );
    },

    // Eliminación del array de bullets del player 1 cuando choca con player 2 o choca con objetos
    isCollisionPlayer1() {
        this.player2.bullets.some((bull, idx) => {
            if (this.isCollision() || this.isCollisionObjectBullets2()) {
                this.player2.bullets.splice(idx, 1)
            }
        }
        )
    },


    // Eliminación del array de bullets del player 2, cuando choca con player 1 o choca con objetos
    isCollisionPlayer2() {
        this.player1.bullets.some((bull, idx) => {
            if (this.isCollision2() || this.isCollisionObjectBullets1()) {
                this.player1.bullets.splice(idx, 1)
            }
        }
        )
    },

    // Comprobación de si las bullets del player1 colisionan con algun objeto
    isCollisionObjectBullets1() {
        return this.player1.bullets.some(
            (bull, idx) => this.obstacles.some(
                obst => {

                    if (bull.posY + 5 >= obst.posY &&
                        bull.posX + 5 >= obst.posX - 10 &&
                        bull.posY + 5 <= obst.posY + obst.height &&
                        bull.posX + 5 <= obst.posX + 10 + obst.width) {

                        this.player1.bullets.splice(idx, 1)
                        return true
                    }
                }
            ));
    },
    // Comprobación de si las bullets del player 2 colisionan con algun objeto
    isCollisionObjectBullets2() {
        console.log("piun piun")
        return this.player2.bullets.some(
            (bull, idx) => this.obstacles.some(
                (obst, obsIdx) => {
                    console.log("lado arriba\n", bull.posY + 5 >= obst.posY, "lado abajo\n", bull.posY + 5 <= obst.posY + obst.height, "lado dcho\n", bull.posX + 5 <= obst.posX + obst.width, "lado izq\n ", bull.posX + 5 > obst.posX)
                    if (bull.posY + 5 >= obst.posY &&
                        bull.posX + 5 >= obst.posX - 10 &&
                        bull.posY + 5 <= obst.posY + obst.height &&
                        bull.posX + 5 <= obst.posX + 10 + obst.width) {
                        console.log(idx, obsIdx)
                        this.player2.bullets.splice(idx, 1)
                        return true
                    }
                }

            ));
    },
    gameover() {
        this.gameover1 = new GameOver(this.ctx, "./img/gameOver1.png")
        this.gameover2 = new GameOver(this.ctx, "./img/gameOver2.png")
    },

    clearInterval() {
        clearInterval(this.interval);
    }


}





