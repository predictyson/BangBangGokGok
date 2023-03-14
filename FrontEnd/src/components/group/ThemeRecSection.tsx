import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";

export default function ThemeRecSection({
  userList,
}: {
  userList: GroupSetUer[];
}) {
  return (
    <Container>
      <ResultButton>결가 부기</ResultButton>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  width: 98.5%;
  background-color: ${theme.colors.containerLight};
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultButton = styled.div`
  font-size: 3rem;
  border-radius: 1rem;
  background-color: ${theme.colors.background};
  padding: 1rem 2rem;
  cursor: pointer;
  color: #f3e0e0;

  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
