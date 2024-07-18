import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";

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

  return (
    <div className="App">
      {!selectedCategory ? (
        <div className="category-selection">
          <h1>Select a Quiz Category</h1>
          {quizzes.map((quiz, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(quiz.title)}
            >
              {quiz.title}
            </button>
          ))}
        </div>
      ) : (
        <Quiz quiz={selectedQuiz} />
      )}
    </div>
  );
}

export default QuizForm;
