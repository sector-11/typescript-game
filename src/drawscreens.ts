import {
    BG_BOTTOM_IMAGE,
    BG_IMAGE,
    context,
    ROOM_HEIGHT,
    ROOM_WIDTH,
    TILE_SIZE,
} from "./constants";
import { update } from "./gameloop";

export const titleScreen = () => {
    drawTextScreenBG();
    context.font = "bold 72pt sans-serif";
    context.fillStyle = "#000000";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.fillText("WIZARD IN A DUNGEON", TILE_SIZE, TILE_SIZE * 3);
    context.strokeText("WIZARD IN A DUNGEON", TILE_SIZE, TILE_SIZE * 3);

    context.font = "bold 30pt sans-serif";
    context.fillText("Controls:", TILE_SIZE * 1.75, TILE_SIZE * 5);
    context.strokeText("Controls:", TILE_SIZE * 1.75, TILE_SIZE * 5);
    context.font = "regular 20pt sans-serif";
    context.fillText(
        "Keyboard - WASD to move, arrow keys to shoot",
        TILE_SIZE * 1.75,
        TILE_SIZE * 5 + 50
    );
    context.strokeText(
        "Keyboard - WASD to move, arrow keys to shoot",
        TILE_SIZE * 1.75,
        TILE_SIZE * 5 + 50
    );
    context.fillText(
        "Touchscreen - left side to move, right side to shoot",
        TILE_SIZE * 1.75,
        TILE_SIZE * 5 + 95
    );
    context.strokeText(
        "Touchscreen - left side to move, right side to shoot",
        TILE_SIZE * 1.75,
        TILE_SIZE * 5 + 95
    );

    context.font = "bold 50pt sans-serif";
    context.fillText("CLICK OR TAP THE SCREN TO START", TILE_SIZE * 0.6, TILE_SIZE * 8);
    context.strokeText("CLICK OR TAP THE SCREN TO START", TILE_SIZE * 0.6, TILE_SIZE * 8);

    let continueAfterClick = () => {
        window.removeEventListener("click", continueAfterClick);
        window.requestAnimationFrame(update);
    };

    window.addEventListener("click", continueAfterClick);
};

const drawTextScreenBG = () => {
    for (let row = 0; row < ROOM_HEIGHT - 1; row++) {
        for (let column = 0; column < ROOM_WIDTH; column++) {
            context.drawImage(
                BG_IMAGE,
                TILE_SIZE * column,
                TILE_SIZE * row,
                BG_IMAGE.width,
                BG_IMAGE.height
            );
        }
    }
    for (let column = 0; column < ROOM_WIDTH; column++) {
        context.drawImage(
            BG_BOTTOM_IMAGE,
            TILE_SIZE * column,
            TILE_SIZE * (ROOM_HEIGHT - 1),
            BG_BOTTOM_IMAGE.width,
            BG_BOTTOM_IMAGE.height
        );
    }
};
