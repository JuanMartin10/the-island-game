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
    obstacleImg: ["./obstacle/pibito1.png", "./obstacle/pibita1.png", "./obstacle/pibito2.png", "./obstacle/pibita2.png", "./obstacle/pibito3.png", "./obstacle/pibita3.png"],

    // obstacleImg: ["./obstacle/obstacle1.jpeg", "./obstacle/obstacle2.jpeg", "./obstacle/obstacle3.png", "./obstacle/obstacle4.png", "./obstacle/obstacle5.png", "./obstacle/obstacle6.jpeg"],
    countObsImg: 0,
    sound1: undefined,
    sound1Src: './sounds/fani.mp3',
    sound2: undefined,
    sound2Src: './sounds/christ.mp3',


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
            this.sounds();
            this.clear();
            this.drawAll();
            this.moveAll();
            this.drawScore();
            // this.isCollisionObjectBullets(this.player2, 0)
            // this.isCollisionObjectBullets(this.player1, 1280)
            this.isCollisionObjectBullets2();
            this.isCollisionObjectBullets1();
            this.contObstacles < 6 ? this.generateObstacles() : null;
            if (this.isCollisionPlayer1Bullets2()) {
                this.life1 = this.life1 - 1;
                console.log("has muerto")
                this.life1 === 0 ? (this.sound1.play(), setTimeout(() => { this.gameover1.draw(), this.clearInterval() }, 50), setTimeout(() => { this.start() }, 5000)) : null;
            }
            if (this.isCollisionPlayer2Bullets1()) {
                this.life2 = this.life2 - 1;
                console.log("has muerto2")

                this.life2 === 0 ? (this.sound2.play(), setTimeout(() => { this.gameover2.draw(), this.clearInterval() }, 50), setTimeout(() => { this.start() }, 5000)) : null;
            }
            this.gameover();


        }, 1000 / this.fps)
    },

    reset() {
        this.life1 = 5;
        this.life2 = 5;
        this.contObstacles = 0;
        this.countObsImg = 0

        this.background = new Background(this.ctx, this.width, this.height);
        this.player1 = new Player(this.ctx, this.canvas.width, this.canvas.height, { UP: { code: 87, down: false }, DOWN: { code: 83, down: false }, SHOT: { code: 68, down: false } }, "./img/player1warfani.png", 40, 500, 10, this.life1, this.shotX1);
        this.player2 = new Player(this.ctx, this.canvas.width, this.canvas.height, { UP: { code: 38, down: false }, DOWN: { code: 40, down: false }, SHOT: { code: 37, down: false } }, "./img/player2warchris.png", 1140, 500, -10, this.life2, this.shotX2);
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
            this.obstacles.push(new Obstacle(this.ctx, this.canvas.width, this.canvas.height, this.shotX1, this.shotX2, this.obstacleImg[this.countObsImg])); //pusheamos nuevos obstaculos
            this.countObsImg++
        }
    },

    // Comprobación de si las bullets del player1 colisionan con el player2
    isCollisionPlayer2Bullets1() {
        return this.player1.bullets.some(
            (bull, idx) => {
                if (bull.posY + 5 >= this.player2.posY &&
                    bull.posX + 5 >= this.player2.posX &&
                    bull.posY - 5 <= this.player2.posY + this.player2.height) {
                    this.player1.bullets.splice(idx, 1)
                    return true
                }
            }
        );
    },

    // Comprobación de si las bullets del player 2 colisionan con el player1
    isCollisionPlayer1Bullets2() {
        return this.player2.bullets.some(
            (bull, idx) => {
                if (bull.posY + 5 >= this.player1.posY &&
                    bull.posX - 5 <= this.player1.posX + this.player1.width &&
                    bull.posY - 5 <= this.player1.posY + this.player1.height) {
                    this.player2.bullets.splice(idx, 1)
                    return true
                }
            }
        );
    },



    // isCollisionObjectBullets(player, width) {
    //     return player.bullets.some(
    //         (bull, idx) => this.obstacles.some(
    //             obst => {

    //                 if ((bull.posY + 5 >= obst.posY &&
    //                     bull.posX + 5 >= obst.posX - 10 &&
    //                     bull.posY + 5 <= obst.posY + obst.height &&
    //                     bull.posX + 5 <= obst.posX + 10 + obst.width) || ((bull.posX <= (width)) || (bull.posX >= (width)))) {
    //                     player.bullets.splice(idx, 1)
    //                     return true
    //                 }
    //             }
    //         ));
    // },

    // Comprobación y eliminación de las bullets del player1 colisionan con algun objeto O salen de la pantalla
    isCollisionObjectBullets1() {
        return this.player1.bullets.some(
            (bull, idx) => this.obstacles.some(
                obst => {

                    if ((bull.posY + 5 >= obst.posY &&
                        bull.posX + 5 >= obst.posX - 10 &&
                        bull.posY + 5 <= obst.posY + obst.height &&
                        bull.posX + 5 <= obst.posX + 10 + obst.width) || (bull.posX >= (1280))) {
                        this.player1.bullets.splice(idx, 1)
                        return true
                    }
                }
            ));
    },
    // Comprobación y eliminación de las bullets del player 2 colisionan con algun objeto O salen de la pantalla
    isCollisionObjectBullets2() {
        return this.player2.bullets.some(
            (bull, idx) => this.obstacles.some(
                (obst, obsIdx) => {

                    if ((bull.posY + 5 >= obst.posY &&
                        bull.posX + 5 >= obst.posX - 10 &&
                        bull.posY + 5 <= obst.posY + obst.height &&
                        bull.posX + 5 <= obst.posX + 10 + obst.width) || (bull.posX <= (0))) {
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

    sounds() {
        this.sound1 = new Sound(this.sound1Src)
        this.sound2 = new Sound(this.sound2Src)
    },

    clearInterval() {
        clearInterval(this.interval);
    },


}





