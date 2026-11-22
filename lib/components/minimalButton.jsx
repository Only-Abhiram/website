
import Link from "next/link";

export default function MinimalButton({ text, href }) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center justify-center gap-3
        px-6 py-4 
        rounded-xl
        border border-neutral-200
        text-sm font-medium text-black
        bg-white
        transition-all duration-300
      "
    >
      {text}
      <span className="ml-2">↗</span>
    </Link>
  );
}
