import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { getUserInterests } from "@/api/profile";
import { UserInterestTheme } from "types/mypage";
import Modal from "@components/main/Modal/Modal";
import { IDetailData, IReviewData } from "types/detail";
import { getDetail } from "@/api/theme";
import { getReviews } from "@/api/review";

export default function LikeThemesSection() {
  const [interests, setInterests] = useState<UserInterestTheme[]>([]);

  const [open, setOpen] = useState(false);
  const [themeId, setThemeId] = useState(0);
  const [data, setData] = useState<IDetailData>({} as IDetailData);
  const [reviews, setReviews] = useState<IReviewData[]>([] as IReviewData[]);

  const handleOpen = async (themeId: number) => {
    setThemeId(themeId);
    await requestDetailData(themeId);
    await requestReviews(themeId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReviews = async (review: IReviewData) => {
    setReviews((prev) => {
      return [review, ...prev];
    });
  };

  const requestDetailData = async (themeId: number) => {
    if (themeId !== 0) {
      try {
        const res = await getDetail(themeId);
        setData(res.data.theme);
        console.log(res.data.theme);
      } catch (err) {
        throw new Error("Internal Server Error!");
      }
    }
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

  useEffect(() => {
    const fetchInterests = async () => {
      const userId = Number(localStorage.getItem("userId"));
      try {
        const response = await getUserInterests(userId);
        // console.log(response);
        setInterests(response.data.interestThemes as UserInterestTheme[]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInterests();
  }, []);

  return (
    <SectionWrapper>
      <SectionTitle>관심 테마</SectionTitle>
      <SectionContentWrapper>
        <OverflowWrapper>
          {interests.map((interest) => (
            <SliderItem key={interest.previewThemeResponse.themeId}>
              <PosterItem src={interest.previewThemeResponse.imgUrl} />
              <Hover
                className="card-hover"
                onClick={() =>
                  handleOpen(interest.previewThemeResponse.themeId)
                }
              >
                <span style={{ padding: "0 2rem" }}>
                  {interest.previewThemeResponse.title}
                </span>
              </Hover>
            </SliderItem>
          ))}
          {themeId !== undefined && (
            <Modal
              open={open}
              onClose={handleClose}
              themeId={themeId}
              data={data}
              reviews={reviews}
              handleReviews={handleReviews}
            />
          )}
        </OverflowWrapper>
      </SectionContentWrapper>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const SectionTitle = styled.h1`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  margin: 0;
`;

const SectionContentWrapper = styled.div`
  border-radius: 1.5rem;
  height: 91%;
  @media (max-height: 800px) {
    height: 87%;
  }
  padding: 1.5rem;
  background-color: ${theme.colors.containerLight};
`;

const OverflowWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1.5rem;
  border-radius: 1.5rem;
  height: 100%;
`;

// const ThemeItem = styled.div`
//   border-radius: 1rem;
//   box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
//   width: 22rem;
//   height: 29.3rem;
//   @media (max-height: 800px) {
//     width: 15rem;
//     /* width: 18rem; */
//     height: 20rem;
//   }
//   @media (max-height: 755px) {
//     width: 17rem;
//     height: 23.5rem;
//   }
//   background-color: #3e2133;
// `;

const SliderItem = styled.div`
  position: relative;
  width: 18.7%;
  aspect-ratio: 3 / 4;
  @media (max-width: 1536px) {
    width: 18.4%;
  }
  @media (max-width: 1440px) {
    width: 18.2%;
  }
  @media (max-width: 1366px) {
    width: 18%;
  }
  :hover {
    & > .card-hover {
      opacity: 0.8;
    }
  }
`;

const PosterItem = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-bottom: 1rem;
  border-radius: 1rem;
`;

const Hover = styled.div`
  width: 100%;
  height: 100%;
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
