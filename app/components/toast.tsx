"use client";
import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../toastStyles.css";
export default function ToastComponent() {
  return <ToastContainer />;
}

export function showToast(title: string, description: string) {
  toast.success(
    <div>
      <strong>{title}</strong>
      <div>{description}</div>
    </div>,
    {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    }
  );
}
