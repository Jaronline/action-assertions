import * as core from "@actions/core";
import { isMatchMethod, MatchMethod } from "../paths/match-method";
import { InvalidMatchMethodError } from "../errors/paths";

const ACTION_ID_VAR = "JARONLINE_ACTION_ID";

export class PathConfig {
	path(): string {
		return core.getInput("path", { required: true });
	}

	matchMethod(): MatchMethod {
		const method = getOptionalInput("match-method", { trimWhitespace: true }) ?? "exact";
		if (!isMatchMethod(method)) {
			throw new InvalidMatchMethodError(method);
		}
		return method;
	}
}

export class MessageConfig {
	message(): string | undefined {
		return getOptionalInput("message", { trimWhitespace: true });
	}
}

// Internal parameters
export function getWorkspaceDirectory(): string {
	return process.env.GITHUB_WORKSPACE || "";
}

export function getActionId(): string | undefined {
	return process.env[ACTION_ID_VAR];
}

export function setActionId(actionId: string): void {
	core.exportVariable(ACTION_ID_VAR, actionId);
}

function getOptionalInput(name: string, options?: Omit<core.InputOptions, "required">): string | undefined {
	const value = core.getInput(name, options);
	return value === "" ? undefined : value;
}
