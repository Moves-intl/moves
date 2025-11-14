import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export function HamburgerMenu() {
  const links = [
    { name: "About Us", href: "/about" },
    { name: "Blog & Resources", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
    { name: "Student Login", href: "/auth" },
    { name: "Student Portal", href: "/student-dashboard/home" },
    { name: "Careers", href: "/careers" },
    { name: "Success Stories", href: "/reviews" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Events", href: "/events" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="mr-2">
          <Menu />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-gray-900 border-none w-56 p-2">
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link
              to={link.href}
              className="text-gray-200 hover:text-accent transition-colors block"
            >
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
