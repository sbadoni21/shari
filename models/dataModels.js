
// export const listModel = {
//   title: {
//     type: "string",
//   },
//   type: "list",
//   heading: { type: "string" },
//   content: { type: "string" },
//   heading: { type: "string" },
//   type: { type: "string" },
// };
// export const stepModel = {
//   title: { type: "string" },
//   type: "steps",
//   heading: { type: "string" },
//   steps: {
//     type: "array",


//     content: { type: "string" },
//     sno: { type: "string" },
//   },
// };

//DONE
export const routineModel = {
  title: { type: "string" },
  description: { type: "string" },
  heroImage: { type: "string" },
};
export const bigHighlightedLineModel = {
  type: "bigHighlightedLine",
  name: "Big Highlighted Line",
  color: { type: "string" },
  content: { type: "string" },
};
export const paragraphModel = {
  type: "paragraph",
  name: "Paragraph",
  content: { type: "string" },
};
export const highlightedParagraphModel = {
  type: "highlightedParagraph",
  name: "Highlighted Paragraph",
  color: { type: "string" },
  content: { type: "string" },
};
export const mediumLineModel = {
  type: "mediumLine",
  name: "Medium Line",
  content: { type: "string" },
};
export const smallLineModel = {
  type: "smallLine",
  name: "Small Line",
  content: { type: "string" },
};
export const largeLineModel = {
  type: "largeLine",
  name: "Large Line",
  content: { type: "string" },
};
export const smallItalicLineModel = {
  name: "Small Italic Line",
  type: "smallItalicLine",
  content: { type: "string" },
};
export const mediumItalicLineModel = {
  name: "Medium Italic Line",
 type: "mediumItalicLine",
  content: { type: "string" },
};
export const largeItalicLineModel = {
  type: "largeItalicLine",
  name: "Large Italic Line",
  content: { type: "string" },
};
export const space10Model = {
  type: "space10",
  name :"Space 10"
};
export const space20Model = {
  type: "space20",
  name :"Space 20"
};
export const space30Model = {
  type: "space30",
  name :"Space 30"
};
export const boldLine = {
  type: "bold Line",
  name :"Bold Line"
};
export const quoteModel = {
  type: "quote",
  name: "Quote",
  text: { type: "string" },
  author: { type: "string" },
};
export const captionModel = {
  type: "caption",
  name: "Caption",
  text: { type: "string" },
};
export const headingModel = {
  type: "heading",
  name: "Heading",
  text: { type: "string" },
  level: { type: "number" }, 
};
export const tagModel = {
  type: "tag",
  name: "Tag",
  text: { type: "string" },
};

export const listItemModel = {
  type: "listItem",
  name: "List Item",
  text: { type: "string" },
};

export const codeBlockModel = {
  type: "codeBlock",
  name: "Code Block",
  code: { type: "string" },

};

export const horizontalRuleModel = {
  type: "horizontalRule",
  name: "Horizontal Rule",
};