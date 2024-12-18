import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectDuration({ setData }) {
  const [selectedDuration, setSelectedDuration] = useState("");
  const durations = [
    "Short (15 seconds)",
    "Medium (30 seconds)",
    "Long (1 minute)",
  ];

  const handleDurationChange = (value) => {
    setSelectedDuration(value);
    setData("duration", value);
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      {/* Select Dropdown */}
      <Select value={selectedDuration} onValueChange={handleDurationChange}>
        <SelectTrigger className="w-[250px] border border-gray-300 rounded-md shadow-md bg-white text-gray-800">
          <SelectValue placeholder="Select Style" />
        </SelectTrigger>
        <SelectContent>
          {durations.map((duration) => (
            <SelectItem
              key={duration}
              value={duration}
              className="text-gray-700 hover:bg-gray-200"
            >
              {duration}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDuration;
