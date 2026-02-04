import type { Metadata } from "next";
import localFont from "next/font/local"; // 1. localFont 불러오기
import "@/shared/styles/globals.css";

// 2. 로컬 폰트 설정
const myLocalFont = localFont({
  src: [
    {
      path: "../shared/assets/fonts/PretendardVariable.woff2",
      weight: "400 700",
      style: "normal",
    },
  ],
  variable: "--font-sans", // CSS 변수명
  display: "swap",
});

export const metadata: Metadata = {
  icons: "/switchwon_icon.jpg",
  title: "SwitchWon",
  description: "환전을 스위치 처럼 단번에 끝낼 수 있어요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* 3. className에 폰트 변수 추가 */}
      <body className={`${myLocalFont.variable} font-pretendard antialiased`}>
        {children}
      </body>
    </html>
  );
}
