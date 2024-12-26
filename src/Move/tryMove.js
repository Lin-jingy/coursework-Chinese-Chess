import Board from '../Board/Board';
import isNextWin from '../Check/isNextWin'


// 尝试移动
const tryMove = (fromRow, fromCol, toRow, toCol) => {

    const fromChess = Board.board[fromRow][fromCol];
    const toChess = Board.board[toRow][toCol];

    Board.board[toRow][toCol] = fromChess;
    Board.board[fromRow][fromCol] = { type: 0, name: '' };

    let flag = fromChess.type;
    let success = isNextWin(3 - flag);
    // console.log("trymove", fromRow, fromCol, toRow, toCol, success);

    Board.board[fromRow][fromCol] = fromChess;
    Board.board[toRow][toCol] = toChess;

    return !success;
};


export default tryMove;