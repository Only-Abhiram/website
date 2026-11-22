
import React from "react";
import Link from 'next/link';
const Navbar = () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Projects", href: "/projects" },
    { name: "DSA", href: "/dsa" },
    { name: "blog", href: "/blog" },
  ];

  return (
    <nav className="fixed top-5 left-0 w-full z-50  px-3 ">
      <div className="mx-auto w-full max-w-[620px]">
        <div
          className="
            relative flex items-center justify-between
            w-full
            px-1.5 sm:px-1
            py-2 sm:py-1
            rounded-full

            bg-white/45
            backdrop-blur-sm
            backdrop-saturate-150

            border border-white/80
            outline outline-3 outline-black/[0.06]

            shadow-[0_8px_32px_rgba(0,0,0,0.08)]
            ring-1 ring-inset ring-white/60

            before:absolute
            before:inset-0
            before:rounded-full
            before:bg-gradient-to-b
            before:from-white/60
            before:to-transparent
            before:pointer-events-none
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                relative z-10
                flex-1 min-w-0
                flex items-center justify-center
                px-1 sm:px-3
                py-2.5
                rounded-full

                text-[11px] min-[380px]:text-xs sm:text-base
                font-medium text-black
                whitespace-nowrap

                transition-all duration-300 ease-out
                hover:bg-white/70
                hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]
                active:scale-95
              "
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
