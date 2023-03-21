import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Line from "@/assets/common/Line.png";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Rating from "@mui/material/Rating";
import Toast, { showToast } from "@/components/common/Toast";
import "react-toastify/dist/ReactToastify.css";
import Review from "./Review";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikesModal from "./LikesModal";
interface IProps {
  open: boolean;
  onClose: () => void;
  themeId: number;
  label: string;
}

export default function DetailModal({ open, onClose, themeId, label }: IProps) {
  const [data, setData] = useState(initData);
  const [childOpen, setchildOpen] = React.useState(false);
  const [isLiked, setIsLiked] = useState(data.isInterested);
  const handleClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
    setIsLiked((prev) => !prev);
  };
  const handleOpen = () => {
    setchildOpen(true);
  };
  const handleClose = () => {
    console.log("cLOSE");
    setchildOpen(false);
  };
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
              style={{ height: "100%" }}
            />
          </div>
          <div className="right-container">
            <DetailInfo className="title">{data.title}</DetailInfo>
            <DetailInfo>
              장르
              <GenreBox>
                {data.genre.map((item, idx) => {
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
                {data.minPeople}-{data.maxPeople}명
              </span>{" "}
              &nbsp; | &nbsp; 시간
              <span className="info">{data.runningTime}min</span>
            </DetailInfo>
            <DetailInfo>
              오픈일<span className="info">{data.openDate}</span>
            </DetailInfo>
            <DetailInfo>
              난이도
              <Rating
                name="readonly"
                value={data.difficulty}
                style={{ marginLeft: "1rem" }}
                size="large"
                readOnly
              />
              {isLiked ? (
                <LikeButton
                  onClick={() =>
                    handleClick("error", "관심 등록이 해제되었습니다.")
                  }
                >
                  <FavoriteIcon />
                  <span> 관심 해제하기</span>
                </LikeButton>
              ) : (
                <>
                  <LikeButton onClick={handleOpen}>
                    <FavoriteBorderIcon /> <span> 관심 등록하기</span>
                  </LikeButton>
                  <LikesModal
                    childOpen={childOpen}
                    handleClose={handleClose}
                    handleClick={handleClick}
                  />
                </>
              )}
              <Toast />
            </DetailInfo>
          </div>
        </Container>
        <Synopsis>
          <pre>{data.synopsis}</pre>
        </Synopsis>
        <Review data={data} themeId={themeId} label={label} />
      </Box>
    </Modal>
  );
}

const LikeButton = styled.div`
  border: solid 2px lightgray;
  color: lightgray;
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
  &:hover {
    color: ${theme.colors.container};
    background-color: lightgray;
    border: solid 2px ${theme.colors.container};
  }
`;
const Synopsis = styled.div`
  margin-top: 2rem;
  font-size: 1.6rem;
  text-align: center;
  padding: 0 5%;
  height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  pre {
    font-family: Pretendard;
  }
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 12px;
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
  WebkitOverflowScrolling: "touch",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "4px",
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
    user: USERDUMMY,
    reviewId: 1,
    content: "너무너무 재밌어요 눈물나요",
    rating: 4.2,
    activity: 3.3,
    fear: 4.4,
    difficulty: 2.2,
    createTime: "2023-03-13",
    isSuccess: 0, // 1: 성공 0 : 실파
    record: "0:12:50", // 분.초
  },
  {
    user: USERDUMMY,
    reviewId: 1,
    content: "너무너무 재밌어요 눈물나요",
    rating: 4.2,
    activity: 3.3,
    fear: 4.4,
    difficulty: 2.2,
    createTime: "2023-03-13",
    isSuccess: 1, // 1: 성공 0 : 실파
    record: "0:12:50", // 분.초
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
  userRating: "3.3", // 평점
  userActivity: "3.2", // 활동성
  userFear: "4.4", // 공포도
  userDifficulty: "3.3", // 체감 난이도
  userCnt: 8, // 평가 인원
  reviews: REVIEWDUMMY, // 해당 테마의 리뷰들;
  isInterested: false,
};
