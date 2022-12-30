import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { MongoClient } from "mongodb";

export const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
	const client = new MongoClient(process.env.MONGODB_URI || "");
	const db = client.db("ffsr");
	const collection = db.collection<Event>("events");
	const comingEvents = (await collection.find({
		date: {
			$gt: new Date(Date.now())
		}
	}).toArray()).sort((a, b) => a.date.getTime() - b.date.getTime());

	res.status(200).json(comingEvents);
};
