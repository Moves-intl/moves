import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filters } from "@/hooks/useCourseFilters";
import { supabase } from "@/integrations/supabase/client";

interface CourseFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

export const CourseFilters = ({
  filters,
  setFilters,
  resetFilters,
  hasActiveFilters,
}: CourseFiltersProps) => {
  const [studyAreas, setStudyAreas] = useState<string[]>([]);
  const [studyLevels, setStudyLevels] = useState<string[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const [{ data: areas }, { data: levels }] = await Promise.all([
        supabase.from("course_study_areas").select("name").order("name"),
        supabase.from("course_study_levels").select("name").order("name"),
      ]);

      setStudyAreas(areas?.map((a) => a.name) ?? []);
      setStudyLevels(levels?.map((l) => l.name) ?? []);
    };

    fetchFilters();
  }, []);

  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-xl border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Study Area */}
        <Select
          value={filters.study_area}
          onValueChange={(value) =>
            setFilters({ ...filters, study_area: value })
          }
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Study Area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Study Areas</SelectItem>
            {studyAreas.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Study Level */}
        <Select
          value={filters.level}
          onValueChange={(value) => setFilters({ ...filters, level: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Study Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {studyLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Country (still static) */}
        <Select
          value={filters.country}
          onValueChange={(value) => setFilters({ ...filters, country: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="Australia">Australia</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="UK">United Kingdom</SelectItem>
            <SelectItem value="USA">United States</SelectItem>
            <SelectItem value="New Zealand">New Zealand</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Active filters:
          </span>

          {filters.search && (
            <Badge className="bg-primary/10 text-primary">
              Search: "{filters.search}"
            </Badge>
          )}

          {filters.study_area !== "all" && (
            <Badge className="bg-primary/10 text-primary">
              {filters.study_area}
            </Badge>
          )}

          {filters.level !== "all" && (
            <Badge className="bg-primary/10 text-primary">
              {filters.level}
            </Badge>
          )}

          {filters.country !== "all" && (
            <Badge className="bg-primary/10 text-primary">
              {filters.country}
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-6 px-2 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
