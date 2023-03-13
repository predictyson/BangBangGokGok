/* eslint-disable @typescript-eslint/prefer-as-const */
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  width: "118rem",
  height: "60rem",
  bgcolor: "#3E2133",
  borderRadius: 10,
  boxShadow: 24,
  padding: "4rem 8rem",
  color: "white",
};

export default function DetailModal({ open, onClose, themeId, label }: IProps) {
  const handleClick = () => {
    console.log("button clicked");
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1>{label}</h1>
        <h2>{themeId}</h2>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        <Button onClick={handleClick}>button</Button>s
        <Button onClick={onClose}>close</Button>
      </Box>
    </Modal>
  );
}
