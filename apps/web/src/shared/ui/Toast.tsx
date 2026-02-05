"use client";

import { useToastStore } from "@/shared/store/toastStore";
import { twMerge } from "tailwind-merge";

// Toast 알림 컴포넌트
export default function Toast() {
  const { message, type, isVisible, hideToast } = useToastStore();

  const typeStyles = {
    success: "bg-cta-1-default text-white",
    error: "bg-pr-default-red text-white",
    info: "bg-pr-blue-500 text-white",
  };

  const typeIcons = {
    success: "✅",
    error: "🚨",
    info: "ℹ️",
  };

  return (
    <div
      className={twMerge(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg",
        "transition-all duration-300 transform flex items-center gap-2 cursor-pointer",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none",
        typeStyles[type],
      )}
      onClick={hideToast}
    >
      <span>{typeIcons[type]}</span>
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
}
