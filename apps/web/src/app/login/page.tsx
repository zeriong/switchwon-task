"use client";

import { Box } from "@repo/ui/Box";
import { CTAButton } from "@repo/ui/CTAButton";
import { InputBox } from "@repo/ui/InputBox";
import { useState } from "react";

export default function Login() {
	const [isPending, setIsPending] = useState(false);

	const handleClick = () => {
		setIsPending(true);
		setTimeout(() => {
			setIsPending(false);
		}, 1000);
	};
	return (
		<div>
			<h1>Login</h1>
			<InputBox theme="gray" placeholder="이메일" readOnly />
			<InputBox placeholder="비밀번호" />
			<CTAButton type="button" isPending={isPending}>
				로그인
			</CTAButton>{" "}
			<CTAButton type="button" isPending={false} onClick={handleClick}>
				클릭시 로그인 빙빙
			</CTAButton>
			<Box>
				<h1>Login</h1>
			</Box>
		</div>
	);
}
