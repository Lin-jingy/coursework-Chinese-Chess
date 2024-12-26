import Chess from "./Chess"

export default class Pawns extends Chess {
    constructor(type) {
        super(type);
        this.name = type === 1 ? "卒" : "兵";
    }
    canMove(x, y) {
        let place = [];
        if (this.isInSelfBoard(x, y)) {
            if (this.type === 1) place.push([x + 1, y]);
            else place.push([x - 1, y]);
        } else {
            if (this.isInBoard(x, y + 1) && !this.isSameType(x, y + 1)) place.push([x, y + 1]);
            if (this.isInBoard(x, y - 1) && !this.isSameType(x, y - 1)) place.push([x, y - 1]);
            if (this.type === 1) {
                if (this.isInBoard(x + 1, y) && !this.isSameType(x + 1, y)) place.push([x + 1, y]);
            } else {
                if (this.isInBoard(x - 1, y) && !this.isSameType(x - 1, y)) place.push([x - 1, y]);
            }
        }
        return place;
    }
}