import Board from '../Board/Board';

const moveChess = (fromRow, fromCol, toRow, toCol) => {

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

};

export default moveChess;