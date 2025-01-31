"use client";

import React, { useState, useEffect, useRef } from "react";
import { chatSession } from "../../../configs/AiModel";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import CustomLoading from "./_components/CustomLoading";

export default function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState(null);
  const [audioLoadingStates, setAudioLoadingStates] = useState({});
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [savedFormData, setSavedFormData] = useState(null);
  const audioRef = useRef(null);
  const [selectedVoice, setSelectedVoice] = useState("Rachel");
  const [voiceSettings, setVoiceSettings] = useState({
    stability: 0.5,
    similarity_boost: 0.75,
  });
  const [audioStates, setAudioStates] = useState({});

  // LocalStorage'dan verileri yükle
  useEffect(() => {
    const savedData = localStorage.getItem("videoGeneratorFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleSetData = (title, value) => {
    const newFormData = {
      ...formData,
      [title]: value,
    };
    setFormData(newFormData);
    // LocalStorage'a kaydet
    localStorage.setItem("videoGeneratorFormData", JSON.stringify(newFormData));
  };

  const handleGenerateVideo = async () => {
    setLoading(true);
    console.log("Generating Video with Data: ", formData);
    if (!formData.topic || !formData.style || !formData.duration) {
      alert("Please select all options to generate video.");
      setLoading(false);
      return;
    }

    // Form verilerini kaydet
    setSavedFormData({ ...formData });

    const prompt = `
      Create a detailed video script for the selected topic: ${formData.topic}
      Video Duration: ${formData.duration}
      Video Style: ${formData.style}

      Please create a script following these rules:
      1. Each scene should contain 20-30 seconds of content
      2. Each scene should have a detailed visual description (imagePrompt) and speech text (contentText)
      3. Scenes should flow naturally with smooth transitions
      4. For each scene, imagePrompt should describe the visual content in detail (background, colors, objects, camera angles, etc.)
      5. contentText should have a natural and flowing conversational tone
      6. Create an appropriate number of scenes for ${formData.duration} (e.g., 3-4 scenes for 1 minute)
      7. Use a narrative and visual language appropriate for ${formData.style} style

      Provide the output in the following JSON format:
      [
        {
          "imagePrompt": "Detailed visual description",
          "contentText": "Scene speech text"
        }
      ]

      NOTE: Please provide output in JSON format only, without any additional explanation.
    `;

    try {
      const result = await chatSession.sendMessage(prompt);
      const scriptText = result.response.text();
      console.log("Generated Script:", scriptText);

      // JSON'ı temizle ve parse et
      const cleanJson = scriptText
        .replace(/```json\n?/, "")
        .replace(/```\n?$/, "")
        .trim();

      try {
        const parsedScript = JSON.parse(cleanJson);
        setGeneratedScript(parsedScript);

        // Form verilerini sıfırla
        localStorage.removeItem("videoGeneratorFormData");
        setFormData({});

        // Select komponentlerini sıfırla
        if (typeof window !== "undefined") {
          const selectElements = document.querySelectorAll("select");
          selectElements.forEach((select) => {
            select.value = "";
          });
        }
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        alert("Failed to parse the generated script. Please try again.");
      }
    } catch (e) {
      console.error("Error:", e);
      alert("Failed to generate script. Please try again.");
    }
    setLoading(false);
  };

  const handleGenerateAudio = async (text, sceneIndex) => {
    setShowVoiceSettings(true); // Ses ayarlarını göster
    setAudioLoadingStates((prev) => ({
      ...prev,
      [sceneIndex]: true,
    }));

    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice: selectedVoice,
          voice_settings: voiceSettings,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setAudioStates((prev) => ({
        ...prev,
        [sceneIndex]: data.audio,
      }));
    } catch (error) {
      console.error("Failed to generate audio:", error);
      alert("Failed to generate audio. Please try again.");
    } finally {
      setAudioLoadingStates((prev) => ({
        ...prev,
        [sceneIndex]: false,
      }));
    }
  };

  const handleReset = () => {
    // Formu sıfırla
    localStorage.removeItem("videoGeneratorFormData");
    setFormData({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 mb-8 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Create New Project
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Transform your ideas into engaging videos with AI. Customize every
          aspect of your video by selecting the perfect combination of topic,
          style, and duration.
        </p>
      </div>

      {/* Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-orange-100 overflow-visible">
          <SelectTopic setData={handleSetData} initialValue={formData.topic} />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-orange-100 overflow-visible">
          <SelectStyle setData={handleSetData} initialValue={formData.style} />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-orange-100 overflow-visible">
          <SelectDuration
            setData={handleSetData}
            initialValue={formData.duration}
          />
        </div>
      </div>

      {/* Preview & Action Buttons */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-orange-100">
        <div className="flex justify-between items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Preview
            </h2>
            <div className="bg-gray-50 rounded-xl p-4">
              {Object.keys(formData).length > 0 ? (
                <div className="space-y-3">
                  {Object.keys(formData).map((key) => (
                    <div
                      key={key}
                      className="flex items-center bg-white p-3 rounded-lg shadow-sm"
                    >
                      <span className="font-medium text-gray-700 w-24">{`${key
                        .charAt(0)
                        .toUpperCase()}${key.slice(1)}:`}</span>
                      <span className="text-gray-600">{formData[key]}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">
                  <svg
                    className="w-12 h-12 mx-auto mb-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>
                    No options selected yet. Start customizing your video above!
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 min-w-[200px]">
            <button
              onClick={handleReset}
              className="w-full bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Reset
            </button>
            <button
              onClick={handleGenerateVideo}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>{loading ? "Generating..." : "Generate Video"}</span>
              {!loading && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Script Section */}
      {generatedScript && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-orange-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Generated Script
          </h2>

          <div className="space-y-6">
            {generatedScript.map((scene, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">
                    Scene {index + 1}
                  </h3>
                  <button
                    onClick={() =>
                      handleGenerateAudio(scene.contentText, index)
                    }
                    disabled={audioLoadingStates[index]}
                    className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {audioLoadingStates[index] ? (
                      <span>Generating Audio...</span>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Generate Audio</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-600 mb-2">{scene.contentText}</p>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Image Prompt:</p>
                  <p className="text-gray-700">{scene.imagePrompt}</p>
                </div>

                {/* Audio Player - Sadece ses oluşturulduğunda göster */}
                {audioStates[index] && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>Voice: {selectedVoice}</span>
                      <div className="flex space-x-4">
                        <span>Stability: {voiceSettings.stability}</span>
                        <span>Clarity: {voiceSettings.similarity_boost}</span>
                      </div>
                    </div>
                    <audio
                      controls
                      src={`data:audio/mp3;base64,${audioStates[index]}`}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Voice Settings Modal - Popup şeklinde göster */}
          {showVoiceSettings && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium text-gray-800">
                    Voice Settings
                  </h3>
                  <button
                    onClick={() => setShowVoiceSettings(false)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Voice
                    </label>
                    <select
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-gray-700 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    >
                      <option value="Rachel" className="text-gray-700">
                        Rachel (Balanced)
                      </option>
                      <option value="Domi" className="text-gray-700">
                        Domi (Strong)
                      </option>
                      <option value="Bella" className="text-gray-700">
                        Bella (Soft)
                      </option>
                      <option value="Antoni" className="text-gray-700">
                        Antoni (Balanced)
                      </option>
                      <option value="Elli" className="text-gray-700">
                        Elli (Young)
                      </option>
                      <option value="Josh" className="text-gray-700">
                        Josh (Deep)
                      </option>
                      <option value="Arnold" className="text-gray-700">
                        Arnold (Strong)
                      </option>
                      <option value="Adam" className="text-gray-700">
                        Adam (Professional)
                      </option>
                      <option value="Sam" className="text-gray-700">
                        Sam (Trustworthy)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voice Stability: {voiceSettings.stability}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={voiceSettings.stability}
                      onChange={(e) =>
                        setVoiceSettings((prev) => ({
                          ...prev,
                          stability: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-orange-500"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Higher values make the voice more consistent but may
                      reduce expressiveness
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voice Clarity: {voiceSettings.similarity_boost}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={voiceSettings.similarity_boost}
                      onChange={(e) =>
                        setVoiceSettings((prev) => ({
                          ...prev,
                          similarity_boost: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-orange-500"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Higher values make the voice clearer and more similar to
                      the original
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                    <button
                      onClick={() => setShowVoiceSettings(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowVoiceSettings(false)}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <CustomLoading loading={loading} />
    </div>
  );
}
