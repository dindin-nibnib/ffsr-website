import "./style.scss";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head />
			<body>
				<header>

				</header>

				<main>
					{children}
				</main>

				<footer>

				</footer>
			</body>
		</html>
	);
}
