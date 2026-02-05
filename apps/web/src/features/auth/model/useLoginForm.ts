"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { login } from "../api/auth.api";
import { useToastStore } from "@/shared/store/toastStore";

// 로그인 폼 유효성 검사 스키마
const loginSchema = z.object({
	email: z.string().email("유효한 이메일 주소를 입력해주세요."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// 로그인 폼 로직 훅
export function useLoginForm() {
	const router = useRouter();
	const { showToast } = useToastStore();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormValues) => {
		try {
			const response = await login(data.email);

			// 쿠키에 토큰 저장 (1일 유효)
			Cookies.set("accessToken", response.token, { expires: 1 });

			showToast("로그인에 성공했습니다.", "success");
			router.push("/");
		} catch (error) {
			console.error(error);
			showToast("로그인에 실패했습니다. 다시 시도해주세요.", "error");
		}
	};

	return {
		register,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
	};
}
