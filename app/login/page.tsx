"use client";

import { FormEventHandler, use } from "react";
import "./style.scss";
import Crypto from "crypto";

const login = async (username: HTMLInputElement | null, password: HTMLInputElement | null) => {
	let res = await fetch("/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: username?.value,
			password: Crypto.createHash("sha256").update(password?.value || "").digest("hex")
		})
	});

	console.log(res);
	if (res.ok) {
		alert("Connexion réussie!");
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
				<input name="username" />
				<input name="password" type="password" />
				<button type="submit">Login</button>
			</form>
		</main>
	);
};

export default Login;
