"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { User } from "next-auth";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="sticky top-0 z-50 w-[80%] mx-auto border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">
              RF
            </span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Real Feedback
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session ? (
            <>
              <span className="text-xs text-muted-foreground hidden md:block font-medium">
                {user.username || user.email}
              </span>
              <Button
                onClick={() => signOut()}
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Log out
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button size="sm" className="text-xs h-8 px-4">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
