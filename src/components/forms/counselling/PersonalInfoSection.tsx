import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import countryData from "country-telephone-data";
import { Input } from "@/components/ui/input";

interface PersonalInfoSectionProps {
  formData: {
    student_name: string;
    student_email: string;
    student_phone: string;
    country_code?: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  onInputChange,
}) => {
  const getFlagEmoji = (countryCode: string) =>
    countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(char.charCodeAt(0) + 127397)
      );

  return (
    <>
      {/* Name Fields */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Input
            id="first_name"
            value={formData.student_name.split(" ")[0] || ""}
            onChange={(e) => {
              const lastName = formData.student_name
                .split(" ")
                .slice(1)
                .join(" ");
              onInputChange(
                "student_name",
                `${e.target.value} ${lastName}`.trim()
              );
            }}
            required
            className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg"
            placeholder="First Name *"
          />
        </div>
        <div className="space-y-1.5">
          <Input
            id="last_name"
            value={formData.student_name.split(" ").slice(1).join(" ") || ""}
            onChange={(e) => {
              const firstName = formData.student_name.split(" ")[0] || "";
              onInputChange(
                "student_name",
                `${firstName} ${e.target.value}`.trim()
              );
            }}
            required
            className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg"
            placeholder="Last Name *"
          />
        </div>
      </div>

      {/* Email and Phone */}
      <div className="flex flex-col md:flex-row gap-3 mt-3">
        {/* Email */}
        <div className="flex-1 space-y-1.5">
          <Input
            id="student_email"
            type="email"
            value={formData.student_email}
            onChange={(e) => onInputChange("student_email", e.target.value)}
            required
            className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg w-full"
            placeholder="Email address *"
          />
        </div>

        {/* Phone with Shadcn Dropdown */}
        <div className="flex gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-10 w-16 text-left px-2 rounded-lg border border-gray-200 bg-gray-50 text-black hover:bg-gray-50">
                {formData.country_code || "+977"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 max-h-60 overflow-auto">
              {countryData.allCountries
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((country) => (
                  <DropdownMenuItem
                    key={country.iso2}
                    onClick={() =>
                      onInputChange("country_code", `+${country.dialCode}`)
                    }
                  >
                    <span className="mr-2">{getFlagEmoji(country.iso2)}</span>
                    <span className="flex-1">{country.name}</span>
                    <span className="text-gray-500">+{country.dialCode}</span>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Phone input */}
          <Input
            id="student_phone"
            type="tel"
            value={formData.student_phone}
            onChange={(e) => onInputChange("student_phone", e.target.value)}
            required
            className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg flex-1"
            placeholder="Mobile number *"
          />
        </div>
      </div>
    </>
  );
};
