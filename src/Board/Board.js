import Chess from "../Chess/Chess";
import Cannons from "../Chess/Cannons";
import Elephants from "../Chess/Elephants";
import King from "../Chess/King";
import Knights from "../Chess/Knights";
import Mandarins from "../Chess/Mandarins";
import Pawns from "../Chess/Pawns";
import Rooks from "../Chess/Rooks";

const Board = (function () {
    class BoardClass { }

    BoardClass.X = 10;
    BoardClass.Y = 9;
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

    BoardClass.checkWin = (flag) => {
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

    return BoardClass;
})();

export default Board;