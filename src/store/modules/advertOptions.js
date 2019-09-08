const state = {
  technologiesGrouped: [
    {
      language: "Javascript",
      libs: [
        { name: "Vue.js" },
        { name: "React" },
        { name: "Node.js" },
        { name: "Adonis" },
        { name: "Vanilla JS" }
      ]
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
        { name: "Phoenix", category: "Backend" },
        { name: "HTML/CSS", category: "none" }
      ]
    },
    {
      language: "Database",
      libs: [{ name: "MySQL" }, { name: "MongoDB" }]
    }
  ],
  technologiesSingle: [
    { name: "HTML/CSS" },
    { name: "Vanilla JS" },
    { name: "Vue.js" },
    { name: "React" },
    { name: "Node.js" },
    { name: "MySQL" },
    { name: "Adonis" },
    { name: "Rails" },
    { name: "Sinatra" },
    { name: "Laravel" },
    { name: "Phoenix" }
  ],
  countries: [
    { name: "Poland" },
    { name: "England" },
    { name: "Germany" },
    { name: "Italy" },
    { name: "France" },
    { name: "Paraguay" }
  ],
  languages: [{ name: "english" }, { name: "polish" }, { name: "german" }],
  difficultyLevels: [
    { name: "beginner" },
    { name: "medium" },
    { name: "advanced" },
    { name: "expert" }
  ]
};

export default { state };
