export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Famely",
  description:
    "Famely helps you organize your family&#39;s activities and tasks in a simple way.",
  navItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Lists",
      href: "/dashboard/lists",
    },
  ],

  links: {
    github: "https://github.com/gronnern/nextjs-with-supabase",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
