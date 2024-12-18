import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectTopic({ setData }) {
  const [selectedTopic, setSelectedTopic] = useState("");

  const topics = [
    "Custom Prompt",
    "Random AI Story",
    "Funny Story",
    "Scary Story",
    "Romantic Story",
    "Detective Story",
    "Horror Story",
    "Comedy Story",
    "Historical Story",
    "Motivational Story",
    "Educational Story",
    "How-To Story",
    "DIY Story",
  ];

  const handleTopicChange = (value) => {
    setSelectedTopic(value);
    if (value !== "Custom Prompt") {
      setData("topic", value);
    } else {
      setData("topic", ""); 
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      {/* Select Dropdown */}
      <Select value={selectedTopic} onValueChange={handleTopicChange}>
        <SelectTrigger className="w-[250px] border border-gray-300 rounded-md shadow-md bg-white text-gray-800">
          <SelectValue placeholder="Select Content Type" />
        </SelectTrigger>
        <SelectContent>
          {topics.map((topic) => (
            <SelectItem
              key={topic}
              value={topic}
              className="text-gray-700 hover:bg-gray-200"
            >
              {topic}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Conditional Content for Custom Prompt */}
      {selectedTopic === "Custom Prompt" && (
        <div className="w-full">
          <label
            htmlFor="customPrompt"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Enter your custom prompt:
          </label>
          <input
            id="customPrompt"
            type="text"
            className="w-full border text-gray-700 border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Type your prompt here..."
            onChange={(e) => setData("topic", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default SelectTopic;
