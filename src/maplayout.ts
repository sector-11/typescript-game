export const MAP_WIDTH = 5;
export const MAP_HEIGHT = 5;
const NUM_ROOMS = 8;
const START_ROOM: number[] = [Math.floor(MAP_WIDTH / 2), Math.floor(MAP_HEIGHT / 2)];

let roomFailCounter = 0;
let mapFailCounter = 0;

export const generateBoundedRandomInt = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

const generateNeighbour = (room: number[]): number[] => {
    let nextRoom = [...room];
    switch (generateBoundedRandomInt(1, 4)) {
        case 1:
            nextRoom[0]--;
            break;
        case 2:
            nextRoom[0]++;
            break;
        case 3:
            nextRoom[1]--;
            break;
        case 4:
            nextRoom[1]++;
            break;
    }
    if (!roomTest(nextRoom)) {
        roomFailCounter++;
        if (roomFailCounter > 5) {
            throw new Error("Too Many Fails!");
        }
        nextRoom = generateNeighbour(room);
    }
    return nextRoom;
};

export const roomTest = (room: number[]) => {
    return room[0] >= 0 && room[0] <= 4 && room[1] >= 0 && room[1] <= 4;
};

const generateMap = () => {
    let map = generateEmptyMap();
    let currentRooms = 1;
    const generationQueue: number[][] = [];
    generationQueue.push(START_ROOM);

    for (let i = 0; generationQueue.length > 0; i++) {
        let currentRoom: number[] = generationQueue.pop()!;
        let nextRoom = generateNeighbour(currentRoom);
        if (map[nextRoom[0]][nextRoom[1]] == 0) {
            map[nextRoom[0]][nextRoom[1]] = 1;
            currentRooms++;
            if (currentRooms < NUM_ROOMS) {
                generationQueue.push(Math.random() < 0.6 ? nextRoom : currentRoom);
            }
        } else {
            generationQueue.push(currentRoom);
        }

        if (generationQueue.length === 0 && currentRooms < NUM_ROOMS) {
            generationQueue.push(START_ROOM);
        }
    }

    return map;
};

const generateEmptyMap = (): number[][] => {
    let row = new Array(MAP_WIDTH).fill(0);
    let map = new Array(MAP_HEIGHT);
    for (let i = 0; i < map.length; i++) {
        map[i] = [...row];
    }
    map[START_ROOM[0]][START_ROOM[1]] = 1;
    return map;
};

export const generationHandler = () => {
    let map: number[][];
    mapFailCounter = 0;
    try {
        roomFailCounter = 0;
        map = generateMap();
    } catch (error) {
        mapFailCounter++;
        if (mapFailCounter > 2) {
            map = fallback();
        } else {
            map = generationHandler();
        }
    }
    return map;
};

const fallback = (): number[][] => {
    switch (generateBoundedRandomInt(1, 4)) {
        case 1:
            return [
                [0, 0, 0, 1, 0],
                [0, 0, 0, 1, 0],
                [1, 1, 1, 1, 1],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0],
            ];

        case 2:
            return [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [1, 1, 1, 0, 0],
                [0, 1, 1, 1, 0],
            ];
        case 3:
            return [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 1, 1, 0],
                [0, 0, 1, 1, 0],
            ];
        case 4:
        default:
            return [
                [0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0],
                [1, 1, 1, 0, 0],
                [0, 1, 0, 0, 0],
                [0, 1, 1, 1, 0],
            ];
    }
};
