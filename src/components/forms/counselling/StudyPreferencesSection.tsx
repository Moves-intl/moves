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
import { Textarea } from "@/components/ui/textarea";

interface StudyPreferencesSectionProps {
  formData: {
    preferred_destination: string;
    study_level: string;
    course_interest: string;
    current_education_level: string;
    english_test_score: string;
    work_experience: string;
    message: string;
  };
  destinations?: Array<{ id: string; name: string }>;
  studyLevels?: Array<{ id: string; name: string }>;
  onInputChange: (field: string, value: string) => void;
}

export const StudyPreferencesSection: React.FC<
  StudyPreferencesSectionProps
> = ({ formData, destinations, studyLevels, onInputChange }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Select
            value={formData.preferred_destination}
            onValueChange={(value) =>
              onInputChange("preferred_destination", value)
            }
          >
            <SelectTrigger className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg">
              <SelectValue placeholder="Your preferred study destination *" />
            </SelectTrigger>
            <SelectContent>
              {destinations?.map((destination) => (
                <SelectItem key={destination.id} value={destination.name}>
                  {destination.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Select
            value={formData.study_level}
            onValueChange={(value) => onInputChange("study_level", value)}
          >
            <SelectTrigger className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg">
              <SelectValue placeholder="When would you like to start? *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Immediately">Immediately</SelectItem>
              <SelectItem value="Within 3 months">Within 3 months</SelectItem>
              <SelectItem value="Within 6 months">Within 6 months</SelectItem>
              <SelectItem value="Within 12 months">Within 12 months</SelectItem>
              <SelectItem value="More than 12 months">
                More than 12 months
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Select
            value={formData.course_interest}
            onValueChange={(value) => onInputChange("course_interest", value)}
          >
            <SelectTrigger className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg">
              <SelectValue placeholder="Preferred mode of counselling *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Phone Call">Phone Call</SelectItem>
              <SelectItem value="Video Call">Zoom Session</SelectItem>
              <SelectItem value="In-Person">In-Person</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Select
            value={formData.current_education_level}
            onValueChange={(value) =>
              onInputChange("current_education_level", value)
            }
          >
            <SelectTrigger className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg">
              <SelectValue placeholder="Nearest Moves International Office *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sydney">Nepal Office</SelectItem>
              <SelectItem value="Online">Online</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Additional message field */}
      <div className="space-y-1.5">
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => onInputChange("message", e.target.value)}
          className="min-h-[80px] border-gray-200 focus:border-primary focus:ring-primary rounded-lg"
          placeholder="Additional message (optional)"
        />
      </div>
    </>
  );
};
