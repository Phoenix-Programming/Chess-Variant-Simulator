import { describe, it, expect,  } from 'vitest';
import { OffsetPattern } from '../../../../src/shared/piece/move-patterns/offset-pattern.js';

describe("Offset Pattern", () => {
	it("Doesn't accept min iterations less than 1.", () => {
		expect(() => {
			new OffsetPattern([0, 1], 0, Number.POSITIVE_INFINITY, true);
		}).toThrowError();
	});

	it("Doesn't accept max iterations less than min iterations.", () => {
		expect(() => {
			new OffsetPattern([0, 1], 3, 2, true);
		}).toThrowError();
	});

	it("Accepts valid min and max iteration values.", () => {
		new OffsetPattern([0, 1], 1, 2, true);
	});

	// TODO: Add additional unit tests after Board class has been implemented
});
