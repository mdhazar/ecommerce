import { Link } from "@tanstack/react-router";
import {
	ChevronDown,
	Heart,
	Menu,
	Search,
	ShoppingBag,
	User,
	X,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/ui/common/Brand";
import { ThemeToggle } from "@/components/ui/common/ThemeToggle";
import { cn } from "@/lib/utils";
import { useCategories } from "@/queries/categories";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { Category } from "@/types/models";
import CartDropdown from "../components/ui/cart/CartDropdown";

const GENDERS = [
	{ code: "k", label: "Women" },
	{ code: "e", label: "Men" },
] as const;

const NAV_LINKS = [
	{ to: "/", label: "Home" },
	{ to: "/about", label: "About" },
	{ to: "/blog", label: "Journal" },
	{ to: "/contact", label: "Contact" },
] as const;

const Navbar: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [shopOpen, setShopOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);

	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const { data: categories = [] } = useCategories();
	const cart = useCartStore((state) => state.cart);
	const wishlistCount = useWishlistStore((state) => state.items.length);

	const shopRef = useRef<HTMLDivElement>(null);
	const cartRef = useRef<HTMLDivElement>(null);
	const userRef = useRef<HTMLDivElement>(null);

	const cartCount = cart.reduce((total, item) => total + item.count, 0);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (shopRef.current && !shopRef.current.contains(target))
				setShopOpen(false);
			if (cartRef.current && !cartRef.current.contains(target))
				setCartOpen(false);
			if (userRef.current && !userRef.current.contains(target))
				setUserMenuOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = () => {
		logout();
		setUserMenuOpen(false);
		setMenuOpen(false);
	};

	const linkClass =
		"text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
			<nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
				<Brand />

				{/* Desktop navigation */}
				<div className="hidden items-center gap-7 lg:flex">
					<Link to="/" className={linkClass}>
						Home
					</Link>

					<div className="relative" ref={shopRef}>
						<button
							type="button"
							onClick={() => setShopOpen((open) => !open)}
							className={cn(linkClass, "flex items-center gap-1")}
							aria-expanded={shopOpen}
						>
							Shop
							<ChevronDown
								size={15}
								className={cn("transition-transform", shopOpen && "rotate-180")}
							/>
						</button>
						{shopOpen && (
							<div className="absolute left-1/2 top-full z-50 mt-3 w-[26rem] -translate-x-1/2 rounded-lg border border-border bg-popover p-5 shadow-xl">
								<div className="mb-3 flex items-center justify-between">
									<Link
										to="/shop"
										className="text-sm font-semibold text-foreground hover:text-primary"
										onClick={() => setShopOpen(false)}
									>
										Shop all
									</Link>
								</div>
								<div className="grid grid-cols-2 gap-6">
									{GENDERS.map((gender) => (
										<div key={gender.code}>
											<p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
												{gender.label}
											</p>
											<ul className="space-y-1.5">
												{categories
													.filter((c: Category) => c.gender === gender.code)
													.slice(0, 6)
													.map((category: Category) => (
														<li key={category.id}>
															<Link
																to="/shop"
																search={{
																	gender: gender.code,
																	category: String(category.id),
																}}
																className="block text-sm text-muted-foreground transition-colors hover:text-primary"
																onClick={() => setShopOpen(false)}
															>
																{category.title}
															</Link>
														</li>
													))}
											</ul>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{NAV_LINKS.slice(1).map((link) => (
						<Link key={link.to} to={link.to} className={linkClass}>
							{link.label}
						</Link>
					))}
				</div>

				{/* Right-side actions */}
				<div className="flex items-center gap-1 sm:gap-2">
					<Link
						to="/search"
						className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
						aria-label="Search"
					>
						<Search size={18} />
					</Link>

					<ThemeToggle />

					<Link
						to="/wishlist"
						className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
						aria-label="Wishlist"
					>
						<Heart size={18} />
						{wishlistCount > 0 && (
							<span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
								{wishlistCount}
							</span>
						)}
					</Link>

					<div className="relative" ref={cartRef}>
						<button
							type="button"
							onClick={() => setCartOpen((open) => !open)}
							className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
							aria-label="Cart"
						>
							<ShoppingBag size={18} />
							{cartCount > 0 && (
								<span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
									{cartCount}
								</span>
							)}
						</button>
						<CartDropdown
							isOpen={cartOpen}
							onClose={() => setCartOpen(false)}
						/>
					</div>

					{/* Account (desktop) */}
					{user?.email ? (
						<div className="relative hidden lg:block" ref={userRef}>
							<button
								type="button"
								onClick={() => setUserMenuOpen((open) => !open)}
								className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-accent"
							>
								<img
									src={user.gravatarUrl}
									alt=""
									className="h-7 w-7 rounded-full object-cover"
								/>
								<span className="max-w-[8rem] truncate text-sm font-medium">
									{user.name || user.email}
								</span>
								<ChevronDown size={15} className="text-muted-foreground" />
							</button>
							{userMenuOpen && (
								<div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-popover py-1.5 shadow-xl">
									<Link
										to="/orders"
										className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
										onClick={() => setUserMenuOpen(false)}
									>
										Order history
									</Link>
									<Link
										to="/wishlist"
										className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
										onClick={() => setUserMenuOpen(false)}
									>
										Wishlist
									</Link>
									<button
										type="button"
										onClick={handleLogout}
										className="block w-full px-4 py-2 text-left text-sm text-destructive transition-colors hover:bg-accent"
									>
										Sign out
									</button>
								</div>
							)}
						</div>
					) : (
						<Link
							to="/login"
							className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:inline-flex"
						>
							<User size={17} />
							Sign in
						</Link>
					)}

					{/* Mobile menu toggle */}
					<button
						type="button"
						onClick={() => setMenuOpen((open) => !open)}
						className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent lg:hidden"
						aria-label="Menu"
						aria-expanded={menuOpen}
					>
						{menuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</nav>

			{/* Mobile drawer */}
			{menuOpen && (
				<div className="border-t border-border bg-background lg:hidden">
					<div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
						<Link
							to="/shop"
							className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
							onClick={() => setMenuOpen(false)}
						>
							Shop all
						</Link>
						{NAV_LINKS.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}
						<div className="my-2 h-px bg-border" />
						{user?.email ? (
							<>
								<Link
									to="/orders"
									className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
									onClick={() => setMenuOpen(false)}
								>
									Order history
								</Link>
								<button
									type="button"
									onClick={handleLogout}
									className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-destructive hover:bg-accent"
								>
									Sign out
								</button>
							</>
						) : (
							<div className="flex gap-2 px-3 py-1">
								<Link
									to="/login"
									className="flex-1 rounded-md border border-border px-3 py-2.5 text-center text-sm font-medium hover:bg-accent"
									onClick={() => setMenuOpen(false)}
								>
									Sign in
								</Link>
								<Link
									to="/signup"
									className="flex-1 rounded-md bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
									onClick={() => setMenuOpen(false)}
								>
									Register
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
