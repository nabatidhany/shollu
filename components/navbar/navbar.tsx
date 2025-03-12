import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "../theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed z-10 top-3 inset-x-4 h-14 xs:h-16 bg-background/50 backdrop-blur-sm  max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Link href="/" passHref>
          <Logo />
        </Link>

        {/* Desktop Menu */}
      
        <div className="flex items-center gap-3">
          <NavMenu className="hidden md:block" />
          <ThemeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
