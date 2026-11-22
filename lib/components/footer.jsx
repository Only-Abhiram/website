
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-black  pb-6 px-5 md:px-10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">


        {/* Large typography */}
        <div className="w-full select-none">
          <h1
            className="
              text-[19vw] md:text-[18.5vw]
              leading-[0.75]
              font-black
              tracking-[-0.085em]
              text-center
              whitespace-nowrap
              transition-all duration-500
              hover:tracking-[-0.045em]
            "
          >
            ABHIRAM
          </h1>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-12 pt-5 border-t border-neutral-200 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Abhiam. All rights reserved.</p>

          <span>
            Designed & Built by Abhiram
          </span>

         
        </div>

      </div>
    </footer>
  );
}
