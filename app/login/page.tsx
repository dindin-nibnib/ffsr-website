"use client";

import { useRouter } from "next/navigation";

const Login = () => {
	const { push } = useRouter();

	const onSubmit = async (data) => {
		try {
			await login(data);
			push('/dashboard');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<input name="email" type="email" />
			<input name="password" type="password" />
			<button type="submit">Login</button>
		</form>
	);
};
