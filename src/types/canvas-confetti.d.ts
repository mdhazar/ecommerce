// Minimal ambient types for the untyped `canvas-confetti` package — just the
// surface we use (a default-exported function taking a few options).
declare module "canvas-confetti" {
	interface ConfettiOptions {
		particleCount?: number;
		spread?: number;
		startVelocity?: number;
		ticks?: number;
		origin?: { x?: number; y?: number };
		colors?: string[];
		scalar?: number;
		[key: string]: unknown;
	}
	type ConfettiFn = (options?: ConfettiOptions) => Promise<null> | null;
	const confetti: ConfettiFn;
	export default confetti;
}
