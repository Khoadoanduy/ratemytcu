const AUTHORIZATION_TOKEN = "Basic dGVzdDp0ZXN0";

const PROFESSOR_DATA = `
query ($id: ID!) {
    node(id: $id) {
        ... on Teacher {
            id
            department
            legacyId
            firstName
            lastName
            avgRating
            numRatings
            avgDifficulty
            wouldTakeAgainPercent
        }
    }
}
`;
const profDataFetch = fetch(
    "https://www.ratemyprofessors.com/graphql",
    {
        method: "POST",
        headers: {
            Authorization: AUTHORIZATION_TOKEN,
        },
        body: JSON.stringify({
            query: PROFESSOR_DATA,
            variables: {
                id: '1749707',
            },
        }),
    }
);
console.log(profDataFetch)