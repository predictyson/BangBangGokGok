import { themeRec } from "@/api/group";
import { getDetail } from "@/api/theme";
import { theme } from "@/styles/theme";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { IThemeData } from "types/slider";
import Modal from "@components/main/Modal";
import { IDetailData, IReviewData } from "types/detail";
import { getIsLiked } from "@/api/likes";
import { getReviews } from "@/api/review";

export default function ThemeRecSection({
  userList,
  handleToastClick,
}: {
  userList: GroupSetUer[];
  handleToastClick: (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => void;
}) {
  const [recTheme, setRectTheme] = useState<IThemeData[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [themeId, setThemeId] = useState(0);
  const [data, setData] = useState<IDetailData>(initData);
  const [reviews, setReviews] = useState<IReviewData[]>(REVIEWDUMMY);

  const handleOpen = async (themeId: number) => {
    await setThemeId(themeId);
    await requestDetailData(themeId);
    await requestReviews(themeId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const requestReviews = async (themeId: number) => {
    if (themeId !== 0) {
      try {
        const res = await getReviews(themeId);
        themeId !== 0 && setReviews(res.data.reviews);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleResult = async () => {
    const data = userList.map((user) => {
      return user.userId;
    });
    if (data.length === 0) {
      handleToastClick("error", "최소 2명이상 유저를 추가해주세요.");
    } else {
      setIsWaiting(true);
      try {
        const {
          data: { themes },
        } = await themeRec(data);
        setRectTheme(themes);
        setIsShow(true);
        setIsWaiting(false);
        console.log(themes);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const requestDetailData = async (themeId: number) => {
    try {
      const res = await getDetail(themeId);
      setData(res.data.theme);
      console.log(res.data.theme);
    } catch (err) {
      throw new Error("Internal Server Error!");
    }
  };

  const handleReviews = async (review: IReviewData) => {
    await setReviews((prev) => {
      return [review, ...prev];
    });
  };

  return (
    <Container>
      {!isShow && (
        <>
          {isWaiting && (
            <WaitAnimation>
              <b>{localStorage.getItem("nickname")}</b> 님의 그룹의 맞춤 추천
              테마를 찾는중입니다......
            </WaitAnimation>
          )}
          {!isWaiting && (
            <ResultButton onClick={handleResult}>결과 보기</ResultButton>
          )}
        </>
      )}
      {isShow && (
        <BottomContainer>
          {recTheme.map((theme) => {
            return (
              <SliderItem key={theme.themeId}>
                <PosterItem src={theme.imgUrl} />
                <Hover
                  className="card-hover"
                  onClick={() => handleOpen(theme.themeId)}
                >
                  <span style={{ padding: "0 2rem" }}>{theme.title}</span>
                </Hover>
              </SliderItem>
            );
          })}
          {/* reviews={reviews}
          isLiked={isLiked}
          handleReviews={handleReviews} */}
          <Modal
            open={open}
            onClose={handleClose}
            themeId={themeId}
            data={data}
            reviews={reviews}
            handleReviews={handleReviews}
          />
        </BottomContainer>
      )}
    </Container>
  );
}

const BottomContainer = styled.div`
  flex: 1;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }
`;

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

const SliderItem = styled.div`
  position: relative;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 0.7rem;
  :hover {
    & > .card-hover {
      opacity: 0.8;
    }
  }
`;

const Hover = styled.div`
  width: 15rem;
  height: 20rem;
  position: absolute;
  opacity: 0;
  background-color: black;
  top: 0;
  left: 0;
  transition: all 0.5s;
  border-radius: 1rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
`;

const PosterItem = styled.img`
  width: 15rem;
  height: 20rem;
  cursor: pointer;
  border-bottom: 1rem;
  border-radius: 1rem;
`;

const initData: IDetailData = {
  themeId: 1,
  regionBig: "서울", // 지역(대분류)
  regionSmall: "강남", // 지역(소분류)
  storeName: "코드케이 홍대점", // 매장명
  title: "미스테리 거울의 방", // 테마명
  genre: ["공포", "추리"], // 장르 목록
  difficulty: 3.2, // 난이도
  runningTime: 60, // 시간 (분단위)
  openDate: "2023.03.13", // 오픈일
  minPeople: 2, // 최소 인원
  maxPeople: 6, // 최대 인원
  imgUrl:
    "https://user-images.githubusercontent.com/55784772/224640336-ec8412c3-f81b-4472-b6a5-9e56254004a3.jpg", // 테마 포스터 링크
  pageUrl: "http://www.code-k.co.kr/", // 테마 예약페이지 링크
  synopsis: `"몇 년 전부터 조직에 잠입해 있던 언더커버로부터 대량의 마약 거래 정보가 들어왔다.
    지휘부에서는 나를 포함한 경찰 특공대를 이 마약 조직에 몇 달 전부터 침투 시켰다.
    오늘이 지긋지긋한 마약조직을 끝장 내버릴 마지막 기회다!"
    `, // 테마 시놉시스
  userRating: 3.3, // 평점
  userActivity: 3.4, // 활동성
  userFear: 4.4, // 공포도
  userDifficulty: 4.4, // 체감 난이도
  userCnt: 8, // 평가 인원
  isInterested: false,
};

const REVIEWDUMMY: IReviewData[] = [
  {
    userId: 1,
    nickname: "",
    reviewId: 1,
    content: "너무너무 재밌어요 눈물나요",
    userRating: 4.2,
    userActivity: 3.3,
    userFear: 4.4,
    userDifficulty: 2.2,
    createTime: "2023-03-13",
    isSuccess: 0, // 1: 성공 0 : 실파
  },
];
