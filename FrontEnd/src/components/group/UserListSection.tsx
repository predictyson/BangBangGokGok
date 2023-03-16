import { theme } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import UserSection from "./UserSection";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const tempUserSearchList: GroupSetUer[] = [
  {
    profileImageType: "Avatar1",
    nickname: "가",
    email: "jackid1103@naver.com",
  },
  {
    profileImageType: "Avatar3",
    nickname: "가나",
    email: "jackid1103@naver.com",
  },
  {
    profileImageType: "Avatar3",
    nickname: "가나다",
    email: "jackid1103@naver.com",
  },
  {
    profileImageType: "Avatar1",
    nickname: "가나다라마바사",
    email: "jackid1103@naver.com",
  },
];

export default function UserListSection({
  userList,
  handleDeleteUser,
  handleAddUser,
}: {
  userList: GroupSetUer[];
  handleDeleteUser: (nickname: string) => void;
  handleAddUser: (user: GroupSetUer) => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GroupSetUer[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    const results = tempUserSearchList.filter((user) =>
      user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("result: " + results);
    setSearchResults(results);
    console.log("searchResult: " + searchResults);
  };

  return (
    <Container>
      {userList.map((user: GroupSetUer, idx: number) => (
        <UserSection
          user={user}
          key={idx}
          handleDeleteUser={handleDeleteUser}
        />
      ))}
      {userList.length < 6 && (
        <>
          <AddButtonBox>
            <AddButton onClick={handleOpen}>
              <p>+</p>
            </AddButton>
          </AddButtonBox>
          <Modal open={open} onClose={handleClose}>
            <ModalBox>
              <h1>유저 검색</h1>
              <Autocomplete
                sx={{ width: 500, input: { fontSize: 14 } }}
                color="warning"
                options={searchResults}
                autoHighlight
                getOptionLabel={(option) => option.nickname}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ fontSize: 14 }}
                    {...props}
                    onClick={() => handleAddUser(option)}
                  >
                    {option.nickname} ({option.email})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="닉네임 혹은 이메일을 입력해주세요."
                    onChange={handleChange}
                    sx={{ backgroundColor: "white", input: { fontSize: 14 } }}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </ModalBox>
          </Modal>
        </>
      )}
    </Container>
  );
}

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  height: 50rem;
  background-color: ${theme.colors.background};
  border-radius: 1rem;
  box-shadow: 24;
  color: black;
  padding: 2rem;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  margin-bottom: 1rem;
`;

const AddButtonBox = styled.div`
  width: 18rem;
  margin-right: 1rem;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const AddButton = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 50rem;
  background-color: ${theme.colors.containerLight};
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }

  p {
    font-weight: ${theme.fontWeight.extrabold};
    font-size: 8rem;
    margin: 0;
    color: #f3e0e0;
  }
`;
