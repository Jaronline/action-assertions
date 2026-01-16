import { assertPathExists } from "../../assertions";
import { MessageConfig, PathConfig, setActionId } from "../../configuration/configuration";
import { handleMainActionError } from "../../errors/errors";

export async function run(): Promise<void> {
	try {
		setActionId("jaronline/action-assertions/assert-path-exists");
		await assertPathExists(new PathConfig(), new MessageConfig());
	} catch (error) {
		handleMainActionError(error);
	}
}

void run();
