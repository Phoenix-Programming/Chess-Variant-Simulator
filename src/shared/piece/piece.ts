import { MovePattern } from "./move-patterns/move-patterns";
import { Board } from "../board/board";
import { PieceRef } from "./piece-ref";
import { type Move } from "./move";

export class Piece {
	constructor(private patterns: MovePattern[]) {}

    public getMovesFrom(board: Board, piece: PieceRef): Move[] {
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
