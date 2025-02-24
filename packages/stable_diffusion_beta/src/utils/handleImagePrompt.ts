export const handleImagePrompt = (content: string) => {
  if (!content) throw new Error(`outputText is falsy: ${content}`);

  const lineArray = content.split("\n");
  const [text, category] = lineArray[0]!.split(".");

  console.log("=========line Array==========");
  console.log(lineArray);
  if (!(text && category)) {
    throw new Error("Text or Category is undefined.");
  }

  return { englishText: text, category };
};
