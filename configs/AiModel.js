const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic : Funny Story with AI image prompt in Realistic  format for each scene and give me result in JSON  format with  imagePrompt and ContentText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "A photorealistic image of a very fluffy persian cat wearing oversized sunglasses, awkwardly perched on a miniature toy car, looking confused, with a bright yellow rubber duck in the background, indoors, daytime, high angle shot",\n    "contentText": "My cat, Mittens, isn\'t known for his grace. One time, he decided he was a race car driver..."\n  },\n  {\n     "imagePrompt": "A close-up, slightly blurry, photorealistic image of a toy car with a fluffy cat tail sticking out of it\'s drivers seat and an expression of comical panic on the face of the toy drivers, indoor, day time",\n    "contentText": "...or at least, he attempted to be. He crammed himself into my niece\'s toy car."\n  },\n  {\n     "imagePrompt": "A wide, photorealistic shot of a living room, with a persian cat wearing sunglasses sticking head first in the toy car, all wheels spinning mid-air, while a bewildered child tries to pull the cat out while holding a rubber duck, daytime, indoors",\n    "contentText": "Naturally, chaos ensued. Wheels spinning, Mittens completely stuck, the whole nine yards."\n  },\n    {\n     "imagePrompt": "A photorealistic image of a persian cat looking sheepish, sitting in a cardboard box, slightly dented, wearing sunglasses crookedly, toy car upside down next to it, with a rubber duck looking at the cat, indoor, daytime",\n    "contentText": "After a bit of a struggle, we rescued him. He spent the rest of the day sulking in a box. Sunglasses slightly askew, of course."\n  },\n   {\n     "imagePrompt": "A photorealistic  image of a close up of a persian cat wearing sunglasses, looking annoyed with a text overlay bubble that says: \'Worth it.\', indoor, daytime",\n      "contentText": "But hey, at least he had a good story to tell, even if he wouldn\'t admit it. Worth it."\n   }\n]\n```\n',
        },
      ],
    },
  ],
});
