"use server";

const API_BASE_URL = "https://exchange-example.switchflow.biz";

interface LoginResult {
	success: boolean;
	token?: string;
	error?: string;
}

export async function loginAction(email: string): Promise<LoginResult> {
	try {
		const response = await fetch(
			`${API_BASE_URL}/auth/login?email=${encodeURIComponent(email)}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return {
				success: false,
				error: errorData.message || "로그인에 실패했습니다.",
			};
		}

		const data = await response.json();
		const token = data.data?.token;

		if (!token) {
			return {
				success: false,
				error: "토큰을 받지 못했습니다.",
			};
		}

		return { success: true, token };
	} catch (error) {
		console.error("Login error:", error);
		return {
			success: false,
			error: "로그인 중 오류가 발생했습니다.",
		};
	}
}
