import React, { useState } from "react";
import { chatSession } from "../../../configs/AiModel";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import CustomLoading from "./_components/CustomLoading";

export default function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleSetData = (title, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [title]: value,
    }));
  };

  const handleGenerateVideo = async () => {
    setLoading(true);
    console.log("Generating Video with Data: ", formData);
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic: " +
      formData.topic +
      " along with AI image prompt in " +
      formData.style +
      " format for each scene and give me result in JSON format with imagePrompt and ContextText as field.";

    try {
      const result = await chatSession.sendMessage(prompt);
      console.log("Generated Script:", result.response.text()); // Assuming this is the correct way to access the response text
      // ... use the result from chatSession in your response
    } catch (e) {
      console.error("Error:", e);
      // Handle errors appropriately
    }
    setLoading(false);
  };

  const onCreateClickHandler = () => {
    handleGenerateVideo();
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Title and Description Section */}
      <div className="text-gray-700 bg-orange-100 rounded-xl p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Create New Project</h2>
        <p className="text-sm text-gray-500">
          Customize your video generation experience by selecting the topic,
          style, and duration.
        </p>
      </div>

      {/* Selection Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {" "}
        {/* 3 sütunlu grid */}
        <SelectTopic setData={handleSetData} />
        <SelectStyle setData={handleSetData} />
        <SelectDuration setData={handleSetData} />
      </div>

      {/* Preview Section */}
      <div className="text-gray-700 bg-orange-100 rounded-xl p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <ul className="list-disc space-y-2">
          {Object.keys(formData).map((key) => (
            <li key={key} className="text-sm ml-4">
              {`${key.charAt(0).toUpperCase()}${key.slice(1)}: ${
                formData[key]
              }`}
            </li>
          ))}
          {!Object.keys(formData).length && (
            <li className="text-sm text-gray-500">No options selected yet.</li>
          )}
        </ul>
      </div>

      {/* Action Button */}
      <button
        onClick={onCreateClickHandler}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
      >
        Generate Video
      </button>
      <CustomLoading loading={loading}></CustomLoading>
    </div>
  );
}
