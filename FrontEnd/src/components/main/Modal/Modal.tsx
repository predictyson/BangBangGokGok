import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Line from "@/assets/common/Line.png";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Rating from "@mui/material/Rating";
import Toast, { showToast } from "@/components/common/Toast";
import "react-toastify/dist/ReactToastify.css";
import Review from "@/components/main/Review/Review";
import { styled as mstyled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikesModal from "./LikesModal";
import { IReviewData, IDetailData } from "types/detail";
import { postInterest, deleteInterest } from "@/api/likes";
import { getDetailLogin } from "@/api/theme";
import StarIcon from "@mui/icons-material/Star";
interface IProps {
  open: boolean;
  onClose: () => void;
  themeId: number;
  data: IDetailData;
  reviews: IReviewData[];
  handleReviews: (review: IReviewData) => Promise<void>;
}

export default function DetailModal({
  open,
  onClose,
  themeId,
  data,
  reviews,
  handleReviews,
}: IProps) {
  const [childOpen, setChildOpen] = React.useState(false);
  const [isInterest, setIsInterest] = useState<boolean>(false);
  const [isMyReview, setIsMyReview] = useState<boolean>(false);
  const isLogin = localStorage.getItem("userId") !== null ? true : false;
  // console.log(data.synopsis);
  // console.log(data.synopsis.replace("<br>", "\n"));
  const postLikes = async (themeId: number) => {
    if (themeId !== 0) {
      try {
        await postInterest(themeId);
        console.log("POST LIKES SUCCESS");
        // requestLogindata(themeId);
        setIsInterest(true);
      } catch (err) {
        console.log(err);
        console.log("POST FAILED");
      }
    }
  };

  const deleteLikes = async (themeId: number) => {
    if (themeId !== 0) {
      try {
        await deleteInterest(themeId);
        handleClick("error", "좋아요 해제 완료");
        requestLogindata(themeId);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClick = async (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  const handlePostLikes = async () => {
    try {
      handleClick("success", "좋아요 등록 성공!");
    } catch (err) {
      console.log(err);
    }
  };
  const handleOpen = () => {
    postLikes(themeId);
    setChildOpen(true);
    console.log("HANDLE OPEN " + childOpen);
  };
  const handleClose = () => {
    setChildOpen(false);
    console.log("HANDLE CLOSE " + childOpen);
  };
  const handleMyReview = async () => {
    try {
      setIsMyReview(true);
      console.log("HANDLE MY REVIEW");
    } catch (err) {
      console.log(err);
    }
  };
  const requestLogindata = async (themeId: number) => {
    if (themeId !== 0) {
      try {
        const res = await getDetailLogin(themeId);
        setIsInterest(res.data.isInterest);
        setIsMyReview(res.data.isMyReview);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("userId") !== null ? true : false;
    isLogin && requestLogindata(themeId);
  }, [themeId]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>
          <div>
            매장명 <span>{data.storeName}</span> | 지역
            <span>
              {data.regionBig} &nbsp;{data.regionSmall}
            </span>
          </div>
          <span
            className="reservation"
            onClick={() => window.open(`${data.pageUrl}`, "_blank")}
          >
            예약하기
          </span>
        </Header>
        <img
          src={Line}
          alt="line"
          style={{ width: "100%", margin: "1rem auto" }}
        />

        <Container>
          <div className="left-container">
            <img
              src={`${data.imgUrl}`}
              alt="poster-img"
              style={{ height: "100%", maxWidth: "90%" }}
            />
          </div>
          <div className="right-container">
            <DetailInfo className="title">{data.title}</DetailInfo>
            <DetailInfo>
              장르
              <GenreBox>
                {data.genre?.map((item, idx) => {
                  return (
                    <div className="item" key={idx}>
                      {item}
                    </div>
                  );
                })}
              </GenreBox>
            </DetailInfo>
            <DetailInfo>
              인원수
              <span className="info">
                {data.minPeople === data.maxPeople
                  ? `${data.minPeople}명`
                  : `${data.minPeople}-${data.maxPeople}명`}
              </span>{" "}
              &nbsp; | &nbsp; 시간
              <span className="info">{data.runningTime}분</span>
            </DetailInfo>
            <DetailInfo>
              오픈일<span className="info">{data.openDate}</span>
            </DetailInfo>
            <DetailInfo>
              난이도
              {data.difficulty === -1 && (
                <h2 style={{ marginLeft: "3rem" }}>?</h2>
              )}
              {data.difficulty !== -1 && (
                <Rating
                  name="readonly"
                  value={data.difficulty}
                  style={{ marginLeft: "1rem" }}
                  size="large"
                  precision={0.5}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.55, color: "gray" }}
                      fontSize="inherit"
                    />
                  }
                  readOnly
                />
              )}
              {isLogin && isInterest && (
                <LikeButton onClick={() => deleteLikes(themeId)}>
                  <CustomFavorite /> <span> 관심 해제하기</span>
                </LikeButton>
              )}
              {isLogin && !isInterest && (
                <>
                  <LikeButton onClick={handleOpen}>
                    <CustomFavoriteBorder /> <span>관심 등록하기</span>
                  </LikeButton>
                </>
              )}
              <LikesModal childOpen={childOpen} handleClose={handleClose} />
              <Toast />
            </DetailInfo>
          </div>
        </Container>
        <Synopsis>
          <article>
            {data.synopsis?.split("\\n").map((sentence) => (
              <div key={sentence} className="word-break">
                {sentence}
                <br />
              </div>
            ))}
          </article>
        </Synopsis>
        <Review
          data={data}
          themeId={themeId}
          reviews={reviews}
          handleReviews={handleReviews}
          isMyReview={isMyReview}
          handleMyReview={handleMyReview}
        />
      </Box>
    </Modal>
  );
}
const CustomFavorite = mstyled(FavoriteIcon)`
  .css-v6ftt0-MuiSvgIcon-root {
    fill:  ${theme.colors.pink},
  },
`;

const CustomFavoriteBorder = mstyled(FavoriteBorderIcon)`
  .css-v6ftt0-MuiSvgIcon-root {
    fill:  ${theme.colors.pink},
  },
`;
const LikeButton = styled.div`
  border: solid 2px ${theme.colors.pink};
  color: white;
  font-size: 1.6rem;
  margin-left: auto;
  border-radius: 1rem;
  text-align: center;
  padding: 1rem 1.8rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  span {
    margin-left: 1rem;
  }
  svg {
    color: ${theme.colors.pink};
    transform: scale(1.5);
  }
  &:hover {
    color: ${theme.colors.container};
    background-color: lightgray;
    border: solid 2px ${theme.colors.container};
    svg {
      /* color: ${theme.colors.failure}; */
    }
  }
`;
const Synopsis = styled.div`
  border: solid 1px grey;
  margin: 2rem 0;
  font-size: 1.6rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.container};
  border-radius: 1rem;
  padding: 2rem; /* overflow-x: hidden; */ /* overflow-y: auto; */
  /* pre { */
  font-family: Pretendard;
  width: 95%;
  font-size: 1.4rem;
  .word-break {
    word-break: keep-all;
  }
  /* } */
  /* white-space: pre-wrap; */
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }
`;
const GenreBox = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  .item {
    border-radius: 1.3rem;
    font-weight: bold;
    border: solid 2px white;
    padding: 0.3rem 2rem;
    margin-left: 1rem;
  }
`;
const Container = styled.div`
  display: flex;
  height: 50%;
  margin-top: 2rem;
  overflow-y: hidden;
  .left-container {
    width: 45%;
    justify-content: center;
    display: flex;
  }
  .right-container {
    width: 55%;
    font-family: Pretendard;
    .title {
      font-size: 1.8rem;
      font-weight: bold;
      margin-top: 1rem;
    }
    .info {
      margin-left: 1rem;
      font-weight: bold;
    }
  }
`;
const DetailInfo = styled.div`
  margin-top: 1rem;
  font-family: Pretendard;
  height: 4rem;
  font-size: 1.7rem;
  display: flex;
  align-items: center;
  .info {
    font-weight: bold;
  }
  .title {
    font-size: 2rem;
    font-weight: bold;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  font-family: Pretendard;
  span {
    margin: 0 1rem;
    font-weight: bold;
  }
  .reservation {
    color: ${theme.colors.pink};
    cursor: pointer;
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55%",
  height: "75%",
  bgcolor: "#3E2133",
  borderRadius: 10,
  boxShadow: 24,
  padding: "4rem 8rem",
  color: "white",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

// const PREVIEWDIMMY: IPreviewThemeData = {
//   themeId: 1,
//   title: "미스테리 거울의 방",
//   imgUrl:
//     " https://user-images.githubusercontent.com/55784772/224640336-ec8412c3-f81b-4472-b6a5-9e56254004a3.jpg",
//   genres: ["공포", "추리"], // 테마 장르 목록
// };

const USERDUMMY: IUserData = {
  userId: 1,
  nickname: "gigi",
  email: "yllydev@gmail.com",
  profileImageType: "dumdumdum",
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
    isSuccess: 1, // 1: 성공 0 : 실파
  },
];
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
