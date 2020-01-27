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
            this.drawAll();
            this.moveAll()

        }, 1000 / this.fps)
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player1 = new Player(this.ctx, this.canvas.width, this.canvas.height, { UP: { code: 87, down: false }, DOWN: { code: 83, down: false }, SHOT: { code: 37, down: false } }, "./img/player1war.png", 40, 500);
        this.player2 = new Player(this.ctx, this.canvas.width, this.canvas.height, { UP: { code: 38, down: false }, DOWN: { code: 40, down: false }, SHOT: { code: 68, down: false } }, "./img/player2war.png", 1140, 500);

    },

    drawAll() {
        this.background.draw();
        this.player1.draw(this.framesCounter);
        this.player2.draw(this.framesCounter);
    },

    moveAll() {
        this.player1.move()
        this.player2.move()
        // this.player1.moveHeroDown()
        // this.player2.moveHeroDown()



    },

    clear() { },




}
