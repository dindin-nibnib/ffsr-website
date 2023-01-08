import "./style.scss";
import "server-only";
import type Picture from "../../models/gallery";
import type Account from "../../models/account";
import { MongoClient, ObjectId } from "mongodb";
import { use } from "react";

const Gallerie = () => {
	const client = new MongoClient(process.env.MONGODB_URI || "");
	const db = client.db("ffsr");
	const collection = db.collection<Picture>("pictures");
	const pictures = use(
		collection.find({}).toArray()
	);

	const getOwnerName = (owner: ObjectId) => {
		return use(
			db.collection<Account>("accounts").findOne({
				_id: owner
			})
		);
	};

	return (
		<main className="galerie">
			<h1>Galerie</h1>
			<p>
				Bienvenue sur la galerie du Furry Fandom Suisse Romand!
			</p>

			<p>
				Vous pouvez retrouver ici les photos de nos événements.
				Si vous souhaitez participer à la galerie, n'hésitez pas à nous contacter!
			</p>

			<div>
				{
					pictures.map((picture) => (
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
					))
				}
			</div>
		</main >
	);
};

export default Gallerie;
