import Entity from "./entity";
import { getCurrentTile, getNeigbouringTiles, isNotCollidingWithTile } from "./tiles";
import Pathfinder from "./pathfinder";
import { shared } from "./shared";
import { TILE_SIZE } from "./constants";
import type { Room } from "./map";
import { entitiesNotColliding } from "./collision";
import Player from "./player";

export class Enemy extends Entity {
    x: number = 0;
    y: number = 0;
    image: HTMLImageElement;
    speed: number;
    previousX: number;
    previousY: number;
    direction: number[] = [0, 0];
    lastDirection: number = 0;
    moveDelay: number = 50;
    health: number = 3;
    isAlreadyDying: boolean = false;

    constructor(x: number, y: number, image: HTMLImageElement, speed: number) {
        super();
        this.image = image;
        this.x = x * TILE_SIZE + (TILE_SIZE - this.image.naturalWidth * 2) / 2;
        this.y = y * TILE_SIZE + (TILE_SIZE - this.image.naturalHeight * 2) / 2;
        this.speed = speed;
        this.previousX = this.x;
        this.previousY = this.y;
    }

    move() {
        if (this.lastDirection <= Date.now() - this.moveDelay) {
            let myTile = getCurrentTile(this);
            let playerTile = getCurrentTile(shared.player);
            if (myTile[0] != playerTile[0] || myTile[1] != playerTile[1]) {
                this.direction = Pathfinder.getBestDirection(
                    getCurrentTile(this),
                    getCurrentTile(shared.player),
                    shared.currentRoom
                );
            }

            this.lastDirection = Date.now();
        }

        this.y += this.direction[0] * this.speed;
        switch (this.checkTileCollision(shared.currentRoom)) {
            case -1:
                //do nothing
                break;
            default:
                this.y = this.previousY;
                break;
        }

        this.x += this.direction[1] * this.speed;
        switch (this.checkTileCollision(shared.currentRoom)) {
            case -1:
                //do nothing
                break;
            default:
                this.x = this.previousX;
                break;
        }
        this.handleEntityCollision();

        this.updatePrevPosition();
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
                if (
                    (entity instanceof Enemy &&
                        shared.currentEntities.indexOf(this) !=
                            shared.currentEntities.indexOf(entity)) ||
                    entity instanceof Player
                ) {
                    this.x = this.previousX;
                    this.y = this.previousY;
                }
            }
        }
    }

    die() {
        if (!this.isAlreadyDying) {
            this.isAlreadyDying = true;
            shared.roomEnemies--;
            shared.floorEnemies--;
            shared.currentEntities.splice(shared.currentEntities.indexOf(this), 1);
        }
    }

    getHit(): void {
        this.health--;
        shared.player.score += 50;
        if (this.health <= 0) {
            shared.player.score += 150;
            this.die();
        }
    }
}
