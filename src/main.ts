import "./style.scss";

const ROOM_WIDTH = 15;
const ROOM_HEIGHT = 9;
const TILE_SIZE = 100;

const map: Array<Room | number>[] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
];

type Room = {
    terrain: number[][];
    startEntities: number[][];
};

map[2][2] = {
    terrain: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0],
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
} as Room;

map[3][2] = {
    terrain: [
        [0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    startEntities: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
} as Room;

let currentRoom: Room = map[2][2];
let currentRoomIndex: number[] = [2, 2];

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
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

const currentEntities: Entity[] = [];

const update = () => {
    drawTerrain(currentRoom);
    for (const entity of currentEntities) {
        entity.move();
        entity.draw();
    }
    window.requestAnimationFrame(update);
};

window.onload = () => {
    initializeButtons();
    window.requestAnimationFrame(update);
};

window.addEventListener("keydown", (ev) => {
    keys[ev.key] = true;
});

window.addEventListener("keyup", (ev) => {
    keys[ev.key] = false;
});

const initializeButtons = () => {
    const leftPadUp = <HTMLButtonElement>document.getElementById("left-pad-up");
    leftPadUp.addEventListener("touchstart", (ev) => {
        keys["w"] = true;
    });
    leftPadUp.addEventListener("touchend", (ev) => {
        keys["w"] = false;
    });

    const leftPadDown = <HTMLButtonElement>document.getElementById("left-pad-down");
    leftPadDown.addEventListener("touchstart", (ev) => {
        keys["s"] = true;
    });
    leftPadDown.addEventListener("touchend", (ev) => {
        keys["s"] = false;
    });

    const leftPadLeft = <HTMLButtonElement>document.getElementById("left-pad-left");
    leftPadLeft.addEventListener("touchstart", (ev) => {
        keys["a"] = true;
    });
    leftPadLeft.addEventListener("touchend", (ev) => {
        keys["a"] = false;
    });

    const leftPadRight = <HTMLButtonElement>document.getElementById("left-pad-right");
    leftPadRight.addEventListener("touchstart", (ev) => {
        keys["d"] = true;
    });
    leftPadRight.addEventListener("touchend", (ev) => {
        keys["d"] = false;
    });

    const rightPadUp = <HTMLButtonElement>document.getElementById("right-pad-up");
    rightPadUp.addEventListener("touchstart", (ev) => {
        keys["ArrowUp"] = true;
    });
    rightPadUp.addEventListener("touchend", (ev) => {
        keys["ArrowUp"] = false;
    });

    const rightPadDown = <HTMLButtonElement>document.getElementById("right-pad-down");
    rightPadDown.addEventListener("touchstart", (ev) => {
        keys["ArrowDown"] = true;
    });
    rightPadDown.addEventListener("touchend", (ev) => {
        keys["ArrowDown"] = false;
    });

    const rightPadLeft = <HTMLButtonElement>document.getElementById("right-pad-left");
    rightPadLeft.addEventListener("touchstart", (ev) => {
        keys["ArrowLeft"] = true;
    });
    rightPadLeft.addEventListener("touchend", (ev) => {
        keys["ArrowLeft"] = false;
    });

    const rightPadRight = <HTMLButtonElement>document.getElementById("right-pad-right");
    rightPadRight.addEventListener("touchstart", (ev) => {
        keys["ArrowRight"] = true;
    });
    rightPadRight.addEventListener("touchend", (ev) => {
        keys["ArrowRight"] = false;
    });
};

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
                case 9:
                    context.fillStyle = "brown";
                    break;
                default:
                    context.fillStyle = "red";
                    break;
            }
            context.fillRect(TILE_SIZE * column, TILE_SIZE * row, TILE_SIZE, TILE_SIZE);
        }
    }
};

abstract class Entity {
    abstract x: number;
    abstract y: number;
    abstract image: HTMLImageElement;

    abstract move(): void;
    abstract checkTileCollision(room: Room): void | number;

    draw() {
        context.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
    }
}

class Player extends Entity {
    x: number = 0;
    y: number = 0;
    image: HTMLImageElement;
    speed: number;
    previousX: number;
    previousY: number;

    constructor(x: number, y: number, src: string, speed: number) {
        super();
        this.image = new Image();
        this.image.src = src;
        this.image.onload = () => {
            this.image.width = this.image.naturalWidth * 2;
            this.image.height = this.image.naturalHeight * 2;
            this.x = x * TILE_SIZE + (TILE_SIZE - this.image.naturalWidth * 2) / 2;
            this.y = y * TILE_SIZE + (TILE_SIZE - this.image.naturalHeight * 2) / 2;
        };
        this.speed = speed;
        this.previousX = this.x;
        this.previousY = this.y;
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

        switch (this.checkTileCollision(currentRoom)) {
            case -1:
                //do nothing
                break;
            case 9:
                this.goThroughDoor();
                break;
            default:
                this.x = this.previousX;
                this.y = this.previousY;
                break;
        }

        this.updatePrevPosition();
        this.shoot();
    }

    shoot() {
        let x = this.x + this.image.width / 2;
        let y = this.y + this.image.height / 2;
        if (keys.ArrowUp) {
            let newShot = new Shot(
                x,
                y - this.image.height / 2 - 4,
                "./src/assets/bullet.png",
                6,
                [1, 0]
            );
            currentEntities.push(newShot);
        }
        if (keys.ArrowDown) {
            let newShot = new Shot(
                x,
                y + this.image.height / 2 + 4,
                "./src/assets/bullet.png",
                6,
                [-1, 0]
            );
            currentEntities.push(newShot);
        }
        if (keys.ArrowLeft) {
            let newShot = new Shot(
                x - this.image.width / 2 - 4,
                y,
                "./src/assets/bullet.png",
                6,
                [0, 1]
            );
            currentEntities.push(newShot);
        }
        if (keys.ArrowRight) {
            let newShot = new Shot(
                x + this.image.width / 2 + 4,
                y,
                "./src/assets/bullet.png",
                6,
                [0, -1]
            );
            currentEntities.push(newShot);
        }
    }

    updatePrevPosition() {
        this.previousX = this.x;
        this.previousY = this.y;
    }

    checkTileCollision(room: Room): number {
        for (const tile of getNeigbouringTiles(getCurrentTile(this))) {
            if (!isNotCollidingWithTile(this, tile) && room.terrain[tile[0]][tile[1]] != 1) {
                return room.terrain[tile[0]][tile[1]];
            }
        }
        return -1;
    }

    goThroughDoor() {
        const currentTile = getCurrentTile(this);
        if (currentTile[0] == 1) {
            //top
            currentRoom = map[currentRoomIndex[0] - 1][currentRoomIndex[1]] as Room;
            currentRoomIndex[0]--;
            this.x = Math.floor(ROOM_WIDTH / 2) * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = (ROOM_HEIGHT - 2) * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        } else if (currentTile[0] == ROOM_HEIGHT - 2) {
            //bottom
            currentRoom = map[currentRoomIndex[0] + 1][currentRoomIndex[1]] as Room;
            currentRoomIndex[0]++;
            this.x = Math.floor(ROOM_WIDTH / 2) * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = 1 * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        } else if (currentTile[1] == 1) {
            //left
            currentRoom = map[currentRoomIndex[0]][currentRoomIndex[1] - 1] as Room;
            currentRoomIndex[1]--;
            this.x = (ROOM_WIDTH - 2) * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = Math.floor(ROOM_HEIGHT / 2) * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        } else if (currentTile[1] == ROOM_WIDTH - 2) {
            //right
            currentRoom = map[currentRoomIndex[0]][currentRoomIndex[1] + 1] as Room;
            currentRoomIndex[1]++;
            this.x = 1 * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = Math.floor(ROOM_HEIGHT / 2) * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        }
    }
}

class Shot extends Entity {
    x: number;
    y: number;
    image: HTMLImageElement;
    speed: number;
    direction: number[];

    constructor(x: number, y: number, src: string, speed: number, direction: number[]) {
        super();
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.image.onload = () => {
            this.image.width = this.image.naturalWidth * 2;
            this.image.height = this.image.naturalHeight * 2;
        };
        this.speed = speed;
        this.direction = direction;
    }

    move(): void {
        this.x -= this.direction[1] * this.speed;
        this.y -= this.direction[0] * this.speed;
    }

    checkTileCollision(room: Room): void {
        for (const tile of getNeigbouringTiles(getCurrentTile(this))) {
            if (!isNotCollidingWithTile(this, tile) && room.terrain[tile[0]][tile[1]] != 1) {
                // delete this object
            }
        }
    }
}

const player = new Player(1, 1, "./src/assets/player.png", 4);
currentEntities.push(player);

const getCurrentTile = (entity: Entity) => {
    let column = Math.floor((entity.x + (TILE_SIZE - entity.image.width) / 2) / TILE_SIZE);
    let row = Math.floor((entity.y + (TILE_SIZE - entity.image.width) / 2) / TILE_SIZE);
    return [row, column];
};

const getNeigbouringTiles = (currentTile: number[]) => {
    return [
        [currentTile[0] - 1, currentTile[1] - 1],
        [currentTile[0] - 1, currentTile[1]],
        [currentTile[0] - 1, currentTile[1] + 1],
        [currentTile[0], currentTile[1] - 1],
        currentTile,
        [currentTile[0], currentTile[1] + 1],
        [currentTile[0] + 1, currentTile[1] - 1],
        [currentTile[0] + 1, currentTile[1]],
        [currentTile[0] + 1, currentTile[1] + 1],
    ];
};

const isNotCollidingWithTile = (entity: Entity, tile: number[]) => {
    const x = TILE_SIZE * tile[1];
    const y = TILE_SIZE * tile[0];
    return (
        entity.x > x + TILE_SIZE ||
        entity.x + entity.image.width < x ||
        entity.y > y + TILE_SIZE ||
        entity.y + entity.image.height < y
    );
};
