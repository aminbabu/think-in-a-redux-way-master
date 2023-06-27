const lineClamp = (str = "", numberOfWords = 10) => {
  const strArr = str.split(" ");
  const modifiedStr =
    strArr?.length > numberOfWords
      ? strArr.slice(0, numberOfWords).join(" ") + "..."
      : str;

  return modifiedStr;
};

export default lineClamp;
