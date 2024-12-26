import Board from "../Board/Board";
import Chess from "./Chess"

export default class Knights extends Chess {
    constructor(type) {
        super(type);
        this.name = type === 1 ? "马" : "馬";
    }
    canMove(x, y) {
        let place = [];
        let rx = x + 2;
        let ry = y + 1;
        if (this.isInBoard(rx, ry) && !this.isSameType(rx, ry) && Board.board[x + 1][y].type === 0) place.push([rx, ry]);
        ry = y - 1;
        if (this.isInBoard(rx, ry) && !this.isSameType(rx, ry) && Board.board[x + 1][y].type === 0) place.push([rx, ry]);

        rx = x - 2;
        ry = y + 1;
        if (this.isInBoard(rx, ry) && !this.isSameType(rx, ry) && Board.board[x - 1][y].type === 0) place.push([rx, ry]);
        ry = y - 1;
        if (this.isInBoard(rx, ry) && !this.isSameType(rx, ry) && Board.board[x - 1][y].type === 0) place.push([rx, ry]);

        rx = x - 1;
        ry = y - 2;
        if (this.isInBoard(rx, ry) && !this.isSameType(rx, ry) && Board.board[x][y - 1].type === 0) place.push([rx, ry]);
        rx = x + 1;
        if (this.isInBoard(rx, ry) && !this.isSameType(rx, ry) && Board.board[x][y - 1].type === 0) place.push([rx, ry]);

        rx = x - 1;
        ry = y + 2;
        if (this.isInBoard(rx, ry) && !this.isSameType(rx, ry) && Board.board[x][y + 1].type === 0) place.push([rx, ry]);
        rx = x + 1;
        if (this.isInBoard(rx, ry) && !this.isSameType(rx, ry) && Board.board[x][y + 1].type === 0) place.push([rx, ry]);
        return place;
    }
}