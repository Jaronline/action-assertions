import { assertEquals } from "../../assertions";
import { AssertEqualsConfig } from "../../configuration/assert-equals";
import { MessageConfig, setActionId } from "../../configuration/configuration";
import { handleMainActionError } from "../../errors/errors";

export function run(): void {
	try {
		setActionId("jaronline/action-assertions/assert-equals");
		assertEquals(new AssertEqualsConfig(), new MessageConfig());
	} catch (error) {
		handleMainActionError(error);
	}
}

run();
