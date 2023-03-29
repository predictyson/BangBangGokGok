import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { getUserInterests } from "@/api/profile";
import { UserInterestTheme } from "types/mypage";

export default function LikeThemesSection() {
  const [interests, setInterests] = useState<UserInterestTheme[]>([]);

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
            <ThemeItem key={interest.interestedThemeOfUserId}>
              {interest.previewThemeResponse.title}
            </ThemeItem>
          ))}
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

const ThemeItem = styled.div`
  border-radius: 1rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  width: 22rem;
  height: 29.3rem;
  @media (max-height: 800px) {
    width: 15rem;
    /* width: 18rem; */
    height: 20rem;
  }
  @media (max-height: 755px) {
    width: 17rem;
    height: 23.5rem;
  }
  background-color: #3e2133;
`;
