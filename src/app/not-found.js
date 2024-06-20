import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen gap-5">
      <h2 className="text-6xl font-bold text-primary-500">Oops !</h2>
      <p className="text-2xl">Page not found</p>
      <Link
        href={"/"}
        className="bg-primary-500 text-white text-xl p-2 rounded-lg"
      >
        Go To Homepage
      </Link>
    </div>
  );
}
