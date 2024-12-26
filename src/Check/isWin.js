import Board from '../Board/Board'
import tryMove from '../Move/tryMove';


// 判断flag这方是否获胜
const isWin = (flag) => {
    flag = 3 - flag;
    for (let i = 0; i < Board.X; ++i) {
        for (let j = 0; j < Board.Y; ++j) {
            if (Board.board[i][j].type === flag) {
                let place = Board.board[i][j].canMove(i, j);
                for (let item = 0; item < place.length; ++item) {
                    if (tryMove(i, j, place[item][0], place[item][1])) return false;
                }
            }
        }
    }
    return true;
};


export default isWin;