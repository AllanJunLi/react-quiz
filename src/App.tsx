import React, { useState } from "react";
import { Difficulty, fetchQuizQuestions, QuestionState } from "./API";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QuestionCard from "./components/QuestionCard";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Score from "./components/Score";
import StartGame from "./components/StartGame";

export type AnswerObject = {
  question: string;
  answer: string;
  isAnswerCorrect: boolean;
  correctAnswer: string;
};

export const TOTAL_QUESTIONS = 5;

function App() {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setUserAnswers([]);
    setScore(0);
    setQuestionNumber(0);
    setLoading(false);
  };

  const checkAnswer = () => {
    // Check if answer is correct
    if (selectedAnswer) {
      const isAnswerCorrect =
        questions[questionNumber].correct_answer === selectedAnswer;
      // Add score if correct
      if (isAnswerCorrect) {
        setScore((prev) => prev + 1);
      }
      // Add answer to userAnswers
      const newUserAnswer = {
        question: questions[questionNumber].question,
        answer: selectedAnswer,
        isAnswerCorrect,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      setUserAnswers((prev) => [...prev, newUserAnswer]);
      setSelectedAnswer("");
    }
  };

  const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    checkAnswer();
    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber < questions.length) {
      setQuestionNumber(nextQuestionNumber);
    } else {
      setGameOver(true);
    }
  };

  const selectAnswer = (e: any) => {
    setSelectedAnswer(e.target.innerText);
  };

  return (
    <Container>
      <div>
        <h1 className="mt-5">React Quiz Game</h1>

        {gameOver && <StartGame startGame={startTrivia}></StartGame>}

        {loading && <p>Loading questions ...</p>}

        {!gameOver && !loading && (
          <QuestionCard
            question={questions[questionNumber]}
            questionNumber={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            selectAnswer={selectAnswer}
          ></QuestionCard>
        )}

        {!gameOver && selectedAnswer && (
          <Button className="mt-5" onClick={nextQuestion}>
            {userAnswers.length === TOTAL_QUESTIONS - 1 ? "Finish" : "Next"}
          </Button>
        )}

        {gameOver && userAnswers.length === TOTAL_QUESTIONS && (
          <Score userAnswers={userAnswers} score={score}></Score>
        )}
      </div>
    </Container>
  );
}

export default App;
