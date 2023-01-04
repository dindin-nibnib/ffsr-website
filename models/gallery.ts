import type { Binary, ObjectId } from "mongodb";

export default interface Picture {
	_id: ObjectId;
	name: string;
	description: string;
	data: Binary;
	owner: ObjectId;
}
