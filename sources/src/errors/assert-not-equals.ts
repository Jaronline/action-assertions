import { AssertionFailure } from "./errors";

export class AssertNotEqualsError extends AssertionFailure {
	constructor(value: unknown, message?: string) {
		super({
			message,
			details: `Expected values not to equal:\nValue: ${JSON.stringify(value, null, 2)}`,
		});
	}
}
