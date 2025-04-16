import { entitiesNotColliding } from "./collision";
import { TILE_SIZE, ROOM_WIDTH, ROOM_HEIGHT, BULLET_IMAGE } from "./constants";
import { Enemy } from "./enemy";
import Entity from "./entity";
import { loadRoom, Room } from "./map";
import { shared } from "./shared";
import Shot from "./shot";
import { getCurrentTile, getNeigbouringTiles, isNotCollidingWithTile } from "./tiles";

export default class Player extends Entity {
    x: number = 0;
    y: number = 0;
    image: HTMLImageElement;
    speed: number;
    previousX: number;
    previousY: number;
    lastShot: number;
    fireDelay: number;

    constructor(x: number, y: number, image: HTMLImageElement, speed: number, fireDelay: number) {
        super();
        this.image = image;
        setTimeout(() => {
            this.x = x * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = y * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
            this.previousX = this.x;
            this.previousY = this.y;
        }, 100);
        this.speed = speed;
        this.previousX = this.x;
        this.previousY = this.y;
        this.lastShot = 0;
        this.fireDelay = fireDelay;
    }

    move() {
        if (shared.keys.w) {
            this.y -= this.speed;
        }
        if (shared.keys.s) {
            this.y += this.speed;
        }
        if (shared.keys.a) {
            this.x -= this.speed;
        }
        if (shared.keys.d) {
            this.x += this.speed;
        }

        switch (this.checkTileCollision(shared.currentRoom)) {
            case -1:
                //do nothing
                break;
            case 9:
                this.goThroughDoor();
                break;
            default:
                this.x = this.previousX;
                this.y = this.previousY;
                break;
        }

        this.handleEntityCollision();
        this.updatePrevPosition();
        this.shoot();
    }

    shoot() {
        let x = this.x + this.image.width / 2;
        let y = this.y + this.image.height / 2;
        if (shared.keys.ArrowUp && this.lastShot <= Date.now() - this.fireDelay) {
            let newShot = new Shot(x, y - this.image.height / 2 - 4, BULLET_IMAGE, 6, [1, 0]);
            shared.currentEntities.push(newShot);
            this.lastShot = Date.now();
        }
        if (shared.keys.ArrowDown && this.lastShot <= Date.now() - this.fireDelay) {
            let newShot = new Shot(x, y + this.image.height / 2 + 4, BULLET_IMAGE, 6, [-1, 0]);
            shared.currentEntities.push(newShot);
            this.lastShot = Date.now();
        }
        if (shared.keys.ArrowLeft && this.lastShot <= Date.now() - this.fireDelay) {
            let newShot = new Shot(x - this.image.width / 2 - 4, y, BULLET_IMAGE, 6, [0, 1]);
            shared.currentEntities.push(newShot);
            this.lastShot = Date.now();
        }
        if (shared.keys.ArrowRight && this.lastShot <= Date.now() - this.fireDelay) {
            let newShot = new Shot(x + this.image.width / 2 + 4, y, BULLET_IMAGE, 6, [0, -1]);
            shared.currentEntities.push(newShot);
            this.lastShot = Date.now();
        }
    }

    updatePrevPosition() {
        this.previousX = this.x;
        this.previousY = this.y;
    }

    checkTileCollision(room: Room): number {
        for (const tile of getNeigbouringTiles(getCurrentTile(this))) {
            if (!isNotCollidingWithTile(this, tile) && room.terrain[tile[0]][tile[1]] != 1) {
                return room.terrain[tile[0]][tile[1]];
            }
        }
        return -1;
    }

    handleEntityCollision(): void {
        for (const entity of shared.currentEntities) {
            if (!entitiesNotColliding(this, entity)) {
                if (entity instanceof Enemy) {
                    this.previousX = this.x;
                    this.previousY = this.y;
                }
            }
        }
    }

    goThroughDoor() {
        const currentTile = getCurrentTile(this);
        if (currentTile[0] == 1) {
            //top
            loadRoom([shared.currentRoomIndex[0] - 1, shared.currentRoomIndex[1]]);
            this.x = Math.floor(ROOM_WIDTH / 2) * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = (ROOM_HEIGHT - 2) * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        } else if (currentTile[0] == ROOM_HEIGHT - 2) {
            //bottom
            loadRoom([shared.currentRoomIndex[0] + 1, shared.currentRoomIndex[1]]);
            this.x = Math.floor(ROOM_WIDTH / 2) * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = 1 * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        } else if (currentTile[1] == 1) {
            //left
            loadRoom([shared.currentRoomIndex[0], shared.currentRoomIndex[1] - 1]);
            this.x = (ROOM_WIDTH - 2) * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = Math.floor(ROOM_HEIGHT / 2) * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        } else if (currentTile[1] == ROOM_WIDTH - 2) {
            //right
            loadRoom([shared.currentRoomIndex[0], shared.currentRoomIndex[1] + 1]);
            this.x = 1 * TILE_SIZE + (TILE_SIZE - this.image.width) / 2;
            this.y = Math.floor(ROOM_HEIGHT / 2) * TILE_SIZE + (TILE_SIZE - this.image.height) / 2;
        }
    }
}
