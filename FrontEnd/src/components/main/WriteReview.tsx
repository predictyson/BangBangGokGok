import React, { useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import Line from "@/assets/common/Line.png";
import { theme } from "@/styles/theme";
import { Rating, RatingProps } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import { styled as mstyled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import StarIcon from "@mui/icons-material/Star";
import { IDetailData, IPostData, IReviewData } from "types/detail";
import { postReview } from "@/api/review";
interface Props {
  value: number;
}
interface IProps {
  childOpen: boolean;
  handleClose: () => void;
  data: IDetailData;
  themeId: number;
  handleReviews: (review: IReviewData) => Promise<void>;
  handleMyReview: () => Promise<void>;
}
export default function WriteReview({
  childOpen,
  handleClose,
  data,
  themeId,
  handleReviews,
  handleMyReview,
}: IProps) {
  const [postdata, setPostdata] = useState<IPostData>(initData);

  const handleTextareaChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log("HANDLE TEXT CHANGE");
    await setPostdata({ ...postdata, content: event.target.value });
    console.log(postdata.content);
  };
  const handleRatingChange = useCallback(
    async (e: React.SyntheticEvent<Element, Event>, value: number | null) => {
      console.log("HANDLE RATING CHANGE");
      const { name } = e.target as HTMLButtonElement;
      if (value !== null) {
        await setPostdata((prevData) => ({
          ...prevData,
          [name]: value ?? 0,
        }));
      }
    },
    [setPostdata]
  );
  const handleValueChange = async (
    event: React.MouseEvent<HTMLElement>,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      await setPostdata({ ...postdata, isSuccess: newValue });
    }
    console.log(postdata.isSuccess);
  };

  const sendReviewData = async () => {
    try {
      const dataToSend = { ...postdata, themeId: themeId };
      console.log(dataToSend.themeId);
      if (
        dataToSend.userActivity === 0 ||
        dataToSend.userDifficulty === 0 ||
        dataToSend.userFear === 0 ||
        dataToSend.userRating === 0
      ) {
        alert("0.5이상의 별점을 매겨주세요!");
        return;
      } else {
        const res = await postReview(dataToSend);
        console.log(res.data);
        setPostdata(initData);
        handleMyReview();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(postdata);
    if (
      postdata.userActivity === 0 ||
      postdata.userDifficulty === 0 ||
      postdata.userFear === 0 ||
      postdata.userRating === 0
    ) {
      alert("0.5이상의 별점을 매겨주세요!");
      return; // 등록을 불가하게 함
    } else {
      handleClose();
    }
    await sendReviewData();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const formattedDate =
      year +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day;

    const reviewData: IReviewData = {
      userId: Number(localStorage.getItem("userId")),
      nickname: localStorage.getItem("nickname")?.toString(),
      reviewId: 1,
      content: postdata.content,
      userRating: postdata.userRating,
      userActivity: postdata.userActivity,
      userFear: postdata.userFear,
      userDifficulty: postdata.userDifficulty,
      createTime: formattedDate,
      isSuccess: postdata.isSuccess,
    };

    await handleReviews(reviewData);
  };

  useEffect(() => {
    if (postdata.themeId !== 0) {
      sendReviewData();
      // setPostdata({ ...postdata, themeId: themeId });
      // postdata.themeId !== 0 && sendReviewData();
    }
  }, [postdata.themeId]);

  const ratings: RatingProps[] = [
    {
      name: "userRating",
      emptyLabelText: "후기 평점",
      defaultValue: 0,
      value: postdata.userRating ?? 0,
    },
    {
      name: "userDifficulty",
      emptyLabelText: "체감 난이도",
      defaultValue: 0,
      value: postdata.userDifficulty ?? 0,
    },
    {
      name: "userFear",
      emptyLabelText: "체감 공포도",
      value: postdata.userFear ?? 0,
    },
    {
      name: "userActivity",
      emptyLabelText: "체감 활동성",
      value: postdata.userActivity ?? 0,
    },
  ];
  return (
    <React.Fragment>
      <Modal open={childOpen} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <Header>
            후기 작성하기
            <img
              src={Line}
              alt="line"
              style={{ width: "100%", margin: "1rem auto" }}
            />
          </Header>
          <InfoBox>
            <div className="info">
              <span style={{ width: "10.5rem" }}>테마명</span>{" "}
              <div className="title">{data.title}</div>
            </div>
            <div className="info">
              성공 여부 &nbsp;&nbsp;
              <ToggleButtonGroup
                value={postdata.isSuccess}
                exclusive
                onChange={handleValueChange}
              >
                <CustomToggleButton value={1}>성공</CustomToggleButton>
                <CustomToggleButton value={0}>실패</CustomToggleButton>
              </ToggleButtonGroup>
            </div>
          </InfoBox>

          <ReviewBox>
            <RatingWrapper>
              {ratings.map(({ emptyLabelText, name, value }) => (
                <div className="ratingItem" key={name}>
                  <div className="rating-title">{emptyLabelText}</div>
                  <Rating
                    sx={{
                      "&.MuiRating-root:focus": {
                        outline: "none",
                      },
                      fontSize: "3rem",
                      marginLeft: "1rem",
                      boxSizing: "content-box",
                    }}
                    precision={0.5}
                    name={name}
                    value={value}
                    emptyIcon={
                      <StarIcon
                        style={{ opacity: 0.55, color: "gray" }}
                        fontSize="inherit"
                      />
                    }
                    onChange={handleRatingChange}
                  />
                  <div />
                </div>
              ))}
            </RatingWrapper>
            <form>
              <CustomText
                value={postdata.content}
                onChange={handleTextareaChange}
                maxLength={500}
              />
            </form>
          </ReviewBox>
          <ButtonWrapper>
            <CancelButton onClick={handleClose}>취소</CancelButton>
            <WriteButton onClick={handleSubmit}>등록</WriteButton>
          </ButtonWrapper>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const CustomToggleButton = mstyled(ToggleButton)({
  padding: "0.5rem 1.5rem",
  fontSize: "1.5rem",
  borderRadius: "0.8rem",
  border: `solid 2px white`,
  fontFamily: "Pretendard",
  color: "white",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    // backgroundColor: value === 1 ? "red" : "green",
    fontWeight: "bold",
  },
});

const CustomText = styled.textarea`
  font-size: 1.4rem;
  padding: 2rem;
  width: 95%;
  padding: 1rem;
  height: 10rem;
  border: solid 2px white;
  color: white;
  border-radius: 1rem;
  background-color: transparent;
  margin-top: 2rem;
  resize: none;
`;
const Header = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const InfoBox = styled.div`
  display: flex;
  font-size: 1.8rem;
  margin-top: 2rem;
  align-items: center;
  .info {
    align-items: center;
    width: 50%;
    display: flex;
  }
  .title {
    font-size: 2rem;
    font-weight: bold;
  }
`;
const RatingWrapper = styled.div`
  display: flex;
  font-size: 1.4rem;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ReviewBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 2rem;
    margin-right: 1.5rem;
  }
  .rating-title {
    width: 25%;
    font-size: 1.8rem;
  }
  .ratingItem {
    font-size: 1.6rem;
    height: 3.5rem;
    width: calc(50% - 1rem);
    font-weight: ${theme.fontWeight.medium};
    color: white;
    display: flex;
    align-items: center;
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "48%",
  height: "55%",
  bgcolor: "#33202F",
  borderRadius: 10,
  boxShadow: 24,
  padding: "4rem 6rem",
  color: "white",
};

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
`;
const CancelButton = styled.div`
  border: solid 2px white;
  color: white;
  background-color: ${theme.colors.container};
  font-size: 1.6rem;
  margin-left: auto;
  border-radius: 1rem;
  text-align: center;
  padding: 1rem 1.8rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.container};
    background-color: white;
    border: solid 2px ${theme.colors.container};
  }
`;
const WriteButton = styled.div`
  margin-left: 2rem;
  border: solid 2px ${theme.colors.container};
  color: ${theme.colors.container};
  background-color: white;
  font-size: 1.6rem;
  border-radius: 1rem;
  text-align: center;
  padding: 1rem 1.8rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: ${theme.colors.container};
    border: solid 2px white;
  }
`;

const initData: IPostData = {
  themeId: 0, // 테마 id
  content: "", // 리뷰 내용
  userRating: 0.0, // 평점
  userActivity: 0.0, // 활동성
  userFear: 0.0, // 공포도
  userDifficulty: 0.0, // 체감 난이도
  isSuccess: 1,
};
