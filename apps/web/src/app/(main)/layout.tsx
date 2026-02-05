import Header from "@/widgets/header/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {/* 헤더 높이만큼 공간 확보 (fixed header) */}
      <div className="h-[52px] md:h-16" />
      {children}
    </div>
  );
}