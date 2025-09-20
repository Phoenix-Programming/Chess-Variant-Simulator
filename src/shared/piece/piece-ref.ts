
import { Piece } from "./piece.js";
import { Sq_Coord } from "../board/sq-coord.js";

export class Piece_Ref {
    constructor(
        public color: number,
        public coord: Sq_Coord,
        public pieceType: Piece
    ){}
}
