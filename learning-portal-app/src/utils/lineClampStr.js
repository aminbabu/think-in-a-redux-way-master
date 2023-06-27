const lineClampStr = (str = "", numberOfAlphabets = 48) => {
  const modifiedStr =
    str?.length > numberOfAlphabets
      ? str.split("").slice(0, numberOfAlphabets).join("") + "..."
      : str;

  return modifiedStr;
};

export default lineClampStr;
