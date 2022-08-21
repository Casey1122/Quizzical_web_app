import React from "react";
import tick from "../images/circle-check-solid.png";
import xmark from "../images/circle-xmark-solid.png";

export default function Question(props) {
	const correctIcon = <img src={tick} width="35px" />;
	const incorrectIcon = <img src={xmark} width="35px" />;

	let result;

	const { questionID, question, answers, toggleSelected, quizCompleted } =
		props;

	return (
		<article>
			<div className="question-holder">
				<h4 className="question">{decodeURIComponent(question)}</h4>
				<div className={quizCompleted ? "" : "hide"}>
					{answers.map((answer) => {
						if (answer.selected && answer.isCorrect) {
							result = true;
						}
					})}
					{result ? correctIcon : incorrectIcon}
				</div>
			</div>

			<div className="answers-holder">
				{props.answers.map((item) => {
					const { answerID, text, selected } = item;
					return (
						<button
							className={`answer-btn ${selected ? "answer-selected" : ""}`}
							onClick={() => toggleSelected(answerID, questionID, selected)}
						>
							{decodeURIComponent(text)}
						</button>
					);
				})}
			</div>
		</article>
	);
}
