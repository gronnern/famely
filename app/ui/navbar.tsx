import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { User } from "@supabase/auth-js";

import { siteConfig } from "@/app/lib/site";
import { ThemeSwitch } from "@/app/ui/theme-switch";
import { Logo } from "@/app/ui/icons";
import { signOutAction } from "@/app/lib/actions";

type NavbarProps = {
  user: User | null;
};

export function Navbar({ user }: NavbarProps) {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Famely</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden sm:flex gap-4 justify-start ml-2">
          {user &&
            siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {user ? (
          <>
            <NavbarItem>Hey, {user.email}!</NavbarItem>
            <NavbarItem>
              <form action={signOutAction}>
                <Button size="sm" type="submit" variant="bordered">
                  Sign out
                </Button>
              </form>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button as={Link} href="sign-in" size="sm" variant="bordered">
                Sign in
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} href="/sign-up" size="sm">
                Sign up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {user ? (
          <NavbarItem>
            <form action={signOutAction}>
              <Button size="sm" type="submit" variant="bordered">
                Sign out
              </Button>
            </form>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Button as={Link} href="sign-in" size="sm" variant="bordered">
                Sign in
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} href="/sign-up" size="sm">
                Sign up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
}
