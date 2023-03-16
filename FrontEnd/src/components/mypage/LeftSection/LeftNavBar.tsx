import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";

export default function LeftNavBar() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div>정개미, 방탈출 초보</div>
      <div>
        <NavItem onClick={() => navigate("profile")}>Group Set</NavItem>
        <NavItem onClick={() => navigate("reviews")}>Search</NavItem>
        <NavItem onClick={() => navigate("likes")}>마이페이지</NavItem>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${theme.colors.container};
  border-radius: 1.5rem;
`;

const NavItem = styled.div`
  color: ${theme.colors.pink};
  font-size: 1.8rem;
  cursor: pointer;
  .button {
    border: solid 1px ${theme.colors.pink};
    border-radius: 10;
  }
`;
