import Board from "../Board/Board";
export default class Chess {
    constructor(type = 0) {
        this.type = type;
        this.name = "";
    }
    isSameType(x, y) {
        let other = Board.board[x][y];
        return this.type === other.type;
    }
    isDiffType(x, y) {
        let other = Board.board[x][y];
        return this.type !== other.type && this.type !== 0 && other.type !== 0;
    }
    isEmpty(x, y) {
        let other = Board.board[x][y];
        return other.type === 0;
    }
    isInBoard(x, y) {
        return x >= 0 && x < Board.X && y >= 0 && y < Board.Y;
    }
    isInSelfBoard(x, y) {
        if (!this.isInBoard(x, y)) return false;
        if (this.type === 1) {
            return x <= 4;
        } else {
            return x > 4;
        }
    }
    canMove(x, y) {
        return [];
    }
}

