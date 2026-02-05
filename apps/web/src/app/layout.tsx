import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/shared/styles/globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Toast from "@/shared/ui/Toast";
import ScrollToTop from "@/shared/ui/ScrollToTop";

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
        <QueryProvider>
          <ScrollToTop />
          {children}
          <Toast />
        </QueryProvider>
      </body>
    </html>
  );
}
