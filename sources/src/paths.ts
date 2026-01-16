import * as core from "@actions/core";
import { access, constants } from "fs/promises";

export async function pathExists(path: string): Promise<boolean> {
	try {
		await access(path, constants.F_OK);
		return true;
	} catch (error) {
		core.debug(`Path does not exist: ${path}. Error: ${String(error)}`);
		return false;
	}
}
