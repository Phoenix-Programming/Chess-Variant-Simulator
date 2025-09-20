
import { Move } from "./move.mjs";
import { Board } from "../board/board.mjs";
import { Piece_Ref } from "./piece-ref.mjs";

export abstract class Move_Pattern {
    abstract getMatches(board: Board, piece: Piece_Ref): Move[];
}
