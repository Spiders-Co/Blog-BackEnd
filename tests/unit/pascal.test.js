const pascal = require("../../utils/pascal");

describe("pascal", () => {
	it("should return pascal case - long phrase ", () => {
		const result = pascal("war heros at return");
		expect(result).toEqual("War Heros At Return");
	});

	it("should return pascal case - single word", () => {
		const result = pascal("fun");
		expect(result).toEqual("Fun");
	});
});
