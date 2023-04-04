import React from "react";
import styled from "styled-components";
import Ghost from "@/assets/common/Ghost.png";
import Logo from "@/assets/common/Logo.png";
import { theme } from "@/styles/theme";
import { useNavigate, useLocation } from "react-router-dom";
import Toast, { showToast } from "@/components/common/Toast";
import { myPageLoader } from "@/api/routerLoader";
import { requestLogout } from "@/api/auth";

export default function Header() {
  const navigate = useNavigate();
  const uselocation = useLocation();
  const isLogin =
    localStorage.getItem("userId") &&
    localStorage.getItem("accessToken") !== null
      ? true
      : false;
  // const username = localStorage.getItem("username");

  const handleToastClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  const logout = async () => {
    try {
      await requestLogout();
      if (uselocation.pathname === "/") {
        location.reload();
      } else {
        navigate("/");
      }
      handleToastClick("success", "성공적으로 로그아웃 되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  const routeGroupSet = async () => {
    // try {
    //   if (await myPageLoader()) {
    //     navigate("/groupset");
    //   } else {
    //     handleToastClick("error", "올바르지 않은 접근입니다.");
    //     setTimeout(() => {
    //       navigate("/login");
    //     }, 2000);
    //   }
    // } catch (error) {
    //   handleToastClick("error", "로그인 후 이용해주세요.");
    //   console.log(error);
    // }
    if (isLogin) {
      navigate("/groupset");
    } else {
      handleToastClick("error", "로그인 후 이용해주세요.");
    }
  };

  const routeMypage = async () => {
    try {
      if (await myPageLoader()) {
        navigate("/mypage");
      } else {
        handleToastClick("error", "올바르지 않은 접근입니다.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <NavItem onClick={routeGroupSet}>Group Set</NavItem>
        <NavItem onClick={() => navigate("/search")}>Search</NavItem>
        {!isLogin && (
          <NavButton onClick={() => navigate("/login")}>Login</NavButton>
        )}
        {isLogin && (
          <>
            <NavItem onClick={routeMypage}>
              {/* <AccountCircleOutlinedIcon style={{ fontSize: "3rem" }} /> */}
              {/* <span> {username}</span> */}
              Mypage
            </NavItem>
            <NavButton onClick={logout}>Logout</NavButton>
          </>
        )}
      </div>
      <Toast />
    </Container>
  );
}

const Container = styled.div`
  height: 9.5vh;
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0 10rem;
  align-items: center;
  position: sticky;
  /* width: ${(props) => (props.className === "main" ? "" : "")}; */
  top: 0;
  left: 0;
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

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  span {
    margin-left: 0.5rem;
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
