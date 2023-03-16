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
  width: 70%;
  height: 100%;
  background-color: ${theme.colors.container};
  border-radius: 1.5rem;
`;
