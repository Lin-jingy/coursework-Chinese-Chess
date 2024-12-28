import Board from '../Board/Board';
import tryMove from './tryMove';

// 移动棋子的函数
const moveChess = (fromRow, fromCol, toRow, toCol) => {

    // 检查是否可以移动棋子
    if (!tryMove(fromRow, fromCol, toRow, toCol)) {
        alert("正在被将军"); // 如果不能移动，提示正在被将军
        return false; // 返回 false 表示移动失败
    }
    const fromChess = Board.board[fromRow][fromCol]; // 获取要移动的棋子

    Board.board[toRow][toCol] = fromChess; // 将棋子移动到目标位置
    Board.board[fromRow][fromCol] = { type: 0, name: '' }; // 清空原位置
    return true; // 返回 true 表示移动成功
};

export default moveChess;