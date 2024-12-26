import Board from '../Board/Board'


// 判断flag这一方下一步能否吃将
const isNextWin = (flag) => {
    const king = [[], [], []];

    // 获取主帅位置
    for (let i = 0; i < Board.X; ++i) {
        for (let j = 0; j < Board.Y; ++j) {
            if (Board.board[i][j].name == "将") king[2] = [i, j];
            if (Board.board[i][j].name == "帅") king[1] = [i, j];
        }
    }


    // 检查一方下一步是否能将军
    for (let i = 0; i < Board.X; ++i) {
        for (let j = 0; j < Board.Y; ++j) {
            if (Board.board[i][j].type != flag) continue;
            let place = Board.board[i][j].canMove(i, j);
            for (let item = 0; item < place.length; ++item) {
                if (place[item][0] === king[flag][0] && place[item][1] === king[flag][1]) return true;
            }
        }
    }
    return false;
};

export default isNextWin;