import * as core from "@actions/core";
import { access, constants, glob } from "fs/promises";
import { MatchMethod } from "./match-method";
import { JobFailure } from "../errors/errors";

export type PathMatcher = (path: string) => Promise<boolean>;

export function getMatcherFor(matchMethod: MatchMethod): PathMatcher {
	switch (matchMethod) {
		case MatchMethod.EXACT:
			return pathExists;
		case MatchMethod.GLOB:
			return globExists;
		default:
			throw new JobFailure(`Unknown match method: ${matchMethod}`);
	}
}

async function pathExists(path: string): Promise<boolean> {
	try {
		await access(path, constants.F_OK);
		return true;
	} catch (error) {
		core.debug(`Path does not exist: ${path}. Error: ${String(error)}`);
		return false;
	}
}

async function globExists(pattern: string): Promise<boolean> {
	for await (const _ of glob(pattern)) {
		return true;
	}
	return false;
}
