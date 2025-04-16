import Entity from "./entity";
import { map, Room } from "./map";

class Shared {
    private static instance: Shared;

    currentRoom: Room = <Room>map[2][2];
    currentRoomIndex: number[] = [2, 2];
    currentEntities: Entity[] = [];
    keys: { [Key: string]: boolean } = {
        w: false,
        a: false,
        s: false,
        d: false,
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
    };

    private constructor() {}

    static getInstance(): Shared {
        if (!Shared.instance) {
            Shared.instance = new Shared();
        }
        return Shared.instance;
    }
}

export const shared = Shared.getInstance();
