import * as core from "@actions/core";

export class JobFailure extends Error {
	constructor(error: unknown) {
		if (error instanceof Error) {
			super(error.message);
			this.name = error.name;
			this.stack = error.stack;
		} else {
			super(String(error));
		}
	}
}

export class AssertionFailure extends Error {
	public readonly details?: string;

	constructor({ message = "", details }: { message?: string; details?: string } = {}) {
		super(`Assertion Failed: ${message}`.trim());
		this.name = "AssertionFailure";
		this.details = details;
	}
}

export function handleMainActionError(error: unknown): void {
	if (error instanceof AggregateError) {
		core.setFailed(`Multiple errors returned`);
		for (const err of error.errors) {
			core.error(`Error ${error.errors.indexOf(err)}: ${err.message}`);
			if (err.stack) {
				core.info(err.stack);
			}
		}
	} else if (error instanceof AssertionFailure) {
		core.setFailed(String(error));
		if (error.details) {
			core.info(error.details);
		}
	} else if (error instanceof JobFailure) {
		core.setFailed(String(error));
		if (error.stack) {
			core.info(error.stack);
		}
	} else {
		core.setFailed(String(error));
		if (error instanceof Error && error.stack) {
			core.info(error.stack);
		}
	}
}
