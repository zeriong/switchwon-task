import { useEffect, type RefObject } from "react";

/**
 * 요소 외부 클릭 감지 훅
 * @param ref - 감지할 요소의 ref
 * @param callback - 외부 클릭 시 실행할 콜백
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
}
