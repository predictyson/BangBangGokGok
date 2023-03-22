import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
interface IProps {
  open: boolean;
  onClose: () => void;
  themeId: number;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#3E2133",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ModalContent({ open, onClose, themeId }: IProps) {
  console.log("open : ", open);
  console.log("handleClose : ", onClose);

  const handleClick = () => {
    console.log("button clicked");
  };

  return (
    <Box sx={style}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      <Button onClick={handleClick}>button</Button>s
      <Button onClick={onClose}>close</Button>
    </Box>
  );
}
