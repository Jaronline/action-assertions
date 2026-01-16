import { assertNotEquals } from "../src/assertions";
import { AssertNotEqualsError } from "../src/errors/assert-not-equals";

describe("Assert Not Equals Tests", () => {
	const emptyMessageConfig = {
		message: () => "",
	};

	it("GIVEN unexpected='hello' AND actual='world' WHEN assertNotEquals is called THEN does not throw", () => {
		const config = {
			unexpected: () => "hello",
			actual: () => "world",
		};

		expect(() => {
			assertNotEquals(config, emptyMessageConfig);
		}).not.toThrow();
	});

	it("GIVEN unexpected='world' AND actual='hello' AND message='Values should not be equal!' WHEN assertNotEquals is called THEN does not throw", () => {
		const config = {
			unexpected: () => "world",
			actual: () => "hello",
		};

		const messageConfig = {
			message: () => "Values should not be equal!",
		};

		expect(() => {
			assertNotEquals(config, messageConfig);
		}).not.toThrow();
	});

	it("GIVEN unexpected='foo' AND actual='foo' WHEN assertNotEquals is called THEN throws AssertNotEqualsError", () => {
		const config = {
			unexpected: () => "foo",
			actual: () => "foo",
		};

		expect(() => {
			assertNotEquals(config, emptyMessageConfig);
		}).toThrowError(new AssertNotEqualsError("foo"));
	});

	it("GIVEN unexpected='foo' AND actual='foo' AND message='Values should not be equal!' WHEN assertNotEquals is called THEN throws AssertNotEqualsError with custom message", () => {
		const config = {
			unexpected: () => "foo",
			actual: () => "foo",
		};

		const messageConfig = {
			message: () => "Values should not be equal!",
		};

		expect(() => {
			assertNotEquals(config, messageConfig);
		}).toThrowError(new AssertNotEqualsError("foo", "Values should not be equal!"));
	});
});
