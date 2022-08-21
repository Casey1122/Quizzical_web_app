import React, { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import beige from "../images/beige_shape.svg";
import navy from "../images/blue_shape.svg";

const beigeShape = <img className="beige" src={beige} draggable="false" />;
const navyShape = <img className="navy" src={navy} draggable="false" />;

export default function QuizPage() {
	const [quizCompleted, setQuizCompleted] = useState(false);
	const [newGame, setNewGame] = useState(false);
	const [questionsData, setQuestionsData] = useState([]);
	const [score, setScore] = useState(0);

	useEffect(() => {
		getQuestionsData();
		setQuizCompleted(false);
	}, [newGame]);

	/* ---------- 	HELPER FUNCTION   ----------  */

	async function getQuestionsData() {
		const response = await fetch(
			"https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986"
		);
		const data = await response.json();

		const results = data.results.map((result) => {
			const answers = result.incorrect_answers.map((answer) =>
				structuredQuestions(answer, false)
			);

			answers.push(structuredQuestions(result.correct_answer, true));
			answers.sort(() => 0.5 - Math.random());

			return {
				questionID: nanoid(),
				question: result.question,
				answers: answers,
			};
		});
		setQuestionsData(results);
	}

	function structuredQuestions(answer, isCorrect) {
		return {
			answerID: nanoid(),
			text: answer,
			showAnswer: false,
			isCorrect: isCorrect,
			selected: false,
		};
	}

	function toggleSelected(answerID, questionID, selected) {
		if (quizCompleted) return;

		setQuestionsData((prevQuestionsData) => {
			return prevQuestionsData.map((question) => {
				return question.questionID !== questionID
					? { ...question }
					: {
							...question,
							answers: question.answers.map((answer) => {
								return answer.answerID !== answerID
									? { ...answer, selected: false }
									: { ...answer, selected: true };
							}),
					  };
			});
		});
	}

	function checkAnswer() {
		setQuizCompleted(true);
		questionsData.map((question) => {
			return question.answers.map((answer) => {
				if (answer.selected && answer.isCorrect) {
					setScore((prev) => prev + 1);
				}
			});
		});
	}

	function restart() {
		setNewGame(true);
		setScore(0);
		setQuizCompleted(false);
		getQuestionsData();
	}

	/* ---------- 	CREATE PAGE ELEMENT   ----------  */

	const quizElement = questionsData.map((questionData) => {
		const { questionID, question, answers } = questionData;
		return (
			<Question
				questionID={questionID}
				question={question}
				answers={answers}
				toggleSelected={toggleSelected}
				quizCompleted={quizCompleted}
			/>
		);
	});

	const checkAnswerBtn = (
		<button className="btn" onClick={checkAnswer}>
			Check Answer
		</button>
	);
	const restartBtn = (
		<button className="btn" onClick={restart}>
			Restart
		</button>
	);

	/* ---------- 	RENDER PAGE   ----------  */

	return (
		<div className="container flex-container">
			<div>
				{quizElement}
				{quizCompleted && (
					<p className="result">
						You got {score} out of {questionsData.length}!
					</p>
				)}
			</div>
			<div className="btn-holder">
				{quizCompleted ? restartBtn : checkAnswerBtn}
			</div>

			{beigeShape}
			{navyShape}
		</div>
	);
}
