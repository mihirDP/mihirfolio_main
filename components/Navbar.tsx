"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  // { name: "Expertise", href: "#expertise" },
  // { name: "Tools", href: "#tools" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
      <div className="text-white text-lg px-4 font-extrabold">MIHIR</div>

      <ul className="hidden md:flex space-x-4">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <Button
                variant="ghost"
                className="text-white hover:text-white transition-all ease-in-out px-4 py-2 rounded-full border-white/10 hover:bg-white/20"
              >
                {item.name}
              </Button>
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white focus:outline-none ml-4"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <ul className="absolute top-full mt-2 left-0 right-0 bg-black/80 backdrop-blur-md rounded-xl p-4 space-y-3 md:hidden">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="block text-white text-sm hover:text-cyan-400 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
