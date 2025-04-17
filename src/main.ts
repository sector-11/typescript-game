import "./style.scss";
import {
    ROOM_WIDTH,
    ROOM_HEIGHT,
    TILE_SIZE,
    canvas,
    context,
    PLAYER_IMAGE,
    START_ROOM,
} from "./constants";
import { loadRoom } from "./map";
import { shared } from "./shared";
import Player from "./player";
import { initializeButtons } from "./mobile";
import { update } from "./gameloop";

canvas.width = TILE_SIZE * ROOM_WIDTH;
canvas.height = TILE_SIZE * ROOM_HEIGHT;
context.imageSmoothingEnabled = false;

window.onload = () => {
    initializeButtons();
    loadRoom(START_ROOM);
    setTimeout(() => {
        document.getElementById("preload-styles")?.remove();
        update();
    }, 200);
};

window.addEventListener("keydown", (ev) => {
    shared.keys[ev.key] = true;
});

window.addEventListener("keyup", (ev) => {
    shared.keys[ev.key] = false;
});

shared.player = new Player(7, 4, PLAYER_IMAGE, 4, 500);
shared.currentEntities.push(shared.player);
