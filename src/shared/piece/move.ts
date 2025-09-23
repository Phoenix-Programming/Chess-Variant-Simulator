import { type SqrCoord } from "../board/sq-coord";

export interface Move {
	from: SqrCoord;
	to: SqrCoord;
}
