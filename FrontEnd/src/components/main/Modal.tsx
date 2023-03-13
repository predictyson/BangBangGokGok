/* eslint-disable @typescript-eslint/prefer-as-const */
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Line from "@/assets/common/Line.png";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
interface IProps {
  open: boolean;
  onClose: () => void;
  themeId: number;
  label: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "75%",
  bgcolor: "#3E2133",
  borderRadius: 10,
  boxShadow: 24,
  padding: "4rem 8rem",
  color: "white",
};

const GENREDUMMY: IGenreData[] = [
  {
    genreId: 1,
    category: "공포",
  },
  {
    genreId: 2,
    category: "추리",
  },
];

const PREVIEWDIMMY: IPreviewThemeData = {
  themeId: 1,
  title: "미스테리 거울의 방",
  imgUrl:
    " https://user-images.githubusercontent.com/55784772/224640336-ec8412c3-f81b-4472-b6a5-9e56254004a3.jpg",
  genres: ["공포", "추리"], // 테마 장르 목록
};

const REVIEWDUMMY = [
  {
    reviewId: 1,
    content: "너무너무 재밌어요 눈물나요",
    rating: 4.2,
    activity: 3.3,
    fear: 4.4,
    difficulty: 2.2,
    createTime: "2023-03-13",
    isSuccess: 0, // 1: 성공 0 : 실파
    record: 20.2, // 분.초
    theme: PREVIEWDIMMY, // 테마 정보
  },
];
const initData: IDetailData = {
  themeId: 1,
  regionBig: "서울", // 지역(대분류)
  regionSmall: "강남", // 지역(소분류)
  storeName: "코드 케이 홍대점", // 매장명
  title: "미스테리 거울의 방", // 테마명
  genre: GENREDUMMY, // 장르 목록
  difficulty: 3.2, // 난이도
  runningTime: 60, // 시간 (분단위)
  openDate: "2023.03.13", // 오픈일
  minPeople: 2, // 최소 인원
  maxPeople: 6, // 최대 인원
  imgUrl:
    "https://user-images.githubusercontent.com/55784772/224640336-ec8412c3-f81b-4472-b6a5-9e56254004a3.jpg", // 테마 포스터 링크
  pageUrl: "http://www.code-k.co.kr/", // 테마 예약페이지 링크
  synopsis:
    "마법사는 언제나 예고한 시간에 나타나지.마법사 케라스에 붙잡힌 당신. 이제 당신의 영혼을 훔쳐 더욱 강력해지려 합니다. 마법사 케라스가 잠시 집을 비우는 사이 탈출할 수 있는 마지막 기회를 갖게 되었습니다. 반드시 탈출하셔서 후일을 도모하시기 바랍니다. ", // 테마 시놉시스
  userRating: "4.6", // 평점
  userActivity: "3.2", // 활동성
  userFear: "4.4", // 공포도
  userDifficulty: "3.3", // 체감 난이도
  userCnt: 8, // 평가 인원
  reviews: REVIEWDUMMY, // 해당 테마의 리뷰들;
};

export default function DetailModal({ open, onClose, themeId, label }: IProps) {
  const handleClick = () => {
    console.log("button clicked");
  };
  const [data, setData] = useState(initData);
  const navigate = useNavigate();
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
            onClick={() => {
              navigate(`/${data.pageUrl}`);
            }}
          >
            예약하기
          </span>
        </Header>
        <img
          src={Line}
          alt="line"
          style={{ width: "100%", margin: "1rem auto" }}
        />
        <Button onClick={handleClick}>button</Button>s
        <Button onClick={onClose}>close</Button>
      </Box>
    </Modal>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.8rem;
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
