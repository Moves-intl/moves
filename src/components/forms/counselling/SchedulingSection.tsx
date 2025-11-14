import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface SchedulingSectionProps {
  formData: {
    preferred_date: string;
    preferred_time: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const SchedulingSection: React.FC<SchedulingSectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <div className="relative">
          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            id="preferred_date"
            type="date"
            placeholder="Preferred Date"
            value={formData.preferred_date}
            onChange={(e) => onInputChange("preferred_date", e.target.value)}
            className="pl-10 h-10"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Select
          onValueChange={(value) => onInputChange("preferred_time", value)}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Preferred Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Morning (9 AM - 12 PM)">
              Morning (9 AM - 12 PM)
            </SelectItem>
            <SelectItem value="Afternoon (12 PM - 5 PM)">
              Afternoon (12 PM - 5 PM)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
