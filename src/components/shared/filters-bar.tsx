import * as React from "react";
import { CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
}

interface FiltersBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showDateRange?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  onDateFromChange?: (date: Date | undefined) => void;
  onDateToChange?: (date: Date | undefined) => void;
  statusOptions?: FilterOption[];
  statusValue?: string;
  onStatusChange?: (value: string) => void;
  schoolOptions?: FilterOption[];
  schoolValue?: string;
  onSchoolChange?: (value: string) => void;
  customFilters?: React.ReactNode;
  onClearFilters?: () => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  showDateRange = false,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  statusOptions,
  statusValue,
  onStatusChange,
  schoolOptions,
  schoolValue,
  onSchoolChange,
  customFilters,
  onClearFilters,
}) => {
  const hasActiveFilters = React.useMemo(() => {
    return !!(
      searchValue ||
      dateFrom ||
      dateTo ||
      statusValue ||
      schoolValue
    );
  }, [searchValue, dateFrom, dateTo, statusValue, schoolValue]);

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          {onSearchChange && (
            <div className="flex-1">
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-10"
              />
            </div>
          )}

          {/* Date Range Filters */}
          {showDateRange && (
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal h-10 min-w-[140px]",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "From date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={onDateFromChange}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal h-10 min-w-[140px]",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "To date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={onDateToChange}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Status Filter */}
          {statusOptions && onStatusChange && (
            <Select value={statusValue} onValueChange={onStatusChange}>
              <SelectTrigger className="w-[140px] h-10">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* School Filter */}
          {schoolOptions && onSchoolChange && (
            <Select value={schoolValue} onValueChange={onSchoolChange}>
              <SelectTrigger className="w-[160px] h-10">
                <SelectValue placeholder="All Schools" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Schools</SelectItem>
                {schoolOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Custom Filters */}
          {customFilters}

          {/* Clear Filters */}
          {hasActiveFilters && onClearFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="h-10"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchValue && (
              <Badge variant="secondary">
                Search: {searchValue}
              </Badge>
            )}
            {dateFrom && (
              <Badge variant="secondary">
                From: {format(dateFrom, "PP")}
              </Badge>
            )}
            {dateTo && (
              <Badge variant="secondary">
                To: {format(dateTo, "PP")}
              </Badge>
            )}
            {statusValue && (
              <Badge variant="secondary">
                Status: {statusOptions?.find(opt => opt.value === statusValue)?.label}
              </Badge>
            )}
            {schoolValue && (
              <Badge variant="secondary">
                School: {schoolOptions?.find(opt => opt.value === schoolValue)?.label}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};