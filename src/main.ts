import "./style.scss";
import { ROOM_WIDTH, ROOM_HEIGHT, TILE_SIZE, canvas, context } from "./constants";
import { map, Room } from "./map";
import { shared } from "./shared";

shared.currentRoom = <Room>map[2][2];
shared.currentRoomIndex = [2, 2];

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
    drawTerrain(shared.currentRoom);
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

const PLAYER_IMAGE = new Image();
PLAYER_IMAGE.src = "./src/assets/player.png";
PLAYER_IMAGE.onload = () => {
    PLAYER_IMAGE.width = PLAYER_IMAGE.naturalWidth * 2;
    PLAYER_IMAGE.height = PLAYER_IMAGE.naturalHeight * 2;
};

const BULLET_IMAGE = new Image();
BULLET_IMAGE.src = "./src/assets/bullet.png";
BULLET_IMAGE.onload = () => {
    BULLET_IMAGE.width = BULLET_IMAGE.naturalWidth * 2;
    BULLET_IMAGE.height = BULLET_IMAGE.naturalHeight * 2;
};

const ENEMY_IMAGE = new Image();
ENEMY_IMAGE.src = "./src/assets/monster-lizard.png";
ENEMY_IMAGE.onload = () => {
    ENEMY_IMAGE.width = ENEMY_IMAGE.naturalWidth * 2;
    ENEMY_IMAGE.height = ENEMY_IMAGE.naturalHeight * 2;
};

class Player extends Entity {
    x: number = 0;
    y: number = 0;
    image: HTMLImageElement;
    speed: number;
    previousX: number;
    previousY: number;
    lastShot: number;
    fireDelay: number;

    constructor(x: number, y: number, image: HTMLImageElement, speed: number, fireDelay: number) {
        super();
        this.image = image;
        this.x = x * TILE_SIZE + (TILE_SIZE - this.image.naturalWidth * 2) / 2;
        this.y = y * TILE_SIZE + (TILE_SIZE - this.image.naturalHeight * 2) / 2;
        this.speed = speed;
        this.previousX = this.x;
        this.previousY = this.y;
        this.lastShot = 0;
        this.fireDelay = fireDelay;
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

        switch (this.checkTileCollision(shared.currentRoom)) {
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
        if (keys.ArrowUp && this.lastShot <= Date.now() - this.fireDelay) {
            let newShot = new Shot(x, y - this.image.height / 2 - 4, BULLET_IMAGE, 6, [1, 0]);
            currentEntities.push(newShot);
            this.lastShot = Date.now();
        }
        if (keys.ArrowDown && this.lastShot <= Date.now() - this.fireDelay) {
            let newShot = new Shot(x, y + this.image.height / 2 + 4, BULLET_IMAGE, 6, [-1, 0]);
            currentEntities.push(newShot);
            this.lastShot = Date.now();
        }
        if (keys.ArrowLeft && this.lastShot <= Date.now() - this.fireDelay) {
            let newShot = new Shot(x - this.image.width / 2 - 4, y, BULLET_IMAGE, 6, [0, 1]);
            currentEntities.push(newShot);
            this.lastShot = Date.now();
        }
        if (keys.ArrowRight && this.lastShot <= Date.now() - this.fireDelay) {
            let newShot = new Shot(x + this.image.width / 2 + 4, y, BULLET_IMAGE, 6, [0, -1]);
            currentEntities.push(newShot);
            this.lastShot = Date.now();
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
            shared.currentRoom = map[shared.currentRoomIndex[0] - 1][
                shared.currentRoomIndex[1]
            ] as Room;
            shared.currentRoomIndex[0]--;
            this.x = Math.floor(ROOM_WIDTH / 2) * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = (ROOM_HEIGHT - 2) * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        } else if (currentTile[0] == ROOM_HEIGHT - 2) {
            //bottom
            shared.currentRoom = map[shared.currentRoomIndex[0] + 1][
                shared.currentRoomIndex[1]
            ] as Room;
            shared.currentRoomIndex[0]++;
            this.x = Math.floor(ROOM_WIDTH / 2) * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = 1 * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        } else if (currentTile[1] == 1) {
            //left
            shared.currentRoom = map[shared.currentRoomIndex[0]][
                shared.currentRoomIndex[1] - 1
            ] as Room;
            shared.currentRoomIndex[1]--;
            this.x = (ROOM_WIDTH - 2) * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = Math.floor(ROOM_HEIGHT / 2) * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        } else if (currentTile[1] == ROOM_WIDTH - 2) {
            //right
            shared.currentRoom = map[shared.currentRoomIndex[0]][
                shared.currentRoomIndex[1] + 1
            ] as Room;
            shared.currentRoomIndex[1]++;
            this.x = 1 * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = Math.floor(ROOM_HEIGHT / 2) * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        }
        currentEntities.length = 0;
        currentEntities.push(this);
    }
}

class Shot extends Entity {
    x: number;
    y: number;
    image: HTMLImageElement;
    speed: number;
    direction: number[];

    constructor(x: number, y: number, image: HTMLImageElement, speed: number, direction: number[]) {
        super();
        this.image = image;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
    }

    move(): void {
        this.x -= this.direction[1] * this.speed;
        this.y -= this.direction[0] * this.speed;
        this.checkTileCollision(shared.currentRoom);
    }

    checkTileCollision(room: Room): void {
        for (const tile of getNeigbouringTiles(getCurrentTile(this))) {
            if (!isNotCollidingWithTile(this, tile) && room.terrain[tile[0]][tile[1]] != 1) {
                currentEntities.splice(currentEntities.indexOf(this), 1);
            }
        }
    }
}

class Enemy extends Entity {
    x: number = 0;
    y: number = 0;
    image: HTMLImageElement;
    speed: number;
    previousX: number;
    previousY: number;
    direction: number[] = [0, 0];
    lastDirection: number = 0;
    moveDelay: number = 50;

    constructor(x: number, y: number, image: HTMLImageElement, speed: number) {
        super();
        this.image = image;
        this.x = x * TILE_SIZE + (TILE_SIZE - this.image.naturalWidth * 2) / 2;
        this.y = y * TILE_SIZE + (TILE_SIZE - this.image.naturalHeight * 2) / 2;
        this.speed = speed;
        this.previousX = this.x;
        this.previousY = this.y;
    }

    move() {
        if (this.lastDirection <= Date.now() - this.moveDelay) {
            let myTile = getCurrentTile(this);
            let playerTile = getCurrentTile(player);
            if (myTile[0] != playerTile[0] || myTile[1] != playerTile[1]) {
                this.direction = Pathfinder.getBestDirection(
                    getCurrentTile(this),
                    getCurrentTile(player),
                    shared.currentRoom
                );
            }

            this.lastDirection = Date.now();
        }

        this.y += this.direction[0] * this.speed;
        this.x += this.direction[1] * this.speed;

        switch (this.checkTileCollision(shared.currentRoom)) {
            case -1:
                //do nothing
                break;
            default:
                this.x = this.previousX;
                this.y = this.previousY;
                break;
        }

        this.updatePrevPosition();
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
}

const player = new Player(7, 4, PLAYER_IMAGE, 4, 500);
currentEntities.push(player);

const testEnemy1 = new Enemy(2, 2, ENEMY_IMAGE, 4);
currentEntities.push(testEnemy1);
const testEnemy2 = new Enemy(12, 6, ENEMY_IMAGE, 4);
currentEntities.push(testEnemy2);

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

class Pathfinder {
    static getBestDirection = (current: number[], target: number[], room: Room) => {
        let neighbours = getNeigbouringTiles(current);
        neighbours = neighbours.filter((tile) => {
            return room.terrain[tile[0]][tile[1]] === 1;
        });
        let score = neighbours.map((tile) => {
            return this.distanceWithPenalty(tile, target, room);
        });

        let lowest = Number.MAX_VALUE;
        let index = -1;

        for (let i = 0; i < score.length; i++) {
            if (score[i] < lowest) {
                lowest = score[i];
                index = i;
            }
        }

        let tileToMoveTo = neighbours[index];

        return [tileToMoveTo[0] - current[0], tileToMoveTo[1] - current[1]];
    };

    private static distanceWithPenalty = (first: number[], second: number[], room: Room) => {
        let manhattanDist = Math.abs(first[0] - second[0]) + Math.abs(first[1] - second[1]);
        let penalty = this.getPathCollisionsCount(first, second, room);
        return manhattanDist + penalty * 10;
    };

    private static getPathCollisionsCount = (start: number[], end: number[], room: Room) => {
        let obstacles: number[][] = [];

        for (let row = 0; row < ROOM_HEIGHT; row++) {
            for (let column = 0; column < ROOM_WIDTH; column++) {
                if (room.terrain[row][column] !== 1) {
                    obstacles.push([row, column]);
                }
            }
        }

        let count = 0;
        let path = this.getPathPoints(start[1], start[0], end[1], end[0]);
        obstacles.forEach((obstacle) => {
            path.forEach((point) => {
                if (point[0] == obstacle[0] && point[1] == obstacle[1]) {
                    count++;
                }
            });
        });

        return count;
    };

    private static getPathPoints = (x1: number, y1: number, x2: number, y2: number) => {
        let path = [];

        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);

        let ix = x1 < x2 ? 1 : -1;
        let iy = y1 < y2 ? 1 : -1;
        let err = dx - dy;

        path.push([y1, x1]);

        while (!(x1 == x2 && y1 == y2)) {
            let err2 = err << 1;
            if (err2 > -dy) {
                err -= dy;
                x1 += ix;
            }
            if (err2 < dx) {
                err += dx;
                y1 += iy;
            }
            path.push([y1, x1]);
        }

        return path;
    };
}
