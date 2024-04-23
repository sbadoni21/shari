
export const routineModel = {
    title: { type: "string" },
    type: "object",
    properties: {
      content: {
        type: "array",
        items: {
          type: "object",
          properties: {
            description: { type: "string" },
            heroImage: { type: "string" },
            timestamp: { type: "string" },
            title: { type: "string" }
          },
          required: ["description", "timestamp", "title"]
        }
      }
    },
    required: ["content"]
  };
  