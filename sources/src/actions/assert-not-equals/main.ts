import { assertNotEquals } from "../../assertions";
import { AssertNotEqualsConfig } from "../../configuration/assert-not-equals";
import { MessageConfig, setActionId } from "../../configuration/configuration";
import { handleMainActionError } from "../../errors/errors";

export function run(): void {
	try {
		setActionId("jaronline/action-assertions/assert-not-equals");
		assertNotEquals(new AssertNotEqualsConfig(), new MessageConfig());
	} catch (error) {
		handleMainActionError(error);
	}
}

run();
