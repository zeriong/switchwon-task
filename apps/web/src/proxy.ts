import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOGIN_PATH = "/login";
const TOKEN_KEY = "accessToken";

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isAuthenticated = request.cookies.has(TOKEN_KEY);
	const isLoginPage = pathname.startsWith(LOGIN_PATH);

	if (!isAuthenticated && !isLoginPage) {
		return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
	}

	if (isAuthenticated && isLoginPage) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|switchwon_icon.jpg|.well-known).*)",
	],
};
