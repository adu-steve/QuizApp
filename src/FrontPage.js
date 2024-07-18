import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";
import Quiz from "./components/Quiz";
import data from "./data.json";

const lightTheme = {
  background: "#f9f9f9",
  color: "#333",
  cardBackground: "#fff",
  cardHover: "#e0e0e0",
  buttonBackground: "#007bff",
  buttonHover: "#0056b3",
};

const darkTheme = {
  background: "#333",
  color: "#f9f9f9",
  cardBackground: "#444",
  cardHover: "#555",
  buttonBackground: "#007bff",
  buttonHover: "#0056b3",
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  transition: all 0.3s;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 0;
`;

const QuizTitle = styled.span`
  color: ${(props) => props.theme.buttonBackground};
  font-weight: bold;
`;

const CardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`;

const Card = styled.button`
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.color};
  padding: 20px;
  margin: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  flex: 1;

  &:hover {
    background-color: ${(props) => props.theme.cardHover};
  }
`;

const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.buttonBackground};
  color: white;
  padding: 5px 10px; /* Reduced padding */
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 14px; /* Reduced font size */

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Frontend = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [theme, setTheme] = useState("dark");

  const handleQuizSelect = (quizIndex) => {
    setSelectedQuiz(data.quizzes[quizIndex]);
  };

  const handleReturn = () => {
    setSelectedQuiz(null);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <AppContainer>
        <ThemeToggle onClick={toggleTheme}>
          {theme === "dark" ? <FaSun /> : <FaMoon />}
          <span style={{ marginLeft: "10px" }}>
            Toggle {theme === "dark" ? "Light" : "Dark"} Theme
          </span>
        </ThemeToggle>
        {selectedQuiz ? (
          <Quiz quiz={selectedQuiz} theme={theme} onReturn={handleReturn} />
        ) : (
          <MainContent>
            <TitleContainer>
              <Header>
                <Title>
                  Welcome to the <QuizTitle>Frontend Quiz!</QuizTitle>
                </Title>
              </Header>
            </TitleContainer>
            <CardContainer>
              <h3>Pick a subject to get started.</h3>
              <Cards>
                {data.quizzes.map((quiz, index) => (
                  <Card key={index} onClick={() => handleQuizSelect(index)}>
                    {quiz.title}
                  </Card>
                ))}
              </Cards>
            </CardContainer>
          </MainContent>
        )}
      </AppContainer>
    </ThemeProvider>
  );
};

export default Frontend;
