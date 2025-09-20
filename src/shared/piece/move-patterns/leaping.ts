
import { Board } from "../../board/board.js";
import { Move_Pattern } from "../move-patterns.js";
import { Move } from "../move.js";
import { Piece_Ref } from "../piece-ref.js";

export class Leaping_Pattern extends Move_Pattern {
    constructor(){
        super();
    }

    getMatches(board: Board, piece: Piece_Ref): Move[] {
        throw new Error("Unimplemented");
    }
}
