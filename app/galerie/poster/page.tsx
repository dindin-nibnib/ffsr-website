'use client';
import Cookies from "universal-cookie";
import { redirect, useRouter } from "next/navigation";
import { FormEventHandler, use, useState, useEffect } from 'react';


const Poster = () => {
	const Cookie = new Cookies();
	const router = useRouter();
	if (!Cookie.get("token")) {
		if (typeof window !== "undefined")
			router.push("/login");
		else
			redirect("/login");
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

		const res = await fetch("/api/postimage", {
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

		if (res.status === 200) {
			alert("La publication s'est terminée correctement!");
			router.push("/galerie");
			return;
		}

		if (res.status === 401) {
			alert("L'identification a échoué. Veuillez vous reconnecter.");
			router.push("/login");
			return;
		}

		if (res.status === 500) {
			alert("Une erreur s'est produite. Veuillez rééssayer plus tard.");
			return;
		}
	};

	return (
		<main className="galerie-poster">
			<h1>Poster</h1>

			<p>
				Vous pouvez utiliser ce formulaire pour publier une image dans la gallerie!
			</p>

			<p>
				Les administrateurs se réservent le droit de supprimer une image si jugée inappropriée.
			</p>

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
