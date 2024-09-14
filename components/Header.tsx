"use client";
// import { Bars3Icon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React, { useState } from "react";

function Header() {
  return (
    <header className="bg-[#013B94]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href={"/"} className="-m-1.5 p-1.5 text-white font-semibold">
            <span>Expense Tracker</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
