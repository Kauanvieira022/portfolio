import profile from "./profile";

const social = [
  {
    id: "github",
    label: "GitHub",
    href: profile.github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: profile.linkedin,
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${profile.email}`,
  },
];

export default social;
