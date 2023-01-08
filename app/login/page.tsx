"use client";

import { FormEventHandler, use } from "react";
import "./style.scss";
import Crypto from "crypto";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const login = async (username: HTMLInputElement | null, password: HTMLInputElement | null) => {
	let hash = Crypto.createHash("sha256").update(password?.value || "").digest("hex");
	let res = await fetch("/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: username?.value,
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

const onSubmit: FormEventHandler = (event) => {
	event.preventDefault();
	const children = event.currentTarget.children;
	login(children.namedItem("username") as HTMLInputElement | null,
		children.namedItem("password") as HTMLInputElement | null);
};

const Login = () => {


	return (
		<main className="login">
			<form onSubmit={onSubmit}>
				<ul>
					<li>
						<label>Nom d'utilisateur</label>
						<input name="username" />
					</li>

					<li>
						<label>Mot de passe</label>
						<input name="password" type="password" />
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
