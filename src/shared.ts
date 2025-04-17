import { PLAYER_IMAGE } from "./constants";
import Entity from "./entity";
import { getNewMap, Room } from "./map";
import Player from "./player";

class Shared {
    private static instance: Shared;

    currentRoom: Room = { terrain: [], startEntities: [] };
    currentRoomIndex: number[] = [];
    currentEntities: Entity[] = [];
    roomEnemies: number = 0;
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
    player: Player = new Player(7, 4, PLAYER_IMAGE, 4, 500);
    isGameOver: boolean = false;
    map: Room[][] = getNewMap();

    private constructor() {}

    static getInstance(): Shared {
        if (!Shared.instance) {
            Shared.instance = new Shared();
        }
        return Shared.instance;
    }
}

export const shared = Shared.getInstance();
