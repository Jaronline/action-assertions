export const MatchMethod = {
	EXACT: "exact",
	GLOB: "glob",
} as const;

export type MatchMethod = (typeof MatchMethod)[keyof typeof MatchMethod];

export function isMatchMethod(value: string): value is MatchMethod {
	return Object.values(MatchMethod).includes(value as MatchMethod);
}
