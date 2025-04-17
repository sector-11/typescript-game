import { ROOM_HEIGHT, ROOM_WIDTH } from "./constants";
import type { Room } from "./map";
import { getNeigbouringTiles } from "./tiles";

export default class Pathfinder {
    static getBestDirection = (current: number[], target: number[], room: Room) => {
        let neighbours = getNeigbouringTiles(current);
        neighbours = neighbours.filter((tile) => {
            return room.terrain[tile[0]][tile[1]] === 1;
        });
        let score = neighbours.map((tile) => {
            return this.distanceWithPenalty(tile, target, room);
        });

        let lowest = Number.MAX_VALUE;
        let index = -1;

        for (let i = 0; i < score.length; i++) {
            if (score[i] < lowest) {
                lowest = score[i];
                index = i;
            }
        }

        let tileToMoveTo = neighbours[index];

        return [tileToMoveTo[0] - current[0], tileToMoveTo[1] - current[1]];
    };

    private static distanceWithPenalty = (first: number[], second: number[], room: Room) => {
        let manhattanDist = Math.abs(first[0] - second[0]) + Math.abs(first[1] - second[1]);
        let penalty = this.getPathCollisionsCount(first, second, room);
        return manhattanDist + penalty * 1000;
    };

    private static getPathCollisionsCount = (start: number[], end: number[], room: Room) => {
        let obstacles: number[][] = [];

        for (let row = 0; row < ROOM_HEIGHT; row++) {
            for (let column = 0; column < ROOM_WIDTH; column++) {
                if (room.terrain[row][column] !== 1) {
                    obstacles.push([row, column]);
                }
            }
        }

        let count = 0;
        let path = this.getPathPoints(start[1], start[0], end[1], end[0]);
        obstacles.forEach((obstacle) => {
            path.forEach((point) => {
                if (point[0] == obstacle[0] && point[1] == obstacle[1]) {
                    count++;
                }
            });
        });

        return count;
    };

    private static getPathPoints = (x1: number, y1: number, x2: number, y2: number) => {
        let path = [];

        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);

        let ix = x1 < x2 ? 1 : -1;
        let iy = y1 < y2 ? 1 : -1;
        let err = dx - dy;

        path.push([y1, x1]);

        while (!(x1 == x2 && y1 == y2)) {
            let err2 = err << 1;
            if (err2 > -dy) {
                err -= dy;
                x1 += ix;
            }
            if (err2 < dx) {
                err += dx;
                y1 += iy;
            }
            path.push([y1, x1]);
        }

        return path;
    };
}
