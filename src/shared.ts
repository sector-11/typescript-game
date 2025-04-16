import { map, Room } from "./map";

class Shared {
    private static instance: Shared;

    currentRoom: Room = <Room>map[2][2];
    currentRoomIndex: number[] = [2, 2];

    private constructor() {}

    static getInstance(): Shared {
        if (!Shared.instance) {
            Shared.instance = new Shared();
        }
        return Shared.instance;
    }
}

export const shared = Shared.getInstance();
