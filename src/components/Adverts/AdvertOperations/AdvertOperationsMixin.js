export const queryModifications = {
  methods: {
    createTechnologiesEntryForSearchQuery(technologies) {
      //The Firestore query is incompatible with the multiselect formatting,
      //hence two entries are necessary - one works with multiselect, the other
      //with search query
      let technologiesForQuery = [];
      for (let technology of technologies) {
        technologiesForQuery.push(technology.name);
      }
      return technologiesForQuery;
    }
  }
};
