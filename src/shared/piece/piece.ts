
import { Move_Pattern } from "./move-patterns.js";
import { Board } from "../board/board.js";
import { Piece_Ref } from "./piece-ref.js";
import { Move } from "./move.js";

export class Piece {
    private patterns: Move_Pattern[];

    getMovesFrom(Board: Board, piece: Piece_Ref): Move[] {
        throw new Error("Unimplemented");
    }
}
