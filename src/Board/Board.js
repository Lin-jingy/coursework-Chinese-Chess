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

    

    return BoardClass;
})();

export default Board;