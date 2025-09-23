import { MovePattern } from "./move-patterns/move-patterns";
import { Board } from "../board/board";
import { PieceRef } from "./piece-ref";
import { type Move } from "./move";

export class Piece {
	constructor(private patterns: MovePattern[]) {}

	public getMovesFrom(Board: Board, piece: PieceRef): Move[] {
		throw new Error("Unimplemented");
	}
}
