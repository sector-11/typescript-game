import Entity from "./entity";

export const entitiesNotColliding = (entity1: Entity, entity2: Entity) => {
    return (
        entity1.x > entity2.x + entity2.image.width ||
        entity1.x + entity1.image.width < entity2.x ||
        entity1.y > entity2.y + entity2.image.height ||
        entity1.y + entity1.image.height < entity2.y
    );
};
