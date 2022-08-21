import React, { useEffect, useState } from "react";
import QuizPage from "./components/QuizPage";
import CoverPage from "./components/CoverPage";

export default function App() {
	const [startQuiz, setStartQuiz] = useState(false);

	function toggleStartQuiz() {
		setStartQuiz((prev) => !prev);
	}

	return (
		<main>
			{!startQuiz ? (
				<CoverPage toggleStartQuiz={toggleStartQuiz} />
			) : (
				<QuizPage />
			)}
		</main>
	);
}
