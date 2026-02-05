"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Currency } from "../model/exchange.types";
import usdSvg from "@/shared/assets/svg/usd.svg";
import jpySvg from "@/shared/assets/svg/jpy.svg";
import { twMerge } from "tailwind-merge";

interface CurrencyOption {
	value: Currency;
	label: string;
	icon: string;
}

const currencyOptions: CurrencyOption[] = [
	{ value: "USD", label: "미국 USD", icon: usdSvg },
	{ value: "JPY", label: "일본 JPY", icon: jpySvg },
];

interface CurrencySelectProps {
	value: Currency;
	onChange: (currency: Currency) => void;
}

export default function CurrencySelect({
	value,
	onChange,
}: CurrencySelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const selectedOption = currencyOptions.find((opt) => opt.value === value);

	// 외부 클릭 시 닫기
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (currency: Currency) => {
		onChange(currency);
		setIsOpen(false);
	};

	return (
		<div ref={containerRef} className="relative">
			{/* 선택된 값 표시 버튼 */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 text-base md:text-lg font-bold text-pr-gray-800 bg-transparent cursor-pointer"
			>
				<Image
					src={selectedOption?.icon || usdSvg}
					alt={value}
					width={24}
					height={24}
					className="w-5 h-5 md:w-6 md:h-6"
				/>
				<span>{value} 환전하기</span>
				<svg
					className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-label="dropdown arrow"
					role="img"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			{/* 드롭다운 목록 */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-pr-gray-200 overflow-hidden z-50 min-w-[160px] py-2"
					>
						{currencyOptions.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => handleSelect(option.value)}
								className={twMerge(
									"w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer",
									value === option.value && "bg-blue-100/60",
								)}
							>
								<Image
									src={option.icon}
									alt={option.value}
									width={20}
									height={20}
									className="w-5 h-5"
								/>
								<span className="text-sm text-pr-gray-800">{option.label}</span>
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
