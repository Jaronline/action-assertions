import { AssertEqualsConfig } from "./configuration/assert-equals";
import { AssertNotEqualsConfig } from "./configuration/assert-not-equals";
import { MessageConfig, PathConfig } from "./configuration/configuration";
import { AssertEqualsError } from "./errors/assert-equals";
import { AssertNotEqualsError } from "./errors/assert-not-equals";
import { AssertPathExistsError } from "./errors/assert-path-exists";
import { AssertPathNotExistsError } from "./errors/assert-path-not-exists";
import { getMatcherFor } from "./paths/path-matcher";

export function assertEquals(config: AssertEqualsConfig, messageConfig: MessageConfig) {
	const expected = config.expected();
	const actual = config.actual();
	const message = messageConfig.message();

	if (expected !== actual) {
		throw new AssertEqualsError(expected, actual, message);
	}
}

export function assertNotEquals(config: AssertNotEqualsConfig, messageConfig: MessageConfig) {
	const unexpected = config.unexpected();
	const actual = config.actual();
	const message = messageConfig.message();

	if (unexpected === actual) {
		throw new AssertNotEqualsError(unexpected, message);
	}
}

export async function assertPathExists(pathConfig: PathConfig, messageConfig: MessageConfig) {
	const path = pathConfig.path();
	const matchMethod = pathConfig.matchMethod();
	const message = messageConfig.message();

	if (!(await getMatcherFor(matchMethod)(path))) {
		throw new AssertPathExistsError(path, message);
	}
}

export async function assertPathNotExists(pathConfig: PathConfig, messageConfig: MessageConfig) {
	const path = pathConfig.path();
	const matchMethod = pathConfig.matchMethod();
	const message = messageConfig.message();

	if (await getMatcherFor(matchMethod)(path)) {
		throw new AssertPathNotExistsError(path, message);
	}
}
