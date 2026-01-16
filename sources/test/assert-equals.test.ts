import { assertEquals } from "../src/assertions";
import { AssertEqualsError } from "../src/errors/assert-equals";

describe("Assert Equals Tests", () => {
	const emptyMessageConfig = {
		message: () => "",
	};

	it("GIVEN expected='hello' AND actual='hello' WHEN assertEquals is called THEN no error is thrown", () => {
		const config = {
			expected: () => "hello",
			actual: () => "hello",
		};

		expect(() => {
			assertEquals(config, emptyMessageConfig);
		}).not.toThrow();
	});

	it("GIVEN expected='world' AND actual='world' AND message='Values should be equal' WHEN assertEquals is called THEN no error is thrown", () => {
		const config = {
			expected: () => "world",
			actual: () => "world",
		};

		const messageConfig = {
			message: () => "Values should be equal",
		};

		expect(() => {
			assertEquals(config, messageConfig);
		}).not.toThrow();
	});

	it("GIVEN expected='foo' AND actual='bar' WHEN assertEquals is called THEN AssertEqualsError is thrown", () => {
		const config = {
			expected: () => "foo",
			actual: () => "bar",
		};

		expect(() => {
			assertEquals(config, emptyMessageConfig);
		}).toThrowError(new AssertEqualsError("foo", "bar"));
	});

	it("GIVEN expected='foo' AND actual='baz' AND message='Values should be equal' WHEN assertEquals is called THEN AssertEqualsError with custom message is thrown", () => {
		const config = {
			expected: () => "foo",
			actual: () => "baz",
		};

		const messageConfig = {
			message: () => "Values should be equal",
		};

		expect(() => {
			assertEquals(config, messageConfig);
		}).toThrowError(new AssertEqualsError("foo", "baz", "Values should be equal"));
	});
});
