import { InsertOneModel } from "mongodb";

export interface Event {
	_id: string;
	name: string;
	description: string;
	date: Date;
}

export const eventModel: InsertOneModel<Event> = {
	document: {
		name: "FurMeet November 2019",
		description: "The furmeet of November 2019",
		date: new Date("2019-11-01"),
	}
};
