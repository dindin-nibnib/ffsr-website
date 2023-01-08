'use client';
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { FormEventHandler, use, useState, useEffect } from 'react';


const Poster = () => {
	const Cookie = new Cookies();
	const router = useRouter();
	if (!Cookie.get("token") && typeof window !== "undefined") {
		router.push("/login");
	}

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState<File>();
	const [imageData, setImageData] = useState<string>("");

	useEffect(() => {
		(async () => {
			setImageData(Buffer.from((await image?.arrayBuffer()) || new ArrayBuffer(0)).toString("base64"));
		})();
	}, [image]);


	const handleSubmit: FormEventHandler = async (event) => {
		event.preventDefault();

		await fetch("/api/postimage", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title: title,
				description: description,
				image: imageData,
				token: Cookie.get("token")
			})
		});
	};

	return (
		<main className="galerie-poster">
			<h1>Poster</h1>

			<form
				onSubmit={handleSubmit}
			>
				<ul>
					<li>
						<label>Titre</label>
						<input
							name="title"
							onChange={(event) => setTitle(event.target.value)}
						/>
					</li>

					<li>
						<label>Description</label>
						<input
							name="description"
							onChange={(event) => setDescription(event.target.value)}
						/>
					</li>

					<li>
						<label>Image</label>
						<input
							name="image"
							type="file"
							onChange={(event) => setImage((event.target.files || [])[0])}
						/>
						<img src={`data:image/png;base64,${imageData}`} />
					</li>

					<li>
						<button type="submit">Poster</button>
					</li>
				</ul>
			</form>
		</main >
	);
};

export default Poster;
