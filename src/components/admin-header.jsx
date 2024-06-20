"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DarkMode, LightMode } from "@/assets/icons/theme-icon";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import logo from "@/assets/images/logo.svg";
import { toast } from "./ui/use-toast";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  return (
    <>
      <div className="flex h-20 items-center justify-end border-b px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="outline-0">
              <LightMode className="h-7 w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <DarkMode className="absolute h-7 w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={logo.src} className="object-center h-6 w-6" />
              <AvatarFallback>7</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-80">
          <div className="flex flex-col items-center">
            Are you sure you want to Logout ?
            <div className="flex gap-4 mt-6">
              <Button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
              >
                cancel
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  router.push("/login");
                  toast({
                    title: "Logout Successfully",
                  });
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
