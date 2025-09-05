import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_APP_GEMINI_API_KEY
});

export async function generateBulletPointUsingAI(title:string,category:string,height:string,width:string,weight:string,surface:string,medium:string){
const context = `
    I want to list a painting with the following details:
    - Title: ${title}
    - Category: ${category}
    - Dimensions: ${height} x ${width} cm
    - Weight: ${weight}
    - Surface: ${surface}
    - Medium: ${medium}

    Please generate exactly 4 bullet points describing this painting,
    each around 10-20 words long, suitable for an online product listing.
  `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: context,
    });

    console.log("Generated Points:\n", response.text);
    //return response.text;
  } catch (err) {
    console.error("Error generating AI content:", err);
  }
}