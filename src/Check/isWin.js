import Board from '../Board/Board';
import tryMove from '../Move/tryMove'; 

// 判断 flag 这方是否获胜
const isWin = (flag) => {
    flag = 3 - flag; // 切换 flag 以检查对方棋子
    for (let i = 0; i < Board.X; ++i) { // 遍历棋盘的每一行
        for (let j = 0; j < Board.Y; ++j) { // 遍历棋盘的每一列
            if (Board.board[i][j].type === flag) { // 如果当前单元格有对方的棋子
                let place = Board.board[i][j].canMove(i, j); // 获取该棋子的所有可移动位置
                for (let item = 0; item < place.length; ++item) { // 遍历所有可移动位置
                    if (tryMove(i, j, place[item][0], place[item][1])) return false; // 尝试移动，如果能移动则对方未获胜
                }
            }
        }
    }
    return true; // 如果所有棋子都不能移动，则对方获胜
};

export default isWin;