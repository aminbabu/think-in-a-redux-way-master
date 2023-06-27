const usernameShorter = (username = "", joiner = " ", limit = 2) => {
  const nameArr = username.split(" ");
  const modifiedUsername =
    nameArr.length <= limit
      ? nameArr.join(joiner)
      : nameArr.reduce(
          (name, namePart, index) =>
            index <= limit - 1
              ? `${name}${namePart} `
              : `${name}${namePart.slice(0, 1)}`,
          ""
        );

  return modifiedUsername;
};

export default usernameShorter;
