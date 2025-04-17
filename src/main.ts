import "./style.scss";
import {
    ROOM_WIDTH,
    ROOM_HEIGHT,
    TILE_SIZE,
    canvas,
    context,
    PLAYER_IMAGE,
    START_ROOM,
    HEART_IMAGE,
    HEARTS_POSITION,
} from "./constants";
import { loadRoom, Room } from "./map";
import { shared } from "./shared";
import Player from "./player";
import { initializeButtons } from "./mobile";

canvas.width = TILE_SIZE * ROOM_WIDTH;
canvas.height = TILE_SIZE * ROOM_HEIGHT;
context.imageSmoothingEnabled = false;

const update = () => {
    drawTerrain(shared.currentRoom);
    for (const entity of shared.currentEntities) {
        entity.move();
        entity.draw();
    }
    drawGameUI();
    window.requestAnimationFrame(update);
};

window.onload = () => {
    initializeButtons();
    loadRoom(START_ROOM);
    setTimeout(() => window.requestAnimationFrame(update), 1000);
};

window.addEventListener("keydown", (ev) => {
    shared.keys[ev.key] = true;
});

window.addEventListener("keyup", (ev) => {
    shared.keys[ev.key] = false;
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

const drawGameUI = () => {
    for (let i = 0; i < shared.player.health; i++) {
        context.drawImage(
            HEART_IMAGE,
            HEARTS_POSITION + HEART_IMAGE.width * 1.25 * i,
            HEARTS_POSITION,
            HEART_IMAGE.width,
            HEART_IMAGE.height
        );
    }
};

shared.player = new Player(7, 4, PLAYER_IMAGE, 4, 500);
shared.currentEntities.push(shared.player);
