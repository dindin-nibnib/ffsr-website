import { Binary, MongoClient, ObjectId } from "mongodb";
import { NextApiHandler } from "next";
import Account from "../../models/account";
import Picture from "../../models/gallery";

const handler: NextApiHandler = async (req, res) => {
	if (req.method !== "POST") {
		res.status(405).json({ message: "Method not allowed" });
		return;
	}

	const { token, image, title, description }: { [index: string]: string; } = req.body;

	const client = new MongoClient(process.env.MONGODB_URI || "");
	await client.connect();
	const db = client.db("ffsr");
	const collection = db.collection<Account>("accounts");

	const account = await collection.findOne({
		_id: {
			$eq: ObjectId.createFromHexString(token.slice(0, token.length - 64)),
		}
	});

	if (!account) {
		res.status(401).json({ message: "Account not found" });
		return;
	}

	if (account.password !== token.slice(token.length - 64, token.length)) {
		res.status(401).json({ message: "Invalid token" });
		return;
	}

	const imageCollection = db.collection<Picture>("pictures");

	const picture = await imageCollection.insertOne({
		data: new Binary(Buffer.from(image, "base64")),
		name: title,
		description,
		date: new Date(),
		owner: account._id,
	});

	if (picture.acknowledged === false) {
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(200).json({ message: "Image uploaded", ok: true });
};

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '8mb' // Set desired value here
		}
	}
};

export default handler;
