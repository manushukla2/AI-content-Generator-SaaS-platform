"use client";
"use router";
import {
  FileClock,
  Home,
  HomeIcon,
  Menu,
  Settings,
  WalletCards,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UsageTrack from "./UsageTrack";
// Import the UsageTrack component
function SideNav() {
  const Menulist = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/setting",
    },
  ];
  const path = usePathname();
  const router = useRouter();
  return (
    <div className="overflow-y-scroll p-4 shadow-sm border bg-white">
      <div className="flex justify-center ">
        <img src={"/logo.svg"} alt="logo" width={120} height={90} />
      </div>
      <hr className="my-3 border" />
      <div className="mt-3">
        {Menulist.map((menu, index) => (
          <div
            onClick={() => {
              router.push(`${menu.path}`);
            }}
            className={`flex gap-2 mb-2 p-3
          hover:bg-primary hover:text-white rounded-lg cursor-pointer
          
          ${path == menu.path && "bg-primary text-white"}`}
          >
            <menu.icon />
            <h2 className="text-lg">{menu.name}</h2>
          </div>
        ))}
      </div>
      <div className="w-full">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
