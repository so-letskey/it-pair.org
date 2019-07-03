const state = {
  technologiesGrouped: [
    {
      language: "Javascript",
      libs: [{ name: "Vue.js" }, { name: "Adonis" }]
    },
    {
      language: "Ruby",
      libs: [
        { name: "Rails", category: "Backend" },
        { name: "Sinatra", category: "Backend" }
      ]
    },
    {
      language: "Other",
      libs: [
        { name: "Laravel", category: "Backend" },
        { name: "Phoenix", category: "Backend" }
      ]
    }
  ],
  technologiesSingle: [
    { name: "Vue.js" },
    { name: "Adonis" },
    { name: "Rails", category: "Backend" },
    { name: "Sinatra", category: "Backend" },
    { name: "Laravel", category: "Backend" },
    { name: "Phoenix", category: "Backend" }
  ],
  difficultyLevels: ["beginner", "medium", "advanced"]
};

export default { state };
