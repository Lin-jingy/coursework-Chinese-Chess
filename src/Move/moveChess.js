import Board from '../Board/Board';
import tryMove from './tryMove';

const moveChess = (fromRow, fromCol, toRow, toCol) => {

    if (!tryMove(fromRow, fromCol, toRow, toCol)) {
        alert("正在被将军");
        return false;
    }

    console.log("trymove", tryMove(fromRow, fromCol, toRow, toCol));

    const fromChess = Board.board[fromRow][fromCol];

    if (fromChess.name === "将" || fromChess.name === "帅") {
        for (let i = 0; i < Board.X; ++i) {
            if (i === toRow) continue;
            if (Board.board[i][toCol].name === "将" || Board.board[i][toCol].name === "帅") {
                return;
            }
        }
    }

    Board.board[toRow][toCol] = fromChess;
    Board.board[fromRow][fromCol] = { type: 0, name: '' };

    return true;
};



export default moveChess;