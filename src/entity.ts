import { context } from "./constants";
import type { Room } from "./map";

export default abstract class Entity {
    abstract x: number;
    abstract y: number;
    abstract image: HTMLImageElement;

    abstract move(): void;
    abstract checkTileCollision(room: Room): void | number;

    draw() {
        context.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
    }
}
