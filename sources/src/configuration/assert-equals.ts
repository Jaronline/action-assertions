import * as core from "@actions/core";

export class AssertEqualsConfig {
	expected(): string {
		return core.getInput("expected", { required: true });
	}

	actual(): string {
		return core.getInput("actual", { required: true });
	}
}
