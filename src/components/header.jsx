"use client";
import Logo from "@/assets/icons/logo";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleToggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const links = [
    {
      id: 1,
      label: "Home",
      link: "/",
    },
    {
      id: 2,
      label: "Service",
      link: "/service",
    },
    {
      id: 3,
      label: "Contact Us",
      link: "/contact-us",
    },
    {
      id: 4,
      label: "About",
      link: "/about",
    },
  ];
  return (
    <header>
      <nav className="flex justify-between md:items-center p-5 h-full bg-primary-500">
        <Logo className="w-40 h-10" />

        {mobileMenu && (
          <ul className="flex flex-col gap-10 md:hidden">
            {links.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={item.link} className="text-white font-semibold">
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <Button
          variant="ghost"
          className="block md:hidden p-0"
          onClick={handleToggleMobileMenu}
        >
          {mobileMenu ? (
            <X className="text-white" />
          ) : (
            <Menu className="text-white" />
          )}
        </Button>
        <ul className="hidden md:flex md:flex-row gap-10">
          {links.map((item) => {
            return (
              <li key={item.id}>
                <Link href={item.link} className="text-white font-semibold">
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
