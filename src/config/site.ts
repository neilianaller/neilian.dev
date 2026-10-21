export interface CounterItem {
  label: string;
  value: number;
  suffix?: string;
}

export interface SocialLinks {
  github: string;
  email: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  youtube: string;
}

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  tagline: string;
  email: string; // TODO: replace with real email
  heroWords: string[];
  counters: CounterItem[];
  socials: SocialLinks;
}

export const site: SiteConfig = {
  name: "NEILIAN.DEV",
  url: "https://neilian.dev",
  description: "Web, mobile, and brand design.",
  tagline: "I build systems that work.",
  email: "neil@neilian.dev", // TODO: replace with real email
  heroWords: [
    "work",
    "scale",
    "solve",
    "last",
    "ship",
    "adapt",
    "perform",
    "endure",
    "connect",
    "automate",
    "protect",
    "grow",
    "simplify",
    "deliver",
  ],
  counters: [
    { label: "Deployed systems", value: 13 },
    { label: "Mobile apps launched", value: 3 },
    { label: "Logos designed", value: 18 },
    { label: "Books designed", value: 25 },
  ],
  socials: {
    github: "https://github.com/neilianaller",
    email: "mailto:neil@neilian.dev",
    facebook: "https://facebook.com/allerneil",
    instagram: "https://instagram.com/neilian.dev",
    linkedin: "https://linkedin.com/in/neiliandev",
    tiktok: "https://tiktok.com/@neilian.dev",
    youtube: "https://youtube.com/@neiliandev",
  },
};
