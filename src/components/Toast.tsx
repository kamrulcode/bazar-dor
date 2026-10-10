"use client";

import { CheckCircle2, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

interface ToastProps {
  message?: string;
  duration?: number;
  type?: "success" | "error";
}

export default function Toast({
  message,
  duration = 5000,
  type = "success",
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, message]);

  if (!visible) return null;

  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle2 : CircleX;

  return (
    <div className="toast toast-top toast-center z-50">
      <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-[#343a35] shadow-lg">
        <Icon
          size={20}
          strokeWidth={3}
          className={`shrink-0 ${
            isSuccess ? "fill-[#5bd34a] text-white" : "fill-red-500 text-white"
          }`}
        />

        <span className="text-sm font-medium sm:text-base">{message}</span>
      </div>
    </div>
  );
}
