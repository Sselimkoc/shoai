import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectStyle({ setData }) {
  const [selectedStyle, setSelectedStyle] = useState("");
  const styles = [
    { name: "Realistic", image: "" },
    { name: "Cartoon", image: "" },
    { name: "Anime", image: "" },
    { name: "Pixel", image: "" },
    { name: "GTA", image: "" },
  ];

  const handleStyleChange = (value) => {
    setSelectedStyle(value);
    setData("style", value);
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      {/* Select Dropdown */}
      <Select value={selectedStyle} onValueChange={handleStyleChange}>
        <SelectTrigger className="w-[250px] border border-gray-300 rounded-md shadow-md bg-white text-gray-800">
          <SelectValue placeholder="Select Style" />
        </SelectTrigger>
        <SelectContent>
          {styles.map((style) => (
            <SelectItem
              key={style.name}
              value={style.name}
              className="text-gray-700 hover:bg-gray-200"
            >
              {style.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectStyle;
