
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

        }
      },
  

  };
  