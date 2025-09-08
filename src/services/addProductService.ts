import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_APP_GEMINI_API_KEY
});

export async function generateBulletPointUsingAI(title:string,category:string,height:string,width:string,weight:string,surface:string,medium:string):Promise<string[]>{
const context = `
I want to list a painting with the following details:
- Title: ${title}
- Category: ${category}
- Dimensions: ${height} x ${width} cm
- Weight: ${weight}
- Surface: ${surface}
- Medium: ${medium}

Write exactly 4 bullet points, each approx 20 words long, suitable for an online product listing.

⚠️ Rules:
- Do not include any heading, introduction, or summary.
- Do not say "Here are the points" or similar.
- Output only the 4 bullet points as plain text, each starting with a dash (-).
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: context,
    });
    const text = response?.text||"";
    const points = text
      .split("\n")
      .map((line) => line.replace(/^[-*•]\s*/, "").trim())
      .filter((line) => line.length > 0)
      .slice(0, 4);
    return points
  } catch (err) {
    throw err;
  }
}