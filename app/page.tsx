"use client";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/app/lib/site";
import { title, subtitle } from "@/app/ui/primitives";
import { GithubIcon } from "@/app/ui/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Welcome to&nbsp;</span>
        <span className={title({ color: "violet" })}>Famely</span>
        <div className={subtitle({ class: "mt-4" })}>
          Famely helps you organize your family&#39;s activities and tasks in a
          simple way.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/sign-in"
        >
          Sign in
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          Documentation
        </Link>
      </div>
    </section>
  );
}
