import { Square } from "./square";
import { type SqrCoord } from "./sq-coord";

import { type Move } from "../piece/move";
import { Color } from "../turn";

export class Board {
	// indexed like this: squares[rowIdx][colIdx]
	private squares: Square[][];
	private turn: Color;

	constructor(private width: number, private height: number) {}

	public getWidth(): number {
		return this.width;
	}

	public getHeight(): number {
		return this.height;
	}

	public getTurn() {
		return this.turn;
	}

	public makeMove(move: Move): void {
		throw new Error("Unimplemented");
	}

	public generateMoves(): Move[] {
		throw new Error("Unimplemented");
	}

	public getSquare(coord: SqrCoord): Square {
		throw new Error("Unimplemented");
	}
}
