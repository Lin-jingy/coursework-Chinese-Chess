import Board from "../Board/Board";
import Chess from "./Chess"

export default class Rooks extends Chess {
    constructor(type) {
        super(type);
        this.name = type === 1 ? "车" : "車";
    }
    canMove(x, y) {
        let place = [];
        for (let i = x + 1; i < Board.X; ++i) {
            if (this.isSameType(i, y)) break;
            place.push([i, y]);
            if (!this.isEmpty(i, y)) break;
        }
        for (let i = x - 1; i >= 0; --i) {
            if (this.isSameType(i, y)) break;
            place.push([i, y]);
            if (!this.isEmpty(i, y)) break;
        }
        for (let i = y + 1; i < Board.Y; ++i) {
            if (this.isSameType(x, i)) break;
            place.push([x, i]);
            if (!this.isEmpty(x, i)) break;
        }
        for (let i = y - 1; i >= 0; --i) {
            if (this.isSameType(x, i)) break;
            place.push([x, i]);
            if (!this.isEmpty(x, i)) break;
        }
        return place;
    }
}