
import { Piece } from "./piece.js";
import { Color } from "../turn.js";
import { Sq_Coord } from "../board/sq-coord.js";

export class Piece_Ref {
    constructor(
        public color: Color,
        public coord: Sq_Coord,
        public pieceType: Piece
    ){}
}
