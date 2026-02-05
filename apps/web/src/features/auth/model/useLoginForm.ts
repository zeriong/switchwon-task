"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginAction } from "../api/auth.actions";
import { useToastStore } from "@/shared/store/toastStore";
import { TOAST_MESSAGES } from "@/shared/constants/messages";
import { AUTH_CONFIG } from "@/shared/constants/config";

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
		const result = await loginAction(data.email);

		if (result.success && result.token) {
			Cookies.set("accessToken", result.token, {
				expires: AUTH_CONFIG.TOKEN_EXPIRY_DAYS,
			});

			showToast(TOAST_MESSAGES.AUTH.LOGIN_SUCCESS, "success");
			router.push("/");
		} else {
			showToast(result.error || TOAST_MESSAGES.AUTH.LOGIN_FAILURE, "error");
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
