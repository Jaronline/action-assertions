import { AssertionFailure } from "./errors";

export class AssertPathExistsError extends AssertionFailure {
	constructor(path: string, message?: string) {
		super({
			message,
			details: `Expected file to exist at path: ${path}`,
		});
	}
}
