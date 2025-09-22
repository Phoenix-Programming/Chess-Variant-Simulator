import { Move } from "../move.js";
import { Board } from "../../board/board.js";
import { Piece_Ref } from "../piece-ref.js";

export abstract class Move_Pattern {
	public abstract getMatches(board: Board, piece: Piece_Ref): Move[];
}
