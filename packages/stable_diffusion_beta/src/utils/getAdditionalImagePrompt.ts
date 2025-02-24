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
