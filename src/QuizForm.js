import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import styled from "styled-components";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaUniversalAccess,
} from "react-icons/fa";

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  font-size: 1.2em;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  svg {
    margin-right: 10px;
  }
`;

function QuizForm() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setQuizzes(data.quizzes))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const selectedQuiz = quizzes.find((quiz) => quiz.title === selectedCategory);

  const getIcon = (title) => {
    switch (title) {
      case "HTML":
        return <FaHtml5 />;
      case "CSS":
        return <FaCss3Alt />;
      case "JavaScript":
        return <FaJsSquare />;
      case "Accessibility":
        return <FaUniversalAccess />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {!selectedCategory ? (
        <div className="category-selection">
          <h1>Select a Quiz Category</h1>
          {quizzes.map((quiz, index) => (
            <CategoryButton
              key={index}
              onClick={() => handleCategorySelect(quiz.title)}
            >
              {getIcon(quiz.title)} {quiz.title}
            </CategoryButton>
          ))}
        </div>
      ) : (
        <Quiz quiz={selectedQuiz} />
      )}
    </div>
  );
}

export default QuizForm;
