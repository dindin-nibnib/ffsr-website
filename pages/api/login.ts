import { NextApiHandler } from "next";
import { MongoClient } from "mongodb";
import type Account from "../../models/account";

const handler: NextApiHandler = async (req, res) => {
	if (req.method !== "POST") {
		res.status(405).json({ message: "Method not allowed" });
		return;
	}

	const { username, password } = req.body;

	const client = new MongoClient(process.env.MONGODB_URI || "");
	await client.connect();
	const db = client.db("ffsr");
	const collection = db.collection<Account>("accounts");

	const account = await collection.findOne({ username, password });

	if (!account) {
		res.status(401).json({ message: "Invalid credentials" });
		return;
	} else {
		res.status(200).json({
			message: "Logged in",
			id: account._id,
		});
	}
};

export default handler;
