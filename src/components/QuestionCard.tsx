import ListGroup from "react-bootstrap/ListGroup";
import { QuestionState } from "../API";

type QuestionCardPops = {
  selectAnswer: any;
  question: QuestionState;
  questionNumber: number;
  totalQuestions: number;
};

export default function QuestionCard({
  question,
  selectAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardPops) {
  return (
    <div>
      <h3 className="mt-3">
        {questionNumber} / {totalQuestions}
      </h3>
      <h4 className="my-3">{question.question}</h4>
      <ListGroup>
        {question.answers.map((answer) => (
          <ListGroup.Item action key={answer} onClick={selectAnswer}>
            {answer}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
