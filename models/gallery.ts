import type { Binary, ObjectId } from "mongodb";

export default interface Picture {
	name: string;
	description: string;
	data: Binary;
	owner: ObjectId;
	date: Date;
}
