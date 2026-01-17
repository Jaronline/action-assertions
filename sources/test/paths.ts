import { writeFile, mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

export async function makeTempFile() {
	const dir = await makeTempDir();
	const file = join(dir, "temp-file.txt");
	await writeFile(file, "Temporary file content");
	return { file, dir };
}

export async function makeTempDir() {
	const dir = await mkdtemp(join(tmpdir(), "tmp-test-"));
	return dir;
}

export async function removeTemp(path: string) {
	if (!path.startsWith(tmpdir())) {
		throw new Error(`Refusing to delete path outside of system temp directory: ${tmpdir()}`);
	}
	if (path === tmpdir()) {
		throw new Error(`Refusing to delete the system temp directory: ${tmpdir()}`);
	}
	await rm(path, { recursive: true, force: true });
}
