import { TILE_SIZE } from "./constants";
import Entity from "./entity";

export const getCurrentTile = (entity: Entity) => {
    let column = Math.floor((entity.x + (TILE_SIZE - entity.image.width) / 2) / TILE_SIZE);
    let row = Math.floor((entity.y + (TILE_SIZE - entity.image.width) / 2) / TILE_SIZE);
    return [row, column];
};

export const getNeigbouringTiles = (currentTile: number[]) => {
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

export const isNotCollidingWithTile = (entity: Entity, tile: number[]) => {
    const x = TILE_SIZE * tile[1];
    const y = TILE_SIZE * tile[0];
    return (
        entity.x > x + TILE_SIZE ||
        entity.x + entity.image.width < x ||
        entity.y > y + TILE_SIZE ||
        entity.y + entity.image.height < y
    );
};
