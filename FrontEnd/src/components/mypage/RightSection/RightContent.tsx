import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function RightContent() {
  return (
    <Wrapper>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid ratione
      nostrum numquam laboriosam eligendi veniam, modi amet quos expedita
      excepturi odit, recusandae itaque aspernatur dolorum in quibusdam? Quod,
      ad obcaecati.
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 70%;
  height: 100%;
  background-color: ${theme.colors.container};
  border-radius: 1.5rem;
`;
