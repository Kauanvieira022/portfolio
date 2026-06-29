import profile from "./profile";

const social = [
  {
    label: "GitHub",
    href: profile.github,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
  },
];

export default social;
