import "server-only";
import { MongoClient } from "mongodb";
import { Event } from "../../models/event";

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
			<ul>
				{
					comingEvents.map((event) => (
						<li key={event._id.toString()}>
							<h1>{event.name}</h1>
							<p>{event.description}</p>
							<p>{event.date.toString()}</p>
						</li>
					))
				}
			</ul>
		</main>
	);
};

export default Agenda;
