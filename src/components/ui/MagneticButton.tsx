"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMagneticButton } from "@/hooks";
import { buttonVariants, type ButtonProps } from "./Button";

interface MagneticButtonProps extends ButtonProps {
  href?: string;
  external?: boolean;
}

export function MagneticButton({
  href,
  external,
  variant,
  size,
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const magneticRef = useMagneticButton(0.25);

  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    if (external) {
      return (
        <a
          ref={magneticRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          data-cursor="pointer"
        >
          <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
        </a>
      );
    }

    return (
      <Link
        ref={magneticRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        data-cursor="pointer"
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
      </Link>
    );
  }

  return (
    <button
      ref={magneticRef as React.RefObject<HTMLButtonElement>}
      className={classes}
      data-cursor="pointer"
      {...props}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}
