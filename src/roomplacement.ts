import { ROOM_HEIGHT, ROOM_WIDTH } from "./constants";
import { Room } from "./map";
import { generateBoundedRandomInt, MAP_HEIGHT, MAP_WIDTH, roomTest } from "./maplayout";
import { roomLayouts, startRoom } from "./roomlayouts";

export const layoutToMap = (layout: number[][]) => {
    const EMPTY_ROOM = { terrain: [], startEntities: [] };
    const map: Room[][] = [
        [EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM],
        [EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM],
        [EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM],
        [EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM],
        [EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM, EMPTY_ROOM],
    ];
    const rooms = listRooms(layout);
    for (const room of rooms) {
        let roomLayout: Room;
        if (room.room[0] == 2 && room.room[1] == 2) {
            roomLayout = cloneRoom(startRoom);
        } else {
            roomLayout = cloneRoom(roomLayouts[generateBoundedRandomInt(1, 9).toString()]);
        }
        const finalRoom = placeDoors(room, roomLayout);

        map[room.room[0]][room.room[1]] = finalRoom;
    }

    return map;
};

const cloneRoom = (room: Room): Room => {
    let clone: Room = { terrain: [], startEntities: [] };

    room.terrain.forEach((el) => {
        clone.terrain.push([...el]);
    });
    room.startEntities.forEach((el) => {
        clone.startEntities.push([...el]);
    });

    return clone;
};

const placeDoors = (
    room: {
        room: number[];
        neighbours: {
            count: number;
            rooms: {
                room: number[];
                direction: string;
            }[];
        };
    },
    roomLayout: Room
): Room => {
    for (const neighbour of room.neighbours.rooms) {
        if (roomTest(neighbour.room)) {
            let direction = neighbour.direction;
            switch (direction) {
                case "U":
                    roomLayout.terrain[0][Math.floor(ROOM_WIDTH / 2)] = 9;
                    break;
                case "D":
                    roomLayout.terrain[ROOM_HEIGHT - 1][Math.floor(ROOM_WIDTH / 2)] = 9;
                    break;
                case "L":
                    roomLayout.terrain[Math.floor(ROOM_HEIGHT / 2)][0] = 9;
                    break;
                case "R":
                    roomLayout.terrain[Math.floor(ROOM_HEIGHT / 2)][ROOM_WIDTH - 1] = 9;
                    break;
            }
        }
    }
    return roomLayout;
};

const getDirection = (originRoom: number[], checkRoom: number[]) => {
    if (originRoom[0] == checkRoom[0]) {
        return checkRoom[1] < originRoom[1] ? "L" : "R";
    }
    return checkRoom[0] < originRoom[0] ? "U" : "D";
};

const listRooms = (layout: number[][]) => {
    let rooms = [];

    for (let row = 0; row < MAP_HEIGHT; row++) {
        for (let column = 0; column < MAP_WIDTH; column++) {
            if (layout[row][column] == 1) {
                rooms.push({
                    room: [row, column],
                    neighbours: getRoomNeighbours([row, column], layout),
                });
            }
        }
    }

    return rooms;
};

const getRoomNeighbours = (room: number[], layout: number[][]) => {
    let neighbours = getPotentialNeighbours(room);
    let count = 0;
    let rooms = [];
    for (const neighbouringRoom of neighbours) {
        if (layout[neighbouringRoom[0]][neighbouringRoom[1]] == 1) {
            count++;
            rooms.push({ room: neighbouringRoom, direction: getDirection(room, neighbouringRoom) });
        }
    }
    return { count: count, rooms: rooms };
};

const getPotentialNeighbours = (room: number[]): number[][] => {
    let isOnTopRow = room[0] == 0;
    let isOnBottomRow = room[0] == MAP_HEIGHT - 1;
    let isOnLeftEdge = room[1] == 0;
    let isOnRightEdge = room[1] == MAP_WIDTH - 1;

    let neighbours: number[][] = [];

    if (!isOnTopRow) {
        neighbours.push([room[0] - 1, room[1]]);
    }
    if (!isOnBottomRow) {
        neighbours.push([room[0] + 1, room[1]]);
    }
    if (!isOnLeftEdge) {
        neighbours.push([room[0], room[1] - 1]);
    }
    if (!isOnRightEdge) {
        neighbours.push([room[0], room[1] + 1]);
    }

    return neighbours;
};
