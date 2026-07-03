import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Node 26 ships an experimental global `localStorage` that is unavailable
// without `--localstorage-file` and shadows jsdom's implementation. Install a
// deterministic in-memory Web Storage so persisted stores work under test.
class MemoryStorage implements Storage {
	private store = new Map<string, string>();
	get length(): number {
		return this.store.size;
	}
	clear(): void {
		this.store.clear();
	}
	getItem(key: string): string | null {
		return this.store.get(key) ?? null;
	}
	key(index: number): string | null {
		return [...this.store.keys()][index] ?? null;
	}
	removeItem(key: string): void {
		this.store.delete(key);
	}
	setItem(key: string, value: string): void {
		this.store.set(key, String(value));
	}
}

Object.defineProperty(globalThis, "localStorage", {
	value: new MemoryStorage(),
	writable: true,
	configurable: true,
});
Object.defineProperty(globalThis, "sessionStorage", {
	value: new MemoryStorage(),
	writable: true,
	configurable: true,
});

// React Testing Library does not auto-clean when Vitest globals are enabled
// the same way Jest does, so unmount rendered trees between tests.
afterEach(() => {
	cleanup();
});
