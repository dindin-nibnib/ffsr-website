"use client";
import Image from "next/image";
import "./style.scss";
import ffsrIcon from "/assets/ffsr.png";
import Link from "next/link";
import { useState } from "react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [menuOpen, setMenuOpen] = useState(false);
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
					<div className="burger"
						onClick={() => setMenuOpen(!menuOpen)}
					>
						<span />
						<span />
						<span />
					</div>
					<nav
						className={menuOpen ? "open" : ""}
						onClick={() => setMenuOpen(false)}
					>
						<ul>
							<li>
								<Link
									href={"/"}
								>
									Accueil
								</Link>
							</li>
							<li>
								<Link
									href={"/agenda"}
								>
									Agenda
								</Link>
							</li>
							<li>
								<Link
									href={"/about"}
								>
									Qui sommes-nous?
								</Link>
							</li>
							<li>
								<Link
									href={"/contact"}
								>
									Contact
								</Link>
							</li>
						</ul>
					</nav>
				</header>

				{children}

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
		</html >
	);
}
