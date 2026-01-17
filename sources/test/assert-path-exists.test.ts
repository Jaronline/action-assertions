import { dirname } from "node:path";
import { assertPathExists } from "../src/assertions";
import { AssertPathExistsError } from "../src/errors/assert-path-exists";
import { MatchMethod } from "../src/paths/match-method";
import { makeTempDir, makeTempFile, removeTemp } from "./paths";

describe("Assert Path Exists Tests", () => {
	const emptyMessageConfig = {
		message: () => "",
	};
	let tmp: { file: string; dir: string };
	let tmpEmptyDir: string;

	beforeAll(async () => {
		tmp = await makeTempFile();
		tmpEmptyDir = await makeTempDir();
	});

	it.each<[() => string, MatchMethod]>([
		[() => tmp.file, MatchMethod.EXACT],
		[() => tmp.dir, MatchMethod.EXACT],
		[() => `${tmp.dir}/*`, MatchMethod.GLOB],
		[() => `${dirname(tmp.dir)}/*`, MatchMethod.GLOB],
		[() => `${dirname(tmp.dir)}/**/*`, MatchMethod.GLOB],
	])("GIVEN path=%s, matchMethod=%s WHEN assertPathExists is called THEN does not throw", (path, matchMethod) => {
		const pathConfig = {
			path,
			matchMethod: () => matchMethod,
		};

		expect(() => assertPathExists(pathConfig, emptyMessageConfig)).not.toThrow();
	});

	it.each<[() => string, MatchMethod]>([
		[() => tmp.file, MatchMethod.EXACT],
		[() => tmp.dir, MatchMethod.EXACT],
		[() => `${tmp.dir}/*`, MatchMethod.GLOB],
		[() => `${dirname(tmp.dir)}/*`, MatchMethod.GLOB],
		[() => `${dirname(tmp.dir)}/**/*`, MatchMethod.GLOB],
	])(
		"GIVEN path=%s, matchMethod=%s AND message='Path should exist' WHEN assertPathExists is called THEN does not throw",
		(path, matchMethod) => {
			const pathConfig = {
				path,
				matchMethod: () => matchMethod,
			};

			const messageConfig = {
				message: () => "Path should exist",
			};

			expect(() => assertPathExists(pathConfig, messageConfig)).not.toThrow();
		}
	);

	it.each<[() => string, MatchMethod]>([
		[() => "/non/existent/path", MatchMethod.EXACT],
		[() => "/non/existent/*", MatchMethod.GLOB],
		[() => `${tmpEmptyDir}/*`, MatchMethod.GLOB],
	])(
		"GIVEN path=%s, matchMethod=%s WHEN assertPathExists is called THEN throws AssertPathExistsError",
		async (path, matchMethod) => {
			const pathConfig = {
				path,
				matchMethod: () => matchMethod,
			};

			await expect(() => assertPathExists(pathConfig, emptyMessageConfig)).rejects.toThrowError(
				new AssertPathExistsError(path())
			);
		}
	);

	it.each<[() => string, MatchMethod]>([
		[() => "/non/existent/path", MatchMethod.EXACT],
		[() => "/non/existent/*", MatchMethod.GLOB],
		[() => `${tmpEmptyDir}/*`, MatchMethod.GLOB],
	])(
		"GIVEN path=%s, matchMethod=%s AND message='Path should exist' WHEN assertPathExists is called THEN throws AssertPathExistsError with custom message",
		async (path, matchMethod) => {
			const pathConfig = {
				path,
				matchMethod: () => matchMethod,
			};

			const messageConfig = {
				message: () => "Path should exist",
			};

			await expect(() => assertPathExists(pathConfig, messageConfig)).rejects.toThrowError(
				new AssertPathExistsError(path(), "Path should exist")
			);
		}
	);

	afterAll(async () => {
		await removeTemp(tmp.dir);
		await removeTemp(tmpEmptyDir);
	});
});
