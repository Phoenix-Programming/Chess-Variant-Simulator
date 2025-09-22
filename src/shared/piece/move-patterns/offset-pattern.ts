import { Board } from "../../board/board.js";
import { Move_Pattern } from "./move-patterns.js";
import { Move } from "../move.js";
import { Piece_Ref } from "../piece-ref.js";
import { Square } from "../../board/square.js";
import { Sq_Coord } from "../../board/sq-coord.js";

/**
 * This class defines an move offset pattern where a piece moves by a specified offset
 * between a minimum and maximum number of iterations
 */
export class Offset_Pattern extends Move_Pattern {
    constructor(
		private offset: [x: number, y: number],					// offset the piece moves in
		private minIters: number = 1,							// minimum iterations of the offset
		private maxIters: number = Number.POSITIVE_INFINITY,	// maximum iterations of the offset
		private canCapture: boolean								// whether the piece can capture
	) {
        super();

		if (minIters < 1) throw new Error("minIters can't be less than 1.");
		if (maxIters < minIters) throw new Error("maxIters can't be less than minIterations.");
    }

	/**
	 * Calculates all of the moves that match the defined offset pattern
	 *
	 * @param board - The current board state
	 * @param piece - The reference to the piece being moved
	 * @returns An array of all the moves that match the defined offset pattern
	 */
    public getMatches(board: Board, piece: Piece_Ref): Move[] {
		const moves: Move[] = [];

		let targetX: number = piece.coord.row + this.offset[0] * (this.minIters - 1);
		let targetY: number = piece.coord.column + this.offset[1] * (this.minIters - 1);

		// check the offset at each iteration
        for (let i: number = this.minIters; i <= this.maxIters; i++) {
			// add the offset
			targetX += this.offset[0];
			targetY += this.offset[1];

			// stop if we have moved outside the bounds of the board
			if (targetX < 0 || targetX >= board.getWidth() ||
				targetY < 0 || targetY >= board.getHeight()
			) break;

			const targetSqrCoord: Sq_Coord = { row: targetX, column: targetY };
			const targetSqr: Square = board.getSquare(targetSqrCoord);
			const targetPiece: Piece_Ref | undefined = targetSqr.pieceRef;

			// stop if there is a piece and it's of the same color or the piece can't capture
			if (targetPiece !== undefined &&
				(!this.canCapture || targetPiece.color === board.getTurn())
			) break;

			// add move
			moves.push({ from: piece.coord, to: targetSqrCoord });
		}

		return moves;
    }
}
