export const bigHighlightedLineModel = {
  title: { type: "string" },
  type: "list",
  sno: { type: "string" },
  listItems: {
    heading: { type: "string" },
    content: { type: "string" },
    sno: { type: "string" },
  },
};

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

export const listModel = {
  title: "Under-Eye Care Routine Model",
  type: "list",
  sno: { type: "string" },
  listItems: {
    heading: { type: "string" },
    listItems: {
      content: { type: "string" },
      heading: { type: "string" },
      sno: { type: "string" },
      type: { type: "string" },
    },
  },
};

export const paragraphModel = {
  title: { type: "string" },
  type: "paragraph",
  content: { type: "string" },
  heading: { type: "string" },
  image: { type: "string" },
  italicLine: { type: "string" },
  sno: { type: "string" },
  type: { type: "string" },
};

export const routineModel = {
  title: { type: "string" },
  description: { type: "string" },
  heroImage: { type: "string" },
};

export const smallItalicLineModel = {
  title: { type: "string" },
  type: "smallItalicLine",
  sno: { type: "string" },
  content: { type: "string" },
};

export const stepModel = {
  title: { type: "string" },
  type: "steps",

  heading: { type: "string" },
  sno: { type: "string" },
  steps: {
    type: "array",
    items: {
      type: "object",
      properties: {
        content: { type: "string" },
        sno: { type: "string" },
      },
    },
  },
};
