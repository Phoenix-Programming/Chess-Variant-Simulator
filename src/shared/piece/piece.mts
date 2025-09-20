
import { Move_Pattern } from "./move-patterns.mjs";
import { Board } from "../board/board.mjs";
import { Piece_Ref } from "./piece-ref.mjs";
import { Move } from "./move.mjs";

export class Piece {
    private patterns: Move_Pattern[];

    getMovesFrom(Board: Board, piece: Piece_Ref): Move[] {
        throw new Error("Unimplemented");
    }
}
