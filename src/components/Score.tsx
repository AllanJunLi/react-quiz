import { AnswerObject, TOTAL_QUESTIONS } from "../App";
import Card from "react-bootstrap/Card";

export default function Score({
  userAnswers,
  score,
}: {
  userAnswers: AnswerObject[];
  score: number;
}) {
  const finalScore = (score / TOTAL_QUESTIONS) * 100;
  return (
    <div className="mt-3">
      <h3>Game finished, your score is: {finalScore}.</h3>
      <h3>Incorrect questions answered:</h3>
      {userAnswers
        .filter((answer) => !answer.isAnswerCorrect)
        .map((answer) => (
          <Card className="mt-2">
            <Card.Header>{answer.question}</Card.Header>
            <Card.Body>
              <p>Correct answer: {answer.correctAnswer}</p>
              <p>Your answer: {answer.answer}</p>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}
