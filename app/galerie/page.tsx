import "./style.scss";
import "server-only";
import type Picture from "../../models/gallery";
import { MongoClient } from "mongodb";
import { Suspense, use } from "react";
import PictureElement from "./picture";
import Link from "next/link";

const Gallerie = async () => {
	const client = new MongoClient(process.env.MONGODB_URI || "");
	const db = client.db("ffsr");
	const collection = db.collection<Picture>("pictures");
	const pictures = await (
		collection.find({}, {
			projection: {
				_id: 1,
				date: 1
			},
		}).toArray()
	);

	console.log(pictures);

	return (
		<main className="galerie">
			<h1>Galerie</h1>
			<p>
				Bienvenue sur la galerie du Furry Fandom Suisse Romand!
			</p>

			<p>
				Vous pouvez retrouver ici les photos de nos événements.
				Si vous souhaitez participer à la galerie, n'hésitez pas à nous contacter pour vous inscrire!
			</p>

			<Link href="galerie/poster">
				<button>
					Publier une Image
				</button>
			</Link>
			<div>
				{
					pictures.sort((a, b) => b.date.getTime() - a.date.getTime()).map((picture) => (
						<Suspense fallback={
							<div>
								<span>
									Chargement
									<span className="first">.</span>
									<span className="second">.</span>
									<span className="third">.</span>
								</span>
							</div>
						}>
							<PictureElement key={picture._id.toString()} picId={picture._id} />
						</Suspense>
					))
				}
			</div>
		</main >
	);
};

export default Gallerie;

export const revalidate = 1;
