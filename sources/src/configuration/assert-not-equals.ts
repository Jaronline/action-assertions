import * as core from "@actions/core";

export class AssertNotEqualsConfig {
	unexpected(): string {
		return core.getInput("unexpected", { required: true });
	}

	actual(): string {
		return core.getInput("actual", { required: true });
	}
}
