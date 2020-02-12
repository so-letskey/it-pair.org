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
    { name: "Germany" }
    // { name: "Italy" },
    // { name: "France" },
    // { name: "Paraguay" }
  ],
  cities: [
    { name: "Warsaw" },
    { name: "London" },
    { name: "Berlin" },
    { name: "Lodz" },
    { name: "Cracow" },
    { name: "Wroclaw" },
    { name: "Gdansk" },
    { name: "Poznan" },
    { name: "Szczecin" },
    { name: "Bydgoszcz" },
    { name: "Lublin" },
    { name: "Katowice" },
    { name: "Gdynia" },
    { name: "Czestochowa" },
    { name: "Radom" },
    { name: "Sosnowiec" },
    { name: "Torun" },
    { name: "Kielce" },
    { name: "Rzeszow" },
    { name: "London" },
    { name: "Manchester" },
    { name: "Birmingham-Wolverhampton" },
    { name: "Leeds-Bradford" },
    { name: "Glasgow" },
    { name: "Southampton-Portsmouth" },
    { name: "Liverpool" },
    { name: "Newscastle" },
    { name: "Nottingham" },
    { name: "Sheffield" },
    { name: "Bristol" },
    { name: "Belfast" },
    { name: "Leicester" },
    { name: "Berlin" },
    { name: "Hamburg" },
    { name: "Munich" },
    { name: "Cologne" },
    { name: "Frankfurt am Main" },
    { name: "Stuttgart" },
    { name: "Dusseldorf" },
    { name: "Dortmund" },
    { name: "Essen" },
    { name: "Leipzig" },
    { name: "Bremen" },
    { name: "Dresden" },
    { name: "Hanover" },
    { name: "Nuremberg" },
    { name: "Duisburg" },
    { name: "Bochum" },
    { name: "Wuppertal" }
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
