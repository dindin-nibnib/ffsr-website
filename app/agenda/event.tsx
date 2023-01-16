"use client";
import type { WithId } from "mongodb";
import type { Event } from "../../models/event";
import { useState } from "react";

const Event = ({ eventStr }: { eventStr: string; }) => {
	const event = (JSON.parse(eventStr) as WithId<Event>);
	event.date = new Date(event.date);
	const [opened, setOpened] = useState(false);

	Date.prototype.toDateString = function () {
		return this.toLocaleDateString("fr-CH", {
			year: "numeric",
			month: "long",
			day: "numeric"
		});
	};

	console.log(event.date);

	return (
		<li
			key={event._id.toString()}
			className={opened ? "open" : ""}
			onClick={() => setOpened(!opened)}
		>
			<h2>{event.name}</h2>
			<p>{event.description}</p>
			<p>{event.date.toDateString()}</p>
		</li>
	);
};

export default Event;
