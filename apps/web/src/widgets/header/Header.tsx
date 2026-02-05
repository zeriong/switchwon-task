"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";
import logo from "@/shared/assets/svg/logo.svg";

const navItems = [
	{ href: "/", label: "환전 하기" },
	{ href: "/history", label: "환전 내역" },
];

export default function Header() {
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = () => {
		Cookies.remove("accessToken");
		router.push("/login");
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 py-3 md:py-4 border-b border-pr-gray-300 bg-white">
			{/* 로고 */}
			<Link href="/" className="flex items-center gap-2">
				<Image
					src={logo}
					alt="SwitchWon"
					width={24}
					height={24}
					className="w-5 h-5 md:w-6 md:h-6"
				/>
				<h1 className="text-lg md:text-2xl font-bold text-pr-gray-800">
					Exchange app
				</h1>
			</Link>

			{/* 네비게이션 + 로그아웃 */}
			<div className="flex items-center gap-4 md:gap-8">
				<nav className="flex items-center gap-4 md:gap-6">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={twMerge(
								"text-sm md:text-base font-medium transition-colors",
								pathname === item.href
									? "text-pr-gray-800"
									: "text-pr-gray-500 hover:text-pr-gray-700",
							)}
						>
							{item.label}
						</Link>
					))}
				</nav>
				<button
					type="button"
					onClick={handleLogout}
					className="px-3 md:px-4 py-1.5 md:py-2 bg-pr-blue-500 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-cta-1-hover transition-colors cursor-pointer"
				>
					Log out
				</button>
			</div>
		</header>
	);
}
