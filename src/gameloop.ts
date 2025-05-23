import {
    context,
    DOOR_CLOSED_IMAGE,
    DOOR_IMAGE,
    FLOOR_IMAGE,
    HEART_IMAGE,
    HEARTS_POSITION,
    PLAYER_IMAGE,
    ROOM_HEIGHT,
    ROOM_WIDTH,
    START_ROOM,
    TILE_SIZE,
    WALL_HORIZ_IMAGE,
    WALL_IMAGE,
} from "./constants";
import { gameOverScreen, winScreen } from "./drawscreens";
import { getNewMap, loadRoom, Room } from "./map";
import Player from "./player";
import { shared } from "./shared";

export const newGame = () => {
    if (shared.isGameOver) {
        shared.map = getNewMap();
    }
    shared.player = new Player(7, 4, PLAYER_IMAGE, 4, 500);
    loadRoom(START_ROOM);
    shared.isGameOver = false;
    window.requestAnimationFrame(update);
};

export const update = () => {
    if (shared.isGameOver) {
        gameOverScreen();
    } else if (shared.floorEnemies < 1) {
        winScreen();
    } else {
        drawTerrain(shared.currentRoom);
        for (const entity of shared.currentEntities) {
            entity.move();
            entity.draw();
        }
        drawGameUI();
        window.requestAnimationFrame(update);
    }
};

const drawTerrain = (room: Room) => {
    for (let row = 0; row < ROOM_HEIGHT; row++) {
        for (let column = 0; column < ROOM_WIDTH; column++) {
            switch (room.terrain[row][column]) {
                case 0:
                    if (
                        row < ROOM_HEIGHT - 1 &&
                        (room.terrain[row + 1][column] == 0 || room.terrain[row + 1][column] == 9)
                    ) {
                        context.drawImage(
                            WALL_IMAGE,
                            TILE_SIZE * column,
                            TILE_SIZE * row,
                            WALL_IMAGE.width,
                            WALL_IMAGE.height
                        );
                    } else {
                        context.drawImage(
                            WALL_HORIZ_IMAGE,
                            TILE_SIZE * column,
                            TILE_SIZE * row,
                            WALL_HORIZ_IMAGE.width,
                            WALL_HORIZ_IMAGE.height
                        );
                    }
                    break;
                case 1:
                    context.drawImage(
                        FLOOR_IMAGE,
                        TILE_SIZE * column,
                        TILE_SIZE * row,
                        FLOOR_IMAGE.width,
                        FLOOR_IMAGE.height
                    );
                    break;
                case 9:
                    context.drawImage(
                        WALL_IMAGE,
                        TILE_SIZE * column,
                        TILE_SIZE * row,
                        WALL_IMAGE.width,
                        WALL_IMAGE.height
                    );
                    context.drawImage(
                        shared.roomEnemies > 0 ? DOOR_CLOSED_IMAGE : DOOR_IMAGE,
                        TILE_SIZE * column,
                        TILE_SIZE * row,
                        DOOR_IMAGE.width,
                        DOOR_IMAGE.height
                    );
                    break;
                default:
                    context.fillStyle = "red";
                    context.fillRect(TILE_SIZE * column, TILE_SIZE * row, TILE_SIZE, TILE_SIZE);
                    break;
            }
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

    context.font = "bold 30pt sans-serif";
    context.fillStyle = "#ffffff";
    context.strokeStyle = "#000000";
    context.lineWidth = 2;
    context.fillText(`SCORE: ${shared.player.score}`, TILE_SIZE * 11 + 10, HEARTS_POSITION * 1.4);
    context.strokeText(`SCORE: ${shared.player.score}`, TILE_SIZE * 11 + 10, HEARTS_POSITION * 1.4);
};
