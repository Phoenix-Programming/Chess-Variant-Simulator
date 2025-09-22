import { Square } from "./square.js";
import { Sq_Coord } from "./sq-coord.js";

import { Move } from "../piece/move.js";
import { Color } from "../turn.js";

export class Board {
    // indexed like this: squares[rowIdx][colIdx]
    private squares: Square[][];
    private turn: Color;

    constructor(
        private width: number,
        private height: number
    ) {}

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getTurn() {
        return this.turn;
    }

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
