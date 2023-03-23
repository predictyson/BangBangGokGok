import { theme } from "@/styles/theme";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { IThemeData } from "types/slider";
export default function ThemeRecSection({
  userList,
}: {
  userList: GroupSetUer[];
}) {
  const [recTheme, setRectTheme] = useState<IThemeData[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  useEffect(() => {
    if (isWaiting) {
      setTimeout(() => {
        setIsShow(true);
        setIsWaiting(false);
      }, 5000);
    }
  }, [isWaiting]);

  const handleResult = () => {
    // TODO: data는 userid모은거
    const data = userList.map((user) => {
      return user.userId;
    });
    setIsWaiting(true);
  };

  return (
    <Container>
      {!isShow ? (
        <>
          {isWaiting ? (
            <WaitAnimation>
              <b>이상해씨</b> 님의 그룹의 맞춤 추천 테마를 찾는중입니다......
            </WaitAnimation>
          ) : (
            <ResultButton onClick={handleResult}>결과 보기</ResultButton>
          )}
        </>
      ) : (
        "result"
      )}
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
const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const WaitAnimation = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 3rem;
  padding: 1rem;
  white-space: nowrap;
  color: ${theme.colors.pink};
  overflow: hidden; /* 요소 내의 내용이 넘치는 경우 가려진 부분은 보이지 않게 함 */
  animation: ${typing} 5s steps(60, end); /* 5초 동안 한글자씩 타이핑되는 애니메이션 */
`;
