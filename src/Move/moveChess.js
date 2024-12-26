import Board from '../Board/Board';
import tryMove from './tryMove';

const moveChess = (fromRow, fromCol, toRow, toCol) => {

    if (!tryMove(fromRow, fromCol, toRow, toCol)) {
        alert("正在被将军");
        return false;
    }
    const fromChess = Board.board[fromRow][fromCol];

    Board.board[toRow][toCol] = fromChess;
    Board.board[fromRow][fromCol] = { type: 0, name: '' };
    return true;
};



export default moveChess;