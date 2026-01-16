import { assertPathExists } from "../src/assertions";
import { AssertPathExistsError } from "../src/errors/assert-path-exists";
import { mktemp, rmtemp } from "./paths";

describe("Assert Path Exists Tests", () => {
	const emptyMessageConfig = {
		message: () => "",
	};
	let tmp: { file: string; dir: string } = { file: "", dir: "" };

	beforeAll(async () => {
		tmp = await mktemp();
	});

	it.each([() => tmp.file, () => tmp.dir])(
		"GIVEN existing path WHEN assertPathExists is called THEN does not throw",
		path => {
			const pathConfig = {
				path,
			};

			expect(() => assertPathExists(pathConfig, emptyMessageConfig)).not.toThrow();
		}
	);

	it.each([() => tmp.file, () => tmp.dir])(
		"GIVEN existing path AND message='Path should exist' WHEN assertPathExists is called THEN does not throw",
		path => {
			const pathConfig = {
				path,
			};

			const messageConfig = {
				message: () => "Path should exist",
			};

			expect(() => assertPathExists(pathConfig, messageConfig)).not.toThrow();
		}
	);

	it("GIVEN non-existent path WHEN assertPathExists is called THEN throws AssertPathExistsError", async () => {
		const pathConfig = {
			path: () => "/non/existent/path",
		};

		await expect(() => assertPathExists(pathConfig, emptyMessageConfig)).rejects.toThrowError(
			new AssertPathExistsError("/non/existent/path")
		);
	});

	it("GIVEN non-existent path AND message='Path should exist' WHEN assertPathExists is called THEN throws AssertPathExistsError with custom message", async () => {
		const pathConfig = {
			path: () => "/non/existent/path",
		};

		const messageConfig = {
			message: () => "Path should exist",
		};

		await expect(() => assertPathExists(pathConfig, messageConfig)).rejects.toThrowError(
			new AssertPathExistsError("/non/existent/path", "Path should exist")
		);
	});

	afterAll(async () => {
		await rmtemp(tmp.dir);
	});
});
