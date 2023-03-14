import React from "react";
import { ToastContainer } from "react-toastify";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface IToastProps {
  type: "success" | "error" | "info" | "action";
  message?: string;
}

const toastOptions: ToastOptions = {
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  closeButton: false,
};

export function showToast({ type, message }: IToastProps) {
  switch (type) {
    case "success":
      toast.success(message || "성공적으로 완료되었습니다", {
        ...toastOptions,
        icon: <CheckCircleOutlineIcon sx={{ fontSize: 25 }} />,
      });
      return;
    case "error":
      toast.error(message || "다시 한번 시도해주세요", {
        ...toastOptions,
        icon: <ErrorOutlineIcon sx={{ fontSize: 25 }} />,
      });
  }
}

export default function Toast() {
  return <Container />;
}

const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 16px;
    border-radius: 50px;
    padding: 16px 28px;
    color: #fff;
    background: rgba(107, 115, 135, 0.8);
  }

  .Toastify__toast-icon {
    width: 22px;
    height: 22px;
  }

  .Toastify__toast--info {
    background: rgba(107, 115, 135, 0.8);
  }

  .Toastify__toast--success {
    background: rgba(48, 173, 120, 0.8);
  }

  .Toastify__toast--error {
    background: rgba(224, 72, 82, 0.8);
  }
`;
