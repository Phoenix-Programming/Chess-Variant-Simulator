import { Piece } from "./piece";
import { Color } from "../turn";
import { type Sq_Coord } from "../board/sq-coord";

export class Piece_Ref {
    constructor(
        public color: Color,
        public coord: Sq_Coord,
        public pieceType: Piece
    ) {}
}
