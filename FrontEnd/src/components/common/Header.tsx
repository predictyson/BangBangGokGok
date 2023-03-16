import React from "react";
import styled from "styled-components";
import Ghost from "@/assets/common/Ghost.png";
import Logo from "@/assets/common/Logo.png";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="left-container">
        <img
          src={Ghost}
          alt="ghost"
          style={{ width: "5rem", height: " 5rem", marginBottom: "0.8rem" }}
        />
        <img
          src={Logo}
          alt="logo"
          style={{ width: "26rem", height: "3rem", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="middle-container"></div>
      <div className="right-container">
        <NavItem onClick={() => navigate("/groupset")}>Group Set</NavItem>
        <NavItem onClick={() => navigate("/search")}>Search</NavItem>
        <NavButton onClick={() => navigate("/login")}>Login</NavButton>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 8.7rem;
  display: flex;
  background-color: ${theme.colors.background};
  padding: 0 10rem;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  width: 87%;
  z-index: 999;
  .left-container {
    width: 27%;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .middle-container {
    width: 45%;
  }
  .right-container {
    width: 28%;
    height: 4.7rem;
    float: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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

const NavButton = styled.div`
  color: ${theme.colors.pink};
  font-size: 1.8rem;
  cursor: pointer;
  border: solid 1px ${theme.colors.pink};
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  transition: transform 0.3s ease-in-out;
  &:hover {
    border: solid 1px white;
    color: white;
    background-color: ${theme.colors.pink};
    transform: scale(1.1);
  }
`;
