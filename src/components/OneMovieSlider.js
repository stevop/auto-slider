import "./OneMovieSlider.css";
import data from "../data";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function OneMovieSlider() {
	const [index, setIndex] = useState(0);

	// index sa nastavi na 0 alebo na index.lenght - 1 ak sa narazi na koniec/zaciatok
	useEffect(() => {
		if (index < 0) {
			setIndex(data.length - 1);
		} else if (index > data.length - 1) {
			setIndex(0);
		}
	}, [index]);

	// po 3s posuvam filmy
	useEffect(() => {
		let interval = setInterval(() => {
			setIndex(index + 1);
		}, 5000);
		// ak kliknem na btn, budu sa stackovat, preto ich treba clearnut
		// ulozil som ho do premennej aby js vedel, kt. ma cleannut (automaticky si vytvara id)
		return () => clearInterval(interval);
	}, [index]);

	return (
		<div className="OneMovieSlider">
			<div className="OneMovieSlider-content">
				{data.map((oneMovie, oneMovieIndex) => {
					const { id, image, title, age, description, tags } = oneMovie;

					let mainClass = "next-slide";

					if (oneMovieIndex === index) {
						mainClass = "active-slide";
					}

					if (
						oneMovieIndex === index - 1 ||
						(index === 0 && oneMovieIndex === data.length - 1)
					) {
						mainClass = "last-slide";
					}

					return (
						<article
							className={mainClass}
							key={id}>
							<img
								src={image}
								alt="movie image"
							/>
							<h2>{title}</h2>
							<p>{description}</p>
							<p>{tags}</p>
							<p>{age}</p>
						</article>
					);
				})}
			</div>
			<button
				type="button"
				onClick={() => setIndex(index - 1)}>
				<FaArrowAltCircleLeft />
			</button>
			<button
				type="button"
				onClick={() => setIndex(index + 1)}>
				<FaArrowAltCircleRight />
			</button>
		</div>
	);
}
