import Chess from "../Chess/Chess";
import Cannons from "../Chess/Cannons";
import Elephants from "../Chess/Elephants";
import King from "../Chess/King";
import Knights from "../Chess/Knights";
import Mandarins from "../Chess/Mandarins";
import Pawns from "../Chess/Pawns";
import Rooks from "../Chess/Rooks";
const clone = require('lodash'); // 导入 lodash 库用于深拷贝

// 定义 Board 类
const Board = (function () {
    class BoardClass { }

    BoardClass.X = 10; // 棋盘行数
    BoardClass.Y = 9; // 棋盘列数
    // 初始化棋盘，放置棋子
    BoardClass.board = [
        [new Rooks(1), new Knights(1), new Elephants(1), new Mandarins(1), new King(1), new Mandarins(1), new Elephants(1), new Knights(1), new Rooks(1)],
        [new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess()],
        [new Chess(), new Cannons(1), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Cannons(1), new Chess()], 
        [new Pawns(1), new Chess(), new Pawns(1), new Chess(), new Pawns(1), new Chess(), new Pawns(1), new Chess(), new Pawns(1)], 
        [new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess()],
        [new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess()], 
        [new Pawns(2), new Chess(), new Pawns(2), new Chess(), new Pawns(2), new Chess(), new Pawns(2), new Chess(), new Pawns(2)],
        [new Chess(), new Cannons(2), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Cannons(2), new Chess()], 
        [new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess(), new Chess()], 
        [new Rooks(2), new Knights(2), new Elephants(2), new Mandarins(2), new King(2), new Mandarins(2), new Elephants(2), new Knights(2), new Rooks(2)] 
    ];
    BoardClass.init = clone.cloneDeep(BoardClass.board); // 深拷贝初始棋盘状态

    return BoardClass; // 返回 BoardClass 类
})();

export default Board; 