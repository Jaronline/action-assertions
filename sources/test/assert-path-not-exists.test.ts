import { dirname } from "node:path";
import { assertPathNotExists } from "../src/assertions";
import { AssertPathNotExistsError } from "../src/errors/assert-path-not-exists";
import { MatchMethod } from "../src/paths/match-method";
import { makeTempDir, makeTempFile, removeTemp } from "./paths";

describe("Assert Path Not Exists Tests", () => {
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
		[() => "/non/existent/path", MatchMethod.EXACT],
		[() => "/non/existent/*", MatchMethod.GLOB],
		[() => `${tmpEmptyDir}/*`, MatchMethod.GLOB],
	])("GIVEN path=%s, matchMethod=%s WHEN assertPathNotExists is called THEN does not throw", (path, matchMethod) => {
		const pathConfig = {
			path,
			matchMethod: () => matchMethod,
		};

		expect(() => assertPathNotExists(pathConfig, emptyMessageConfig)).not.toThrow();
	});

	it.each<[() => string, MatchMethod]>([
		[() => "/non/existent/path", MatchMethod.EXACT],
		[() => "/non/existent/*", MatchMethod.GLOB],
		[() => `${tmpEmptyDir}/*`, MatchMethod.GLOB],
	])(
		"GIVEN path=%s, matchMethod=%s AND message='Path should not exist' WHEN assertPathNotExists is called THEN does not throw",
		(path, matchMethod) => {
			const pathConfig = {
				path,
				matchMethod: () => matchMethod,
			};

			const messageConfig = {
				message: () => "Path should not exist",
			};

			expect(() => assertPathNotExists(pathConfig, messageConfig)).not.toThrow();
		}
	);

	it.each<[() => string, MatchMethod]>([
		[() => tmp.file, MatchMethod.EXACT],
		[() => tmp.dir, MatchMethod.EXACT],
		[() => `${tmp.dir}/*`, MatchMethod.GLOB],
		[() => `${dirname(tmp.dir)}/*`, MatchMethod.GLOB],
		[() => `${dirname(tmp.dir)}/**/*`, MatchMethod.GLOB],
	])(
		"GIVEN existing path WHEN assertPathNotExists is called THEN throws AssertPathNotExistsError",
		async (path, matchMethod) => {
			const pathConfig = {
				path,
				matchMethod: () => matchMethod,
			};

			await expect(() => assertPathNotExists(pathConfig, emptyMessageConfig)).rejects.toThrowError(
				new AssertPathNotExistsError(path())
			);
		}
	);

	it.each<[() => string, MatchMethod]>([
		[() => tmp.file, MatchMethod.EXACT],
		[() => tmp.dir, MatchMethod.EXACT],
		[() => `${tmp.dir}/*`, MatchMethod.GLOB],
		[() => `${dirname(tmp.dir)}/*`, MatchMethod.GLOB],
		[() => `${dirname(tmp.dir)}/**/*`, MatchMethod.GLOB],
	])(
		"GIVEN existing path AND message='Path should not exist' WHEN assertPathNotExists is called THEN throws AssertPathNotExistsError with custom message",
		async (path, matchMethod) => {
			const pathConfig = {
				path,
				matchMethod: () => matchMethod,
			};

			const messageConfig = {
				message: () => "Path should not exist",
			};

			await expect(() => assertPathNotExists(pathConfig, messageConfig)).rejects.toThrowError(
				new AssertPathNotExistsError(path(), "Path should not exist")
			);
		}
	);

	afterAll(async () => {
		await removeTemp(tmp.dir);
		await removeTemp(tmpEmptyDir);
	});
});
