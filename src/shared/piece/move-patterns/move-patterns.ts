import { type Move } from "../move";
import { Board } from "../../board/board";
import { PieceRef } from "../piece-ref";

export abstract class MovePattern {
	public abstract getMatches(board: Board, piece: PieceRef): Move[];
}
