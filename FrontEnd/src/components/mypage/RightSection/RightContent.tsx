import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Outlet } from "react-router-dom";

export default function RightContent() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 77%;
  height: 100%;
  padding: 2.5rem;
  background-color: ${theme.colors.container};
  border-radius: 1.5rem;
  @media (max-height: 800px) {
    padding: 1.5rem;
  }
`;
