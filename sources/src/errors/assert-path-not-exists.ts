import { AssertionFailure } from "./errors";

export class AssertPathNotExistsError extends AssertionFailure {
	constructor(path: string, message?: string) {
		super({
			message,
			details: `Expected nothing to exist at path: ${path}`,
		});
	}
}
