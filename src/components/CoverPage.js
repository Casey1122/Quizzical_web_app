import React from "react";
import beige from "../images/beige_shape.svg";
import navy from "../images/blue_shape.svg";

const beigeShape = <img className="beige" src={beige} draggable="false" />;
const navyShape = <img className="navy" src={navy} draggable="false" />;

export default function Cover(props) {
	// console.log(props);
	return (
		<div className="container cover">
			<h1>Quizzical</h1>
			<p>Try out this app to test your knowledge!</p>
			<button className="btn" onClick={props.toggleStartQuiz}>
				Start Quiz
			</button>
			{beigeShape}
			{navyShape}
		</div>
	);
}
