"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectStyle({ setData, initialValue }) {
  const [selectedStyle, setSelectedStyle] = useState(initialValue || "");
  const styles = [
    { value: "Realistic", label: "Realistic", image: "" },
    { value: "Cartoon", label: "Cartoon", image: "" },
    { value: "Anime", label: "Anime", image: "" },
    { value: "Pixel", label: "Pixel", image: "" },
    { value: "GTA", label: "GTA", image: "" },
  ];

  useEffect(() => {
    // initialValue değiştiğinde state'i güncelle
    setSelectedStyle(initialValue || "");
  }, [initialValue]);

  const handleStyleChange = (value) => {
    setSelectedStyle(value);
    setData("style", value);
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      {/* Select Dropdown */}
      <Select value={selectedStyle} onValueChange={handleStyleChange}>
        <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-md bg-white text-gray-800">
          <SelectValue placeholder="Select a Style" />
        </SelectTrigger>
        <SelectContent>
          {styles.map((style) => (
            <SelectItem
              key={style.value}
              value={style.value}
              className="text-gray-700 hover:bg-gray-200"
            >
              {style.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
