import "./style.scss";

const ROOM_WIDTH = 15;
const ROOM_HEIGHT = 9;
const TILE_SIZE = 100;

type Room = {
    terrain: number[][];
    startEntities: number[][];
};

const roomMaps: Room = {
    terrain: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    startEntities: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
};

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const context = <CanvasRenderingContext2D>canvas.getContext("2d");
canvas.width = TILE_SIZE * ROOM_WIDTH;
canvas.height = TILE_SIZE * ROOM_HEIGHT;
context.imageSmoothingEnabled = false;

const keys: { [Key: string]: boolean } = {
    w: false,
    a: false,
    s: false,
    d: false,
};

const update = () => {
    drawTerrain(roomMaps);
    player.draw();
    player.move();
    window.requestAnimationFrame(update);
};

window.onload = () => {
    window.requestAnimationFrame(update);
};

window.addEventListener("keydown", (ev) => {
    keys[ev.key] = true;
});

window.addEventListener("keyup", (ev) => {
    keys[ev.key] = false;
});

const drawTerrain = (room: Room) => {
    for (let row = 0; row < ROOM_HEIGHT; row++) {
        for (let column = 0; column < ROOM_WIDTH; column++) {
            switch (room.terrain[row][column]) {
                case 0:
                    context.fillStyle = "black";
                    break;
                case 1:
                    context.fillStyle = "lightgray";
                    break;
                default:
                    context.fillStyle = "red";
                    break;
            }
            context.fillRect(TILE_SIZE * column, TILE_SIZE * row, TILE_SIZE, TILE_SIZE);
        }
    }
};

class Player {
    x: number = 0;
    y: number = 0;
    image: HTMLImageElement;
    speed: number;

    constructor(x: number, y: number, src: string, speed: number) {
        this.image = new Image();
        this.image.src = src;
        this.image.onload = () => {
            this.image.width = this.image.naturalWidth * 2;
            this.image.height = this.image.naturalHeight * 2;
            this.x = x * TILE_SIZE + (TILE_SIZE - this.image.naturalWidth * 2) / 2;
            this.y = y * TILE_SIZE + (TILE_SIZE - this.image.naturalHeight * 2) / 2;
        };
        this.speed = speed;
    }

    draw() {
        context.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
    }

    move() {
        if (keys.w) {
            this.y -= this.speed;
        }
        if (keys.s) {
            this.y += this.speed;
        }
        if (keys.a) {
            this.x -= this.speed;
        }
        if (keys.d) {
            this.x += this.speed;
        }
    }
}

const player = new Player(1, 1, "./src/assets/player.png", 4);
