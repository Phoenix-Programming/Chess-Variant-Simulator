import { Move_Pattern } from "./move-patterns/move-patterns";
import { Board } from "../board/board";
import { Piece_Ref } from "./piece-ref";
import { type Move } from "./move";

export class Piece {
    constructor(
        private patterns: Move_Pattern[]
    ) {}

    public getMovesFrom(Board: Board, piece: Piece_Ref): Move[] {
        throw new Error("Unimplemented");
    }
}
