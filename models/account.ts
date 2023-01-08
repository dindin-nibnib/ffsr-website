import type { ObjectId, Binary } from "mongodb";

export default interface Account {
	username: string;
	password: string; // Base64-digested SHA-256 hash
	displayName: string;
	avatar: Binary;
}
