// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Card = styled(Link)`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.25s linear;

  &:hover {
    background: ${({ theme }) => theme.toggleBorder};
  }
`;

const Home = () => {
  return (
    <Container>
      <h1>Welcome to the Frontend Quiz!</h1>
      <p>Pick a subject to get started.</p>
      <Card to="/html">HTML</Card>
      <Card to="/css">CSS</Card>
      <Card to="/javascript">JavaScript</Card>
      <Card to="/accessibility">Accessibility</Card>
    </Container>
  );
};

export default Home;
