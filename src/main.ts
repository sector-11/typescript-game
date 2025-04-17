import "./style.scss";
import { ROOM_WIDTH, ROOM_HEIGHT, TILE_SIZE, canvas, context } from "./constants";
import { shared } from "./shared";
import { initializeButtons } from "./mobile";
import { titleScreen } from "./drawscreens";
import { getNewMap } from "./map";

canvas.width = TILE_SIZE * ROOM_WIDTH;
canvas.height = TILE_SIZE * ROOM_HEIGHT;
context.imageSmoothingEnabled = false;

window.onload = () => {
    initializeButtons();
    document.getElementById("preload-styles")?.remove();
    shared.map = getNewMap();
    titleScreen();
};

window.addEventListener("keydown", (ev) => {
    shared.keys[ev.key] = true;
});

window.addEventListener("keyup", (ev) => {
    shared.keys[ev.key] = false;
});
