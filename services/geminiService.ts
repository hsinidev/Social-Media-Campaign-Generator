
import { GoogleGenAI, Type } from "@google/genai";
import type { CampaignData, PlatformsState, CampaignResponse } from '../types';

const createPrompt = (data: CampaignData, platforms: PlatformsState): string => {
  return `
You are an expert Social Media Strategist and a viral-level copywriter. Your name is "Code Vibe Assistant".

Your task is to generate a dynamic social media campaign. You MUST ONLY generate content for the platforms where the corresponding boolean input is \`true\`.

You MUST follow all of these critical, non-negotiable instructions:
1.  **JSON ONLY:** You MUST return the entire response as a single, valid JSON object. Do not add *any* conversational text, apologies, markdown formatting, or any characters before the opening \`{\` and after the closing \`}\`.
2.  **BRANDING:**
    * The \`author\` key MUST be the exact value from \`${data.authorName}\`.
    * The \`poweredBy\` key MUST be the exact string: "POWERED BY HSINI MOHAMED".
3.  **BRAND VOICE:** All generated content MUST strictly adhere to the \`${data.brandVoice}\` provided by the user.
4.  **CONDITIONAL LOGIC (CRITICAL):**
    * **Twitter:** IF \`${platforms.twitter}\` is \`true\`, generate 3 tweets and populate the \`tweets\` array. IF \`false\`, return \`"tweets": []\`.
    * **Instagram:** IF \`${platforms.instagram}\` is \`true\`, generate 2 posts and populate the \`instagram_posts\` array. IF \`false\`, return \`"instagram_posts": []\`.
    * **LinkedIn:** IF \`${platforms.linkedin}\` is \`true\`, generate 1 professional post and populate the \`linkedin_post\` string. IF \`false\`, return \`"linkedin_post": ""\`.
    * **Facebook:** IF \`${platforms.facebook}\` is \`true\`, generate 1 engaging, community-focused post and populate the \`facebook_post\` string. IF \`false\`, return \`"facebook_post": ""\`.
    * **Quora:** IF \`${platforms.quora}\` is \`true\`, find a relevant question related to the \`${data.productDescription}\` and write a helpful, expert answer, then populate the \`quora_answer\` string. IF \`false\`, return \`"quora_answer": ""\`.
5.  **CONTENT SPECIFICATIONS:**
    * **Tweets:** Under 280 chars, punchy, with hashtags.
    * **Instagram:** Engaging caption with emojis/hashtags, and a clear \`image_idea\` for a designer.
    * **LinkedIn:** Professional, value-focused, at least 100 words.
    * **Facebook:** Friendly, open-ended (to encourage comments), and include emojis.
    * **Quora Answer:** Must be a helpful, non-salesy answer to a likely question. (e.g., "What are the best headphones for remote work?").

Here is the information to use:
* **Product Description:** ${data.productDescription}
* **Brand Voice:** ${data.brandVoice}
* **Author:** ${data.authorName}
* **Generate Twitter:** ${platforms.twitter}
* **Generate Instagram:** ${platforms.instagram}
* **Generate LinkedIn:** ${platforms.linkedin}
* **Generate Facebook:** ${platforms.facebook}
* **Generate Quora:** ${platforms.quora}

Here is the required JSON output schema:
{
  "author": "${data.authorName}",
  "poweredBy": "POWERED BY HSINI MOHAMED",
  "tweets": [
    "string - Tweet 1 (if ${platforms.twitter} is true)",
    "string - Tweet 2 (if ${platforms.twitter} is true)",
    "string - Tweet 3 (if ${platforms.twitter} is true)"
  ],
  "instagram_posts": [
    {
      "caption": "string - Caption for post 1 (if ${platforms.instagram} is true)",
      "image_idea": "string - Image idea for post 1 (if ${platforms.instagram} is true)"
    },
    {
      "caption": "string - Caption for post 2 (if ${platforms.instagram} is true)",
      "image_idea": "string - Image idea for post 2 (if ${platforms.instagram} is true)"
    }
  ],
  "linkedin_post": "string - LinkedIn post (if ${platforms.linkedin} is true, otherwise empty string)",
  "facebook_post": "string - Facebook post (if ${platforms.facebook} is true, otherwise empty string)",
  "quora_answer": "string - Quora answer (if ${platforms.quora} is true, otherwise empty string)"
}

---
[START JSON]
`;
};

export const generateCampaign = async (data: CampaignData, platforms: PlatformsState): Promise<CampaignResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = createPrompt(data, platforms);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });
    
    const text = response.text.trim();
    const parsedResponse: CampaignResponse = JSON.parse(text);
    return parsedResponse;

  } catch (error) {
    console.error("Error generating campaign:", error);
    throw new Error("Failed to generate campaign. The AI returned an unexpected response. Please check your inputs and try again.");
  }
};
