import Board from "../Board/Board";
import Chess from "./Chess"

export default class Cannons extends Chess {
    constructor(type) {
        super(type);
        this.name = type === 1 ? "砲" : "炮";
    }
    canMove(x, y) {
        let place = [];
        for (let i = x + 1; i < Board.X; ++i) {
            if (!this.isEmpty(i, y)) {
                ++i;
                for (; i < Board.X; ++i) {
                    if (this.isDiffType(i, y)) {
                        place.push([i, y]);
                        break;
                    }
                }
                break;
            }
            place.push([i, y]);
        }
        for (let i = x - 1; i >= 0; --i) {
            if (!this.isEmpty(i, y)) {
                --i;
                for (; i >= 0; --i) {
                    if (this.isDiffType(i, y)) {
                        place.push([i, y]);
                        break;
                    }
                }
                break;
            }
            place.push([i, y]);
        }
        for (let i = y + 1; i < Board.Y; ++i) {
            if (!this.isEmpty(x, i)) {
                ++i;
                for (; i < Board.Y; ++i) {
                    if (this.isDiffType(x, i)) {
                        place.push([x, i]);
                        break;
                    }
                }
                break;
            }
            place.push([x, i]);
        }
        for (let i = y - 1; i >= 0; --i) {
            if (!this.isEmpty(x, i)) {
                --i;
                for (; i >= 0; --i) {
                    if (this.isDiffType(x, i)) {
                        place.push([x, i]);
                        break;
                    }
                }
                break;
            }
            place.push([x, i]);
        }
        return place;
    }
}