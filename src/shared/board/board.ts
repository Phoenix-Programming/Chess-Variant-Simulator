
import { Square } from "./square.js";
import { Move } from "../piece/move.js";
import { Sq_Coord } from "./sq-coord.js";

export class Board {
    // indexed like this: squares[rowIdx][colIdx]
    private squares: Square[][];

    public makeMove(move: Move): void {
        throw new Error("Unimplemented");
    }

    public generateMoves(): Move[] {
        throw new Error("Unimplemented");
    }

    public getSquare(coord: Sq_Coord): Square {
        throw new Error("Unimplemented");
    }
}
