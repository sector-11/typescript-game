export const ROOM_WIDTH = 15;
export const ROOM_HEIGHT = 9;
export const TILE_SIZE = 96;
export const HEARTS_POSITION = 64;
export const START_ROOM = [2, 2];

export const canvas = <HTMLCanvasElement>document.getElementById("canvas");
export const context = <CanvasRenderingContext2D>canvas.getContext("2d");

export const PLAYER_IMAGE = new Image();
PLAYER_IMAGE.src = "./assets/player.png";
PLAYER_IMAGE.onload = () => {
    PLAYER_IMAGE.width = PLAYER_IMAGE.naturalWidth * 2;
    PLAYER_IMAGE.height = PLAYER_IMAGE.naturalHeight * 2;
};

export const BULLET_IMAGE = new Image();
BULLET_IMAGE.src = "./assets/bullet.png";
BULLET_IMAGE.onload = () => {
    BULLET_IMAGE.width = BULLET_IMAGE.naturalWidth * 2;
    BULLET_IMAGE.height = BULLET_IMAGE.naturalHeight * 2;
};

export const ENEMY_IMAGE = new Image();
ENEMY_IMAGE.src = "./assets/monster-lizard.png";
ENEMY_IMAGE.onload = () => {
    ENEMY_IMAGE.width = ENEMY_IMAGE.naturalWidth * 2;
    ENEMY_IMAGE.height = ENEMY_IMAGE.naturalHeight * 2;
};
export const HEART_IMAGE = new Image();
HEART_IMAGE.src = "./assets/heart.png";
HEART_IMAGE.onload = () => {
    HEART_IMAGE.width = HEART_IMAGE.naturalWidth * 2;
    HEART_IMAGE.height = HEART_IMAGE.naturalHeight * 2;
};

export const WALL_IMAGE = new Image();
WALL_IMAGE.src = "./assets/wall.png";
WALL_IMAGE.onload = () => {
    WALL_IMAGE.width = TILE_SIZE;
    WALL_IMAGE.height = TILE_SIZE;
};

export const WALL_HORIZ_IMAGE = new Image();
WALL_HORIZ_IMAGE.src = "./assets/wall-horiz.png";
WALL_HORIZ_IMAGE.onload = () => {
    WALL_HORIZ_IMAGE.width = TILE_SIZE;
    WALL_HORIZ_IMAGE.height = TILE_SIZE;
};

export const FLOOR_IMAGE = new Image();
FLOOR_IMAGE.src = "./assets/floor.png";
FLOOR_IMAGE.onload = () => {
    FLOOR_IMAGE.width = TILE_SIZE;
    FLOOR_IMAGE.height = TILE_SIZE;
};

export const DOOR_IMAGE = new Image();
DOOR_IMAGE.src = "./assets/door-open.png";
DOOR_IMAGE.onload = () => {
    DOOR_IMAGE.width = TILE_SIZE;
    DOOR_IMAGE.height = TILE_SIZE;
};

export const DOOR_CLOSED_IMAGE = new Image();
DOOR_CLOSED_IMAGE.src = "./assets/door-closed.png";
DOOR_CLOSED_IMAGE.onload = () => {
    DOOR_CLOSED_IMAGE.width = TILE_SIZE;
    DOOR_CLOSED_IMAGE.height = TILE_SIZE;
};

export const BG_IMAGE = new Image();
BG_IMAGE.src = "./assets/bg.png";
console.log(BG_IMAGE.src);
BG_IMAGE.onload = () => {
    BG_IMAGE.width = TILE_SIZE;
    BG_IMAGE.height = TILE_SIZE;
};

export const BG_BOTTOM_IMAGE = new Image();
BG_BOTTOM_IMAGE.src = "./assets/bg-bottom.png";
BG_BOTTOM_IMAGE.onload = () => {
    BG_BOTTOM_IMAGE.width = TILE_SIZE;
    BG_BOTTOM_IMAGE.height = TILE_SIZE;
};
