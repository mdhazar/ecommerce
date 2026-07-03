import type React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

/**
 * The single application shell: announcement bar + navbar + footer wrapped
 * around page content. Replaces the per-page copy-paste of
 * <Header/><Navbar/>…<Footer/> that every page used to repeat.
 */
export function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<Navbar />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}

export default SiteLayout;
