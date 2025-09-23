import { type Move } from "../move";
import { Board } from "../../board/board";
import { Piece_Ref } from "../piece-ref";

export abstract class Move_Pattern {
	public abstract getMatches(board: Board, piece: Piece_Ref): Move[];
}
