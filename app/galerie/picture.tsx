import { MongoClient, ObjectId } from "mongodb";
import { use } from "react";
import "server-only";
import type Picture from "../../models/gallery";
import type Account from "../../models/account";

const Picture = ({ id }: { id: ObjectId; }) => {
	const client = new MongoClient(process.env.MONGODB_URI || "");
	const db = client.db("ffsr");
	const collection = db.collection<Picture>("pictures");
	const picture = use(
		collection.findOne({
			_id: {
				$eq: id
			}
		})
	);

	if (!picture) {
		return null;
	}

	const getOwnerName = (owner: ObjectId) => {
		return use(
			db.collection<Account>("accounts").findOne({
				_id: owner
			})
		);
	};

	return (
		<picture>
			<img
				src={`data:image/png;base64,${picture.data.buffer.toString("base64")}`}
				alt={picture.name}
			/>
			<figcaption>
				{picture.description} - {
					getOwnerName(picture.owner)?.displayName
				}
			</figcaption>
		</picture>
	);
};

export default Picture;
