"use client";
import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { useState } from "react";
import { UsersIcon } from "@/assets/icons/user-icon";
import { ArrowLeft } from "@/assets/icons/arrow-left";
import { ArrowRight } from "@/assets/icons/arrow-right";

const Sidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  return (
    <>
      <div
        className={`h-screen overflow-hidden flex flex-col border-r ${
          isOpenSidebar
            ? "w-64 ease-in duration-150"
            : "w-20 overflow-hidden ease-in duration-150"
        }`}
      >
        <div className="flex border-b justify-center h-20">
          <Link
            href={"/"}
            className="font-semibold text-lg flex items-center cursor-pointer "
          >
            <img
              src={logo.src}
              alt="logo"
              className="object-contain h-16 w-16"
            />
            {isOpenSidebar && (
              <span className="text-4xl text-black dark:text-white font-bold">
                7Span
              </span>
            )}
          </Link>
        </div>
        <div className="flex-grow mt-4 overflow-auto focus:ring-transparent">
          <Link
            className={`flex text-lg hover:bg-primary-500 py-2 px-4 hover:text-white ${
              isOpenSidebar ? "justify-start" : "justify-center"
            }`}
            href="/user"
          >
            <UsersIcon className={`${isOpenSidebar && "mr-2"} h-6 w-6`} />
            {isOpenSidebar && <p>User List</p>}
          </Link>
        </div>

        <button
          onClick={() => {
            setIsOpenSidebar(!isOpenSidebar);
          }}
          className="flex items-center justify-between p-4 text-xl"
        >
          {isOpenSidebar ? (
            <>
              Collapse <ArrowLeft className="ml-5 h-8 w-8" />
            </>
          ) : (
            <ArrowRight className="h-8 w-8" />
          )}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
