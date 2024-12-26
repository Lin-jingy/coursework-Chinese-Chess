import Chess from "./Chess"

export default class Mandarins extends Chess {
    constructor(type) {
        super(type);
        this.name = type === 1 ? "士" : "仕";
    }
    isInItsPlace(x, y) {
        if(this.type === 1) {
            return x == 0 && y == 3 || x == 0  && y == 5 || x == 1 && y == 4 || x == 2 && y == 3 || x == 2 && y == 5;
        } else if(this.type === 2) {
            return x == 9 && y == 3 || x == 9  && y == 5 || x == 8 && y == 4 || x == 7 && y == 3 || x == 7 && y == 5;
        }
        return false;
    }
    canMove(x, y) {
        let place = [];
        if (this.isInItsPlace(x - 1, y - 1) && !this.isSameType(x - 1, y - 1)) place.push([x - 1, y - 1]);
        if (this.isInItsPlace(x - 1, y + 1) && !this.isSameType(x - 1, y + 1)) place.push([x - 1, y + 1]);
        if (this.isInItsPlace(x + 1, y - 1) && !this.isSameType(x + 1, y - 1)) place.push([x + 1, y - 1]);
        if (this.isInItsPlace(x + 1, y + 1) && !this.isSameType(x + 1, y + 1)) place.push([x + 1, y + 1]);
        return place;
    }
}