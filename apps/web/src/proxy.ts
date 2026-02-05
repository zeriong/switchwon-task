import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
	console.log("프록시!", request.nextUrl.pathname);
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|switchwon_icon.jpg|.well-known).*)",
	],
};
