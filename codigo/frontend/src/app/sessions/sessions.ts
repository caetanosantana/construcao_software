import  db  from "./db.js";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export function generateSessionToken(): string { 
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: number): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await db.execute(
		"INSERT INTO user_session (id, user_id, expires_at) VALUES ($1, $2, $3)",
		[
			session.id,
			session.userId,
			session.expiresAt
		]
		
	);
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const row = await db.queryOne(
		"SELECT user_session.id, user_session.user_id, user_session.expires_at, app_user.id FROM user_session INNER JOIN user ON app_user.id = user_session.user_id WHERE id = $1",
		[sessionId]
	);
	if (row === null) {
		return { session: null, user: null };
	}
	const session: Session = {
		id: row[0],
		userId: row[1],
		expiresAt: row[2]
	};
	const user: User = {
		id: row[3]
	};
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.execute("DELETE FROM user_session WHERE id = $1", [session.id]);
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db.execute(
			"UPDATE user_session SET expires_at = $1 WHERE id = $2",
			[
				session.expiresAt,
				session.id
			]
		);
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.execute("DELETE FROM user_session WHERE id = $1", [sessionId]);
}

export async function invalidateAllSessions(userId: number): Promise<void> {
	await db.execute("DELETE FROM user_session WHERE user_id = $1", [userId]);
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

export interface Session {
	id: string;
	userId: number;
	expiresAt: Date;
}

export interface User {
	id: number;
}
