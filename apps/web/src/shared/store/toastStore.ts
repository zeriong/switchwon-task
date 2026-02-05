import { create } from "zustand";

type ToastType = "success" | "error" | "info";

interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

// Toast 자동 숨김 타이머 ID (메모리 누수 방지)
let toastTimeoutId: ReturnType<typeof setTimeout> | null = null;

// Toast 전역 상태 관리
export const useToastStore = create<ToastState>((set) => ({
  message: "",
  type: "info",
  isVisible: false,

  showToast: (message, type = "info") => {
    // 기존 타이머가 있으면 취소 (연속 호출 시 이전 타이머 정리)
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }

    set({ isVisible: true, message, type });

    // 3초 후 자동 숨김
    toastTimeoutId = setTimeout(() => {
      set({ isVisible: false });
      toastTimeoutId = null;
    }, 3000);
  },

  hideToast: () => {
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
      toastTimeoutId = null;
    }
    set({ isVisible: false });
  },
}));
