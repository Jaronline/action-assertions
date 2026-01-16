import { AssertionFailure } from "./errors";

export class AssertEqualsError extends AssertionFailure {
	constructor(expected: unknown, actual: unknown, message?: string) {
		super({
			message,
			details: `Expected: ${JSON.stringify(expected, null, 2)}\nActual:   ${JSON.stringify(actual, null, 2)}`,
		});
	}
}
