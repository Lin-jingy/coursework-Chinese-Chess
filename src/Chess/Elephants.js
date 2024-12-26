import Chess from "./Chess"

export default class Elephants extends Chess {
    constructor(type) {
        super(type);
        this.name = type === 1 ? "象" : "相";
    }
    canMove(x, y) {
        let place = [];
        if (this.isInSelfBoard(x - 2, y - 2) && !this.isSameType(x - 2, y - 2)) place.push([x - 2, y - 2]);
        if (this.isInSelfBoard(x - 2, y + 2) && !this.isSameType(x - 2, y + 2)) place.push([x - 2, y + 2]);
        if (this.isInSelfBoard(x + 2, y - 2) && !this.isSameType(x + 2, y - 2)) place.push([x + 2, y - 2]);
        if (this.isInSelfBoard(x + 2, y + 2) && !this.isSameType(x + 2, y + 2)) place.push([x + 2, y + 2]);
        return place;
    }
}