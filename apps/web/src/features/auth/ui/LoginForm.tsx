"use client";

import Image from "next/image";
import { Box } from "@repo/ui/Box";
import { CTAButton } from "@repo/ui/CTAButton";
import { InputBox } from "@repo/ui/InputBox";
import { useLoginForm } from "../model/useLoginForm";
import logoSvg from "@/shared/assets/svg/logo.svg";

// 로그인 폼 컴포넌트
export default function LoginForm() {
	const { register, handleSubmit, errors, isSubmitting, onSubmit } =
		useLoginForm();

	return (
		<div className="flex flex-col items-center w-full max-w-[560px] px-4">
			{/* 로고 */}
			<Image
				src={logoSvg}
				alt="SwitchWon"
				width={80}
				height={80}
				className="w-12 h-12 md:w-20 md:h-20 mb-4 md:mb-6"
			/>

			{/* 제목 */}
			<h1 className="text-2xl md:text-[48px] font-bold text-pr-gray-800 mb-2 md:mb-3">
				반갑습니다.
			</h1>
			<p className="text-base md:text-[32px] text-pr-gray-500 mb-6 md:mb-10">
				로그인 정보를 입력해주세요.
			</p>

			{/* 로그인 폼 */}
			<Box className="w-full bg-pr-gray-0">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-6">
					<div>
						<label className="block text-sm md:text-[20px] text-pr-gray-600 mb-2 md:mb-3">
							이메일 주소를 입력해주세요.
						</label>
						<InputBox
							type="email"
							placeholder="test@test.com"
							className="text-base md:text-[20px]"
							{...register("email")}
						/>
						{errors.email && (
							<p className="mt-2 text-xs md:text-sm text-pr-default-red">
								{errors.email.message}
							</p>
						)}
					</div>

					<CTAButton type="submit" isPending={isSubmitting}>
						로그인 하기
					</CTAButton>
				</form>
			</Box>
		</div>
	);
}
