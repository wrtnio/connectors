export const handleImagePrompt = (content: string) => {
  if (!content) throw new Error(`outputText is falsy: ${content}`);

  const lineArray = content.split("\n");
  const [text, category] = lineArray[0].split(".");

  return { englishText: text, category };
};

export const getAdditionalImagePrompt = (category: string) => {
  if (category === "Human") {
    return {
      text: "ugly, poorly drawn hands, poorly drawn feet, extra limbs, disfigured, deformed, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, amateur, distorted face, blurry, draft, grainy",
      weight: -1,
    };
  }

  if (category === "Animal") {
    return { text: "deformed, disfigured", weight: -1 };
  }

  return null;
};
