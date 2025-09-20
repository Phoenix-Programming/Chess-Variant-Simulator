
import { Square } from "./square.mjs";
import { Move } from "../piece/move.mjs";
import { Sq_Coord } from "./sq-coord.mjs";

export class Board {
    // indexed like this: squares[rowIdx][colIdx]
    private squares: Square[][];

    makeMove(move: Move): void {
        throw new Error("Unimplemented");
    }

    generateMoves(): Move[] {
        throw new Error("Unimplemented");
    }

    getSquare(coord: Sq_Coord): Square {
        throw new Error("Unimplemented");
    }
}
