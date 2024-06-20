import React from "react";
import Link from "next/link";

export default function Footer() {
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
    <footer class="bg-primary-500">
      <div class="w-full mx-auto p-4 max-w-screen-xl md:flex md:items-center md:justify-between">
        <span class="text-sm text-white">
          © 2024 7Span All Rights Reserved.
        </span>
        <ul class="flex flex-col sm:flex-row gap-5 items-center mt-3 text-sm font-medium text-white">
          {links.map((item) => {
            return (
              <li key={item.id}>
                <Link href={item.link} class="hover:underline">
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
