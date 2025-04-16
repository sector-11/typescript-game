import Entity from "./entity";
import { shared } from "./shared";
import type { Room } from "./map";
import { getCurrentTile, getNeigbouringTiles, isNotCollidingWithTile } from "./tiles";

export default class Shot extends Entity {
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
                shared.currentEntities.splice(shared.currentEntities.indexOf(this), 1);
            }
        }
    }
}
