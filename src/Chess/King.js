import Chess from "./Chess"


export default class King extends Chess {
    constructor(type) {
        super(type);
        this.name = type === 1 ? "将" : "帅";
    }
    canMove(x, y) {
        let place = [];
        if (this.isInBoard(x + 1, y) && !this.isSameType(x + 1, y)) place.push([x + 1, y]);
        if (this.isInBoard(x - 1, y) && !this.isSameType(x - 1, y)) place.push([x - 1, y]);
        if (this.isInBoard(x, y + 1) && !this.isSameType(x, y + 1)) place.push([x, y + 1]);
        if (this.isInBoard(x, y - 1) && !this.isSameType(x, y - 1)) place.push([x, y - 1]);
        return place;
    }
}