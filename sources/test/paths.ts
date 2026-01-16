import { writeFile, mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

export async function mktemp() {
	const dir = await mkdtemp(join(tmpdir(), "tmp-test-"));
	const file = join(dir, "temp-file.txt");
	await writeFile(file, "Temporary file content");
	return { file, dir };
}

export async function rmtemp(path: string) {
	if (!path.startsWith(tmpdir())) {
		throw new Error(`Refusing to delete path outside of system temp directory: ${tmpdir()}`);
	}
	if (path === tmpdir()) {
		throw new Error(`Refusing to delete the system temp directory: ${tmpdir()}`);
	}
	await rm(path, { recursive: true, force: true });
}
