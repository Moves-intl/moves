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

      <DropdownMenuContent className="bg-white border border-gray-200 w-56 p-2">
        {links.map((link) => (
          <DropdownMenuItem
            key={link.href}
            asChild
            // 1. Ensure focus/hover background is truly transparent
            className="p-0 focus:bg-transparent hover:bg-transparent relative group"
          >
            <Link
              to={link.href}
              className="flex items-center w-full py-2 px-2 font-montserrat text-gray-800 text-sm hover:text-gray-900 cursor-pointer"
            >
              {/* Horizontal line with transition for smooth animation */}
              <span
                className="
                  block h-[1px] bg-black 
                  w-0 group-hover:w-4 
                  opacity-0 group-hover:opacity-100 
                  mr-0 group-hover:mr-2 
                  transition-all duration-300 ease-in-out
                "
              ></span>
              <span className="text-black hover:text-gray-600">
                {link.name}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
