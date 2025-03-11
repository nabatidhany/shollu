import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  Instagram,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Ringkasan Event",
    href: "#ringkasan-event",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
  {
    title: "Privacy",
    href: "#privacy",
  },
];

const Footer = () => {
  return (
    <footer className="dark:border-t mt-40 dark bg-[#0b685c] text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
          <div>
            {/* Logo */}
            <img src="/logo-2.svg" alt="Shadcn UI Blocks" className="h-8 w-auto" />

            <ul className="mt-6 flex items-center gap-4 flex-wrap">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-white hover:text-foreground"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-white text-center sm:text-start">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" target="_blank">
              Shollu
            </Link>
            . All rights reserved.
          </span>

          <div className="flex items-center gap-5 text-white">
            <Link href="#" target="_blank">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
