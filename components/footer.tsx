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
import Logos07Page from "./logos-07/logos-07";

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
  {
    title: "Panduan Petugas",
    href: "/petunjuk-panitia",
  },
];

const Footer = () => {
  return (
    <>
      <Logos07Page />
      <footer className="dark:border-t mt-20 dark bg-[#0b685c] text-foreground">
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

            {/* Download App Section */}
            <div className="flex flex-col items-start">
              <h3 className="text-white text-lg font-semibold mb-2">Download Aplikasi</h3>
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
              <Link href="https://www.instagram.com/sholatchampions" target="_blank">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
