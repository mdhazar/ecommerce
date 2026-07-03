// Central place for the auth token. Kept out of React state so the axios
// interceptor can read it synchronously on every request. A session-only
// login (no "remember me") keeps the token in memory; "remember me" also
// persists it to localStorage so it survives a reload.

const TOKEN_KEY = "token";
let memoryToken: string | null = null;

const hasStorage = (): boolean => typeof localStorage !== "undefined";

export function getToken(): string | null {
	if (memoryToken) return memoryToken;
	if (!hasStorage()) return null;
	return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string, persist = true): void {
	memoryToken = token;
	if (persist && hasStorage()) {
		localStorage.setItem(TOKEN_KEY, token);
	}
}

export function clearToken(): void {
	memoryToken = null;
	if (hasStorage()) {
		localStorage.removeItem(TOKEN_KEY);
	}
}
