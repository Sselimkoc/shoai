"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDuration({ setData, initialValue }) {
  const [selectedDuration, setSelectedDuration] = useState(initialValue || "");
  const durations = [
    { value: "Short (15 seconds)", label: "Short (15 seconds)" },
    { value: "Medium (30 seconds)", label: "Medium (30 seconds)" },
    { value: "Long (1 minute)", label: "Long (1 minute)" },
  ];

  useEffect(() => {
    // initialValue değiştiğinde state'i güncelle
    setSelectedDuration(initialValue || "");
  }, [initialValue]);

  const handleDurationChange = (value) => {
    setSelectedDuration(value);
    setData("duration", value);
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      {/* Select Dropdown */}
      <Select value={selectedDuration} onValueChange={handleDurationChange}>
        <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-md bg-white text-gray-800">
          <SelectValue placeholder="Select a Duration" />
        </SelectTrigger>
        <SelectContent>
          {durations.map((duration) => (
            <SelectItem
              key={duration.value}
              value={duration.value}
              className="text-gray-700 hover:bg-gray-200"
            >
              {duration.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
