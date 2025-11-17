import React from "react";
import { Input } from "@/components/ui/input";
import countryData from "country-telephone-data";

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

        {/* Phone with country code */}
        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={formData.country_code}
            onChange={(e) => onInputChange("country_code", e.target.value)}
            className="h-10 w-16 border-gray-200 bg-gray-50 rounded-lg text-sm font-medium px-2"
          >
            {countryData.allCountries.map((country) => (
              <option key={country.iso2} value={`+${country.dialCode}`}>
                +{country.dialCode}
              </option>
            ))}
          </select>
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
