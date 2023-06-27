import moment from "moment";

export const convertToISOString = (DateStr) => {
  return new Date(DateStr).toISOString();
};

export const convertToHTMLDateString = (DateStr) => {
  return moment(DateStr).format("YYYY-MM-DDTHH:mm:ss");
};
