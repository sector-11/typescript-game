import { ENEMY_IMAGE, ROOM_HEIGHT, ROOM_WIDTH } from "./constants";
import { Enemy } from "./enemy";
import { generationHandler } from "./maplayout";
import { layoutToMap } from "./roomplacement";
import { shared } from "./shared";

const mapLayout = generationHandler();
export const map: Room[][] = layoutToMap(mapLayout);

export type Room = {
    terrain: number[][];
    startEntities: number[][];
};

export const loadRoom = (roomIndex: number[]) => {
    shared.currentRoom = <Room>map[roomIndex[0]][roomIndex[1]];
    shared.currentRoomIndex = roomIndex;
    shared.currentEntities.length = 0;
    shared.currentEntities.push(shared.player);
    loadEntities(shared.currentRoom);
};

const loadEntities = (room: Room) => {
    for (let row = 0; row < ROOM_HEIGHT; row++) {
        for (let column = 0; column < ROOM_WIDTH; column++) {
            if (room.startEntities[row][column] === 1) {
                shared.currentEntities.push(new Enemy(column, row, ENEMY_IMAGE, 3));
            }
        }
    }
};
