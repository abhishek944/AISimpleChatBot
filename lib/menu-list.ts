import {
  Tag,
    Brain,
    MessageSquare,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export const SideBarTitle = "AI Chat-Bot"
export const SignOut = "Sign Out"

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/chat",
          label: "Chat",
          active: pathname.includes("/chat"),
          icon: MessageSquare,
          submenus: []
        },
        {
          href: "/train",
          label: "Train",
          active: pathname.includes("/train"),
          icon: Brain,
          submenus: []
        },
        {
            href: "/labels",
            label: "Labels",
            active: pathname.includes("/labels"),
            icon: Tag,
            submenus: []
        }
      ]
    }
  ];
}
