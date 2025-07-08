import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {

	const className = ({ isActive }) => `px-2 ${isActive ? "border-b" : ""} border-black`;

	return (
		<div className="mx-auto max-w-3xl">
			<header className="mb-4">
				<nav className="flex items-center justify-between">
					<h1>FODMAP</h1>
					<div className="flex gap-3 items-center">
						<NavLink to="/" className={className}>Sv</NavLink>
						<NavLink to="/en" className={className}>En</NavLink>
					</div>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
}
