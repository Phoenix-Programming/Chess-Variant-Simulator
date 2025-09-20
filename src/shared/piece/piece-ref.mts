
import { Piece } from "./piece.mjs";
import { Sq_Coord } from "../board/sq-coord.mjs";

export class Piece_Ref {
    constructor(
        public color: number,
        public coord: Sq_Coord,
        public pieceType: Piece
    ){}
}
