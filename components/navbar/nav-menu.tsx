import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="#ringkasan-event">Ringkasan Event</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="#faq">FAQ</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="#testimonials">Testimonials</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      {/* <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/pejuang-quran">Pejuang Qur'an</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/smart-itikaf">Smart I'tikaf</Link>
        </NavigationMenuLink>
      </NavigationMenuItem> */}
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/sholat-champions" className="bg-yellow-400 font-bold px-2 py-1 rounded-2xl text-[#094641] animate-pulse-border-nav">Sholat Champions</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/petunjuk-panitia">Petunjuk Panitia/PJ</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="block lg:hidden md:hidden">
        <NavigationMenuLink asChild>
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-2">Download Aplikasi</h3>
            <Link 
              href="https://play.google.com/store/apps/details?id=com.furgetech.shollu" 
              target="_blank"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" 
                alt="Download di Play Store" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
