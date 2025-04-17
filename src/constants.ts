export const ROOM_WIDTH = 15;
export const ROOM_HEIGHT = 9;
export const TILE_SIZE = 96;
export const HEARTS_POSITION = 64;
export const START_ROOM = [2, 2];

export const canvas = <HTMLCanvasElement>document.getElementById("canvas");
export const context = <CanvasRenderingContext2D>canvas.getContext("2d");

export const PLAYER_IMAGE = new Image();
PLAYER_IMAGE.src = "./src/assets/player.png";
PLAYER_IMAGE.onload = () => {
    PLAYER_IMAGE.width = PLAYER_IMAGE.naturalWidth * 2;
    PLAYER_IMAGE.height = PLAYER_IMAGE.naturalHeight * 2;
};

export const BULLET_IMAGE = new Image();
BULLET_IMAGE.src = "./src/assets/bullet.png";
BULLET_IMAGE.onload = () => {
    BULLET_IMAGE.width = BULLET_IMAGE.naturalWidth * 2;
    BULLET_IMAGE.height = BULLET_IMAGE.naturalHeight * 2;
};

export const ENEMY_IMAGE = new Image();
ENEMY_IMAGE.src = "./src/assets/monster-lizard.png";
ENEMY_IMAGE.onload = () => {
    ENEMY_IMAGE.width = ENEMY_IMAGE.naturalWidth * 2;
    ENEMY_IMAGE.height = ENEMY_IMAGE.naturalHeight * 2;
};
export const HEART_IMAGE = new Image();
HEART_IMAGE.src = "./src/assets/heart.png";
HEART_IMAGE.onload = () => {
    HEART_IMAGE.width = HEART_IMAGE.naturalWidth * 2;
    HEART_IMAGE.height = HEART_IMAGE.naturalHeight * 2;
};
