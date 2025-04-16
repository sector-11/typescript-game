import "./style.scss";
import {
    ROOM_WIDTH,
    ROOM_HEIGHT,
    TILE_SIZE,
    canvas,
    context,
    PLAYER_IMAGE,
    ENEMY_IMAGE,
} from "./constants";
import { map, Room } from "./map";
import { shared } from "./shared";
import Player from "./player";
import { Enemy } from "./enemy";

shared.currentRoom = <Room>map[2][2];
shared.currentRoomIndex = [2, 2];

canvas.width = TILE_SIZE * ROOM_WIDTH;
canvas.height = TILE_SIZE * ROOM_HEIGHT;
context.imageSmoothingEnabled = false;

const update = () => {
    drawTerrain(shared.currentRoom);
    for (const entity of shared.currentEntities) {
        entity.move();
        entity.draw();
    }
    window.requestAnimationFrame(update);
};

window.onload = () => {
    initializeButtons();
    setTimeout(() => window.requestAnimationFrame(update), 1000);
};

window.addEventListener("keydown", (ev) => {
    shared.keys[ev.key] = true;
});

window.addEventListener("keyup", (ev) => {
    shared.keys[ev.key] = false;
});

const initializeButtons = () => {
    const leftPadUp = <HTMLButtonElement>document.getElementById("left-pad-up");
    leftPadUp.addEventListener("touchstart", (ev) => {
        shared.keys["w"] = true;
    });
    leftPadUp.addEventListener("touchend", (ev) => {
        shared.keys["w"] = false;
    });

    const leftPadDown = <HTMLButtonElement>document.getElementById("left-pad-down");
    leftPadDown.addEventListener("touchstart", (ev) => {
        shared.keys["s"] = true;
    });
    leftPadDown.addEventListener("touchend", (ev) => {
        shared.keys["s"] = false;
    });

    const leftPadLeft = <HTMLButtonElement>document.getElementById("left-pad-left");
    leftPadLeft.addEventListener("touchstart", (ev) => {
        shared.keys["a"] = true;
    });
    leftPadLeft.addEventListener("touchend", (ev) => {
        shared.keys["a"] = false;
    });

    const leftPadRight = <HTMLButtonElement>document.getElementById("left-pad-right");
    leftPadRight.addEventListener("touchstart", (ev) => {
        shared.keys["d"] = true;
    });
    leftPadRight.addEventListener("touchend", (ev) => {
        shared.keys["d"] = false;
    });

    const rightPadUp = <HTMLButtonElement>document.getElementById("right-pad-up");
    rightPadUp.addEventListener("touchstart", (ev) => {
        shared.keys["ArrowUp"] = true;
    });
    rightPadUp.addEventListener("touchend", (ev) => {
        shared.keys["ArrowUp"] = false;
    });

    const rightPadDown = <HTMLButtonElement>document.getElementById("right-pad-down");
    rightPadDown.addEventListener("touchstart", (ev) => {
        shared.keys["ArrowDown"] = true;
    });
    rightPadDown.addEventListener("touchend", (ev) => {
        shared.keys["ArrowDown"] = false;
    });

    const rightPadLeft = <HTMLButtonElement>document.getElementById("right-pad-left");
    rightPadLeft.addEventListener("touchstart", (ev) => {
        shared.keys["ArrowLeft"] = true;
    });
    rightPadLeft.addEventListener("touchend", (ev) => {
        shared.keys["ArrowLeft"] = false;
    });

    const rightPadRight = <HTMLButtonElement>document.getElementById("right-pad-right");
    rightPadRight.addEventListener("touchstart", (ev) => {
        shared.keys["ArrowRight"] = true;
    });
    rightPadRight.addEventListener("touchend", (ev) => {
        shared.keys["ArrowRight"] = false;
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

shared.player = new Player(7, 4, PLAYER_IMAGE, 4, 500);
shared.currentEntities.push(shared.player);

const testEnemy1 = new Enemy(2, 2, ENEMY_IMAGE, 4);
shared.currentEntities.push(testEnemy1);
const testEnemy2 = new Enemy(12, 6, ENEMY_IMAGE, 4);
shared.currentEntities.push(testEnemy2);
