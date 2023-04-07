import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PreviewThemeResponse } from "types/search";
import { getDetail } from "@/api/theme";
import { IReviewData, IDetailData } from "types/detail";
import { getReviews } from "@/api/review";
import Modal from "@components/main/Modal/Modal";
import { theme } from "@/styles/theme";

interface SearchResultProps {
  results: PreviewThemeResponse[];
  searchHappened: boolean;
  isLastPage: boolean;
  handleSubmit: (isInitSearch: boolean) => void;
}

export default function SearchResult({
  results,
  searchHappened,
  isLastPage,
  handleSubmit,
}: SearchResultProps) {
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

  // 무한스크롤 구현
  useEffect(() => {
    const observerTarget = document.querySelector("#observer_target");
    if (!observerTarget) {
      return;
    }
    // IntersectionObserverCallback 함수
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isLastPage) {
            // 마지막 페이지가 아닐 때만 보냄.
            handleSubmit(false);
          }
        }
      });
    };

    // IntersectionObserver 생성
    const observer = new IntersectionObserver(callback, {
      root: null,
      threshold: [0],
    });
    // 관찰 대상 등록
    observer.observe(observerTarget);
    return () => {
      console.log("cleanup Function");
      observer.unobserve(observerTarget);
    };
  }, [results]);

  return (
    <>
      <Wrapper id="wrapper">
        {searchHappened && results.length === 0 && (
          <NoContent>
            <NoContentText>검색 결과가 없습니다.</NoContentText>
          </NoContent>
        )}
        {searchHappened && results.length !== 0 && (
          <Container id="container">
            {results.map((result) => (
              <SliderItem key={result.themeId}>
                <PosterItem src={result.imgUrl} />
                <Hover
                  className="card-hover"
                  onClick={() => handleOpen(result.themeId)}
                >
                  <span style={{ padding: "0 2rem" }}>{result.title}</span>
                </Hover>
              </SliderItem>
            ))}
            <ObserverTarget id="observer_target"></ObserverTarget>
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
          </Container>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-x: hidden;
  overflow-y: auto;
`;

const NoContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoContentText = styled.div`
  font-size: 3rem;
  weight: 600;
  padding: 3rem;
  color: ${theme.colors.pink};
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2.5rem;
  position: relative;
`;

const SliderItem = styled.div`
  border-radius: 1rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  width: 12.8%;
  aspect-ratio: 3 / 4;
  @media (max-width: 1536px) {
    width: 12.6%;
  }
  @media (max-width: 1440px) {
    width: 12.4%;
  }
  @media (max-width: 1366px) {
    width: 12.2%;
  }
  position: relative;
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
  /* width: 20rem;
  height: 25rem;
  @media (max-height: 800px) {
    width: 15rem;
    height: 20rem;
  } */

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

const ObserverTarget = styled.div`
  width: 100%;
  height: 10rem;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  z-index: -1;
`;
