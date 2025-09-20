
import { Board } from "../../board/board.mjs";
import { Move_Pattern } from "../move-patterns.mjs";
import { Move } from "../move.mjs";
import { Piece_Ref } from "../piece-ref.mjs";

export class Sliding_Pattern extends Move_Pattern {
    constructor(){
        super();
    }

    getMatches(board: Board, piece: Piece_Ref): Move[] {
        throw new Error("Unimplemented");
    }
}
