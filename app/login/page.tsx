"use client";

import { useRouter } from "next/navigation";

const login = async (data: any) => {
	console.log(data);
};

const Login = () => {
	const { push } = useRouter();

	const onSubmit = async (data: any) => {
		try {
			await login(data);
			push('/dashboard');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<main className="login">
			<form onSubmit={onSubmit}>
				<input name="email" type="email" />
				<input name="password" type="password" />
				<button type="submit">Login</button>
			</form>
		</main>
	);
};

export default Login;
