import { StaticImageData } from "next/image";
import "./style.scss";

import ffchIcon from "/assets/ffch.png";
import ffsrIcon from '/assets/ffsr.png';
import ffsrEventsIcon from '/assets/ffsr-events.jpg';
import furUnitIcon from '/assets/fur-unit.png';

import lilFurmeetsIcon from '/assets/furmeets.jpg';
import shitpostIcon from '/assets/shitpost.jpg';
import furshoppingIcon from '/assets/furshopping.png';
import fursuitcreationIcon from '/assets/fursuitcreation.png';

interface LinkProps {
	name: string;
	url: string;
	icon: StaticImageData;
}


const FFCH: LinkProps[] = [
	{
		name: "Fandom Furry Suisse - Site officiel",
		url: "https://furryfandom.ch",
		icon: ffchIcon
	},
	{
		name: "Fandom Furry Suisse - Discord",
		url: "https://discord.gg/zunXqsH8m8",
		icon: ffchIcon
	}
];

const FFSR: LinkProps[] = [
	{
		name: "FFSR - Groupe Telegram",
		url: "https://t.me/joinchat/Bu5hpdKQn9FmNjI0",
		icon: ffsrIcon
	},
	{
		name: "FFSR - Agenda des Events Telegram",
		url: "https://t.me/FFSR_Event",
		icon: ffsrEventsIcon
	},
	{
		name: "FFSR - Discord",
		url: "https://discord.gg/8bmV2H4ZJY",
		icon: ffsrIcon
	},
	{
		name: "FFSR - Page Facebook",
		url: "https://www.facebook.com/FFSROfficiel",
		icon: ffsrIcon
	},
	{
		name: "FFSR - Groupe Facebook",
		url: "https://www.facebook.com/groups/FurryFandomSuisseRomande",
		icon: ffsrIcon
	},
	{
		name: "FFSR - Barq",
		url: "https://barq.social/c/OaxpSwi",
		icon: ffsrIcon
	}
];

const FurUnit: LinkProps[] = [
	{
		name: "Furry Unit - Groupe Telegram",
		url: "https://t.me/Furry_unit",
		icon: furUnitIcon
	},
	{
		name: "Furry Unit - Discord",
		url: "https://discord.gg/hHpWCYcnpH",
		icon: furUnitIcon
	},
	{
		name: "Furry Unit - Page Facebook",
		url: "https://www.facebook.com/FurryUnit",
		icon: furUnitIcon
	},
	{
		name: "Furry Unit - Groupe Facebook",
		url: "https://www.facebook.com/groups/furryunit",
		icon: furUnitIcon
	},
	{
		name: "Furry Unit - Twitter",
		url: "https://twitter.com/FurryUnit",
		icon: furUnitIcon
	},
	{
		name: "Furry Unit - Barq",
		url: "https://barq.social/c/q60iQ4o",
		icon: furUnitIcon
	}
];

const Affiliates: LinkProps[] = [
	{
		name: "Little Furmeets - Groupe Telegram",
		url: "https://t.me/+6IbcUT-HptBkZjE0",
		icon: lilFurmeetsIcon
	},
	{
		name: "Shitpost - Groupe Telegram",
		url: "https://t.me/+zY74wose42Q1ZmE0",
		icon: shitpostIcon
	},
	{
		name: "FurShopping - Groupe Telegram",
		url: "https://t.me/+Wy7yLDiKiVozZGZk",
		icon: furshoppingIcon
	},
	{
		name: "Fursuit Création - Groupe Telegram",
		url: "https://t.me/+fcLeDUGtIS81NzA0",
		icon: fursuitcreationIcon
	}
];

const Contact = () => {
	return (
		<main className="contact">
			<h1>Contact</h1>
			<p>
				Vous pouvez nous retrouver sur les réseaux sociaux suivants:
			</p>

			<h2>Furry Fandom Suisse</h2>
			<ul>
				{
					FFCH.map((link) => (
						<li key={link.name}>
							<a href
								={link.url}
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={link.icon.src}
									alt={link.name}
								/>
								<span>{link.name}</span>
							</a>
						</li>
					))
				}
			</ul>

			<h2>FFSR - Fandom Furry Suisse Romand</h2>
			<ul>
				{
					FFSR.map((link) => (
						<li key={link.name}>
							<a href
								={link.url}
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={link.icon.src}
									alt={link.name}
								/>
								<span>{link.name}</span>
							</a>
						</li>
					))
				}
			</ul>

			<h2>Furry Unit</h2>
			<ul>
				{
					FurUnit.map((link) => (
						<li key={link.name}>
							<a href
								={link.url}
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={link.icon.src}
									alt={link.name}
								/>
								<span>{link.name}</span>
							</a>
						</li>
					))
				}
			</ul>

			<h2>Affiliés</h2>
			<ul>
				{
					Affiliates.map((link) => (
						<li key={link.name}>
							<a href
								={link.url}
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={link.icon.src}
									alt={link.name}
								/>
								<span>{link.name}</span>
							</a>
						</li>
					))
				}
			</ul>

			<h2>Liens morts</h2>
			<p>
				Si vous trouvez un lien mort, merci de nous le signaler en nous envoyant
				un mail à <a href="mailto:mail@dindin.ch">dindin</a>,
				à <a href="mailto:furryfandomsr@gmail.com">la communauté</a>,
				ou à <a href="mailto:griphass@hotmail.fr">Griphass</a>.
			</p>

		</main >
	);
};

export default Contact;;;;
