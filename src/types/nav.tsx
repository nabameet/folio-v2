type NavItemLink = {
  type: "link";
  href: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

type NavItemButton = {
  type: "button";
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type NavItem = NavItemLink | NavItemButton;
