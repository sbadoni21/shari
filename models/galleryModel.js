
export const galleryModel = {
  title: {
    type: "string",
  },
  type: "gallery",

  imgURLs: {
    type: "array",
    items: {
      type: "string",
    },

    sno: { type: "string" },
  },
  required: ["imgURLs", "sno", "type"],
};
