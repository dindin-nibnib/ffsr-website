"use client";
import type { WithId } from "mongodb";
import type { Event } from "../../models/event";
import { useState } from "react";

const Event = ({ event }: { event: WithId<Event>; }) => {
	const [opened, setOpened] = useState(false);

	return (
		<li
			key={event._id}
			className={opened ? "open" : ""}
			onClick={() => setOpened(!opened)}
		>
			<h2>{event.name}</h2>
			<p>{event.description}</p>
			<p>{event.date.toString()}</p>
		</li>
	);
};

export default Event;
