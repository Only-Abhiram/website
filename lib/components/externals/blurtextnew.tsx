"use client";

export default function BlurText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  return <p className={className}>{children}</p>;
}
