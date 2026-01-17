import { MatchMethod } from "../paths/match-method";
import { JobFailure } from "./errors";

export class InvalidMatchMethodError extends JobFailure {
	constructor(method: string) {
		super(
			`Invalid match-method: ${method}. Allowed values: ${Object.values(MatchMethod)
				.map(m => `"${m}"`)
				.join(", ")}.`
		);
	}
}
