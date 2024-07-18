import React, { useState } from "react";
import styled from "styled-components";

const QuizContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  background-color: ${(props) => (props.theme === "dark" ? "#333" : "#f9f9f9")};
  color: ${(props) => (props.theme === "dark" ? "#f9f9f9" : "#333")};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionButton = styled.button`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 5px;
  transition: border 0.3s;
  background-color: ${(props) => (props.selected ? "#e0e0e0" : "white")};
  border: ${(props) =>
    props.correct
      ? "2px solid #28a745"
      : props.wrong
      ? "2px solid #dc3545"
      : "1px solid #ddd"};

  &:hover {
    background-color: ${(props) => (props.selected ? "#d6d6d6" : "#f0f0f0")};
  }
`;

const CorrectAnswerText = styled.p`
  margin-top: 10px;
  color: #28a745;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  margin-top: 10px;
  color: #dc3545;
  font-weight: bold;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuizCompleted = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const QuestionNumber = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
`;

const ReturnButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const Quiz = ({ quiz, theme, onReturn }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setErrorMessage("Please give an answer");
    } else {
      setShowResult(true);
      if (selectedAnswer === currentQuestion.answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    setShowResult(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setErrorMessage("");
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <QuizContainer theme={theme}>
      <h2>{quiz.title}</h2>
      {currentQuestion ? (
        <QuestionContainer>
          <QuestionNumber>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </QuestionNumber>
          <h3>{currentQuestion.question}</h3>
          <OptionsContainer>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = showResult && option === currentQuestion.answer;
              const isWrong =
                showResult && isSelected && option !== currentQuestion.answer;

              return (
                <OptionButton
                  key={index}
                  selected={isSelected}
                  correct={isCorrect}
                  wrong={isWrong}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                >
                  {option}
                </OptionButton>
              );
            })}
          </OptionsContainer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {showResult && selectedAnswer !== currentQuestion.answer && (
            <CorrectAnswerText>
              Correct answer: {currentQuestion.answer}
            </CorrectAnswerText>
          )}
          {showResult ? (
            <SubmitButton onClick={handleNextQuestion}>
              Next Question
            </SubmitButton>
          ) : (
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          )}
        </QuestionContainer>
      ) : (
        <QuizCompleted>
          <h3>You've completed the quiz!</h3>
          <p>
            Your score: {score} out of {quiz.questions.length}
          </p>
          <ReturnButton onClick={onReturn}>Return to Quiz Options</ReturnButton>
        </QuizCompleted>
      )}
    </QuizContainer>
  );
};

export default Quiz;
