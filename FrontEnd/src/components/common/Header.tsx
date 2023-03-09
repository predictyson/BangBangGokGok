import React from "react";
import styled from "styled-components";
import Ghost from "@/assets/common/Ghost.png";
import Logo from "@/assets/common/Logo.png";
import { height } from "@mui/system";
import { theme } from "@/styles/theme";
export default function Header() {
  return (
    <Container>
      <div className="left-container">
        <img
          src={Ghost}
          alt="ghost"
          style={{ width: "5rem", height: " 7rem" }}
        />
        <img src={Logo} alt="logo" style={{ width: "26rem", height: "3rem" }} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 10.7rem;
  display: flex;
  background-color: ${theme.colors.background};

  .left-container {
    align-items: center;
    justify-content: center;
    border: solid 1px white;
  }
`;
