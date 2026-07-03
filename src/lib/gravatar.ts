import md5 from "md5";

/** Build a Gravatar avatar URL for an email address. */
export function gravatarUrl(email: string): string {
	const hash = md5(email.trim().toLowerCase());
	return `https://www.gravatar.com/avatar/${hash}`;
}
