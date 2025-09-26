import { Move_Pattern } from "./move-patterns/move-patterns.js";
import { Board } from "../board/board.js";
import { Piece_Ref } from "./piece-ref.js";
import { Move } from "./move.js";

export class Piece {
    constructor(
        private patterns: Move_Pattern[]
    ){}

    public getMovesFrom(board: Board, piece: Piece_Ref): Move[] {
        // Uses a set to remove duplicates
        let total_moves: Set<Move> = new Set<Move>();

        for (let move_pattern of this.patterns) {
            let new_moves = move_pattern.getMatches(board, piece);
            // Adds each new move into total moves
            // total_moves is a set this will remove duplicates for free
            new_moves.forEach(total_moves.add, total_moves);
        }

        // Converts set back to array for easier use later
        return Array.from(total_moves);
    }
}
