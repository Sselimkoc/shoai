"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectTopic({ setData, initialValue }) {
  const [selectedTopic, setSelectedTopic] = useState(initialValue || "");
  const textareaRef = useRef(null);

  const topics = [
    { value: "Custom Prompt", label: "Custom Prompt" },
    { value: "Random AI Story", label: "Random AI Story" },
    { value: "Funny Story", label: "Funny Story" },
    { value: "Scary Story", label: "Scary Story" },
    { value: "Romantic Story", label: "Romantic Story" },
    { value: "Detective Story", label: "Detective Story" },
    { value: "Horror Story", label: "Horror Story" },
    { value: "Comedy Story", label: "Comedy Story" },
    { value: "Historical Story", label: "Historical Story" },
    { value: "Motivational Story", label: "Motivational Story" },
    { value: "Educational Story", label: "Educational Story" },
    { value: "How-To Story", label: "How-To Story" },
    { value: "DIY Story", label: "DIY Story" },
  ];

  useEffect(() => {
    setSelectedTopic(initialValue || "");
  }, [initialValue]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

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
        <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-md bg-white text-gray-800">
          <SelectValue placeholder="Select a Topic" />
        </SelectTrigger>
        <SelectContent>
          {topics.map((topic) => (
            <SelectItem
              key={topic.value}
              value={topic.value}
              className="text-gray-700 hover:bg-gray-200"
            >
              {topic.label}
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
          <textarea
            ref={textareaRef}
            id="customPrompt"
            rows="1"
            className="w-full min-h-[40px] max-h-[200px] border text-gray-700 border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none overflow-hidden"
            placeholder="Type your prompt here..."
            onChange={(e) => {
              setData("topic", e.target.value);
              adjustTextareaHeight();
            }}
            onInput={adjustTextareaHeight}
          />
        </div>
      )}
    </div>
  );
}
