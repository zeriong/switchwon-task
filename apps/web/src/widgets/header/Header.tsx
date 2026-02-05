import Image from "next/image";
import logo from "@/shared/assets/svg/logo.svg";

export default function Header() {
	return (
		<header className="flex items-center gap-2 px-10 py-4 border-b border-pr-gray-300 m-0">
			<Image src={logo} alt="header icon" width={24} height={24} />
			<h1 className="text-2xl font-bold">Exchange app</h1>
		</header>
	);
}
