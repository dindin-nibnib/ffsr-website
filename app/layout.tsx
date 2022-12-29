import Image from "next/image";
import "./style.scss";
import ffsrIcon from "/assets/ffsr.png";
import Link from "next/link";

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
					<Link
						href={"/"}
					>
						<Image
							src={ffsrIcon}
							alt="Accueil"
						/>
						<span>
							Furry Fandom Suisse Romand
						</span>
					</Link>
					<nav>
						<ul>
							<li>
								<Link
									href={"/"}
								>
									Accueil
								</Link>
							</li>
						</ul>
					</nav>
				</header>

				<main>
					{children}
				</main>

				<footer>
					<p>
						&copy; 2021 Furry Fandom Suisse Romand
					</p>
					<p>
						Designed by <a href="https://dindin.ch">Dindin</a>
					</p>
					<p>
						Build with <a href="https://nextjs.org">Next.js</a>
					</p>
					<p>
						Powered by <a href="https://vercel.com">Vercel</a>
					</p>
				</footer>
			</body>
		</html>
	);
}
