import { assertPathNotExists } from "../src/assertions";
import { AssertPathNotExistsError } from "../src/errors/assert-path-not-exists";
import { mktemp, rmtemp } from "./paths";

describe("Assert Path Not Exists Tests", () => {
	const emptyMessageConfig = {
		message: () => "",
	};
	let tmp: { file: string; dir: string } = { file: "", dir: "" };

	beforeAll(async () => {
		tmp = await mktemp();
	});

	it("GIVEN non-existent path WHEN assertPathNotExists is called THEN does not throw", () => {
		const pathConfig = {
			path: () => "/non/existent/path",
		};

		expect(() => assertPathNotExists(pathConfig, emptyMessageConfig)).not.toThrow();
	});

	it("GIVEN non-existent path AND message='Path should not exist' WHEN assertPathNotExists is called THEN does not throw", () => {
		const pathConfig = {
			path: () => "/non/existent/path",
		};

		const messageConfig = {
			message: () => "Path should not exist",
		};

		expect(() => assertPathNotExists(pathConfig, messageConfig)).not.toThrow();
	});

	it.each([() => tmp.file, () => tmp.dir])(
		"GIVEN existing path WHEN assertPathNotExists is called THEN throws AssertPathNotExistsError",
		async path => {
			const pathConfig = {
				path,
			};

			await expect(() => assertPathNotExists(pathConfig, emptyMessageConfig)).rejects.toThrowError(
				new AssertPathNotExistsError(path())
			);
		}
	);

	it.each([() => tmp.file, () => tmp.dir])(
		"GIVEN existing path AND message='Path should not exist' WHEN assertPathNotExists is called THEN throws AssertPathNotExistsError with custom message",
		async path => {
			const pathConfig = {
				path,
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
		await rmtemp(tmp.dir);
	});
});
