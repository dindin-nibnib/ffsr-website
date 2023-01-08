"use client";

import { FormEventHandler, use, useState } from "react";
import "./style.scss";
import Crypto from "crypto";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const login = async (username: string, password: string) => {
	let hash = Crypto.createHash("sha256").update(password || "").digest("hex");
	let res = await fetch("/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: username,
			password: hash
		})
	});

	console.log(res);
	if (res.ok) {
		//alert("Connexion réussie!");
		cookies.set("token", (await res.json()).id + hash);
		console.log(document.cookie);
		console.log("aasdf");
		window.location.href = "/galerie";
	} else {
		alert(use(res.json()).message || res.statusText || res.status.toString());
	}
};


const Login = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit: FormEventHandler = (event) => {
		event.preventDefault();
		login(userName, password);
	};

	return (
		<main className="login">
			<form onSubmit={onSubmit}>
				<ul>
					<li>
						<label>Nom d'utilisateur</label>
						<input name="username" onChange={(v) => (setUserName(v.target.value))} />
					</li>

					<li>
						<label>Mot de passe</label>
						<input
							name="password"
							type="password"
							onChange={(v) => setPassword(v.target.value)}
						/>
					</li>

					<li>
						<button type="submit">Login</button>
					</li>
				</ul>
			</form>
		</main>
	);
};

export default Login;
