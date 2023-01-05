import "./style.scss";
import "server-only";
import { MongoClient } from "mongodb";
import { Event } from "../../models/event";
import EventElement from "./event";

const Agenda = async () => {
	const client = new MongoClient(process.env.MONGODB_URI || "");
	const db = client.db("ffsr");
	const collection = db.collection<Event>("events");
	const comingEvents = (await collection.find({
		date: {
			$gt: new Date(Date.now())
		}
	}).toArray()).sort((a, b) => a.date.getTime() - b.date.getTime());

	return (
		<main className="agenda">
			<h1>Agenda</h1>
			<p>
				Cette page recense les événements à venir en relation avec le furry fandom suisse romand!
			</p>
			<p>
				Il y a actuellement {comingEvents.length} événements à venir:
			</p>
			<ul>
				{
					comingEvents.map((event) => (
						<EventElement
							event={event}
						/>
					))
				}
			</ul>
		</main>
	);
};

export default Agenda;
