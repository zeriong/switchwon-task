import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/shared/styles/globals.css";
import QueryProvider from "@/providers/QueryProvider";

const pretendard = localFont({
  src: [
    {
      path: "../shared/assets/fonts/PretendardVariable.woff2",
      weight: "400 700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
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
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
