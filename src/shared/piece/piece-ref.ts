import { Piece } from "./piece";
import { Color } from "../turn";
import { type SqrCoord } from "../board/sq-coord";

export class PieceRef {
	constructor(public color: Color, public coord: SqrCoord, public pieceType: Piece) {}
}
