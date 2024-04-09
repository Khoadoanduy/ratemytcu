const fs = require('fs');

const AUTHORIZATION_TOKEN = "Basic dGVzdDp0ZXN0";
const SCHOOL_IDS = [
    "U2Nob29sLTEwMDg="
];

const PROFESSOR_ID_QUERY = `
    query ($query: TeacherSearchQuery!) {
        newSearch {
            teachers(query: $query) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    }
`;

const PROFESSOR_DATA_QUERY = `
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

const fetchProfessorId = async (profName) => {
    for (const schoolId of SCHOOL_IDS) {
        const response = await fetchProfessorIdForSchool(profName, schoolId);
        if (response.data.newSearch.teachers.edges.length !== 0) {
            return response;
        }
    }
    return null;
};

const fetchProfessorIdForSchool = async (profName, schoolId) => {
    const response = await fetch("https://www.ratemyprofessors.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": AUTHORIZATION_TOKEN,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: PROFESSOR_ID_QUERY,
            variables: {
                query: { text: profName, schoolID: schoolId },
            },
        }),
    });
    return response.json();
};

const fetchProfessorData = async (profId) => {
    const response = await fetch("https://www.ratemyprofessors.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": AUTHORIZATION_TOKEN,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: PROFESSOR_DATA_QUERY,
            variables: {
                id: profId,
            },
        }),
    });
    const data = await response.json();
    if (data.errors) {
        throw new Error(data.errors[0].message);
    }
    return data;
};

const writeProfessorDataToFile = async (profId, data) => {
    return new Promise((resolve, reject) => {
        const filePath = `professor_${profId}.json`;
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(filePath);
            }
        });
    });
};

const queryProfessorData = async (profName) => {
    try {
        const professorIdResponse = await fetchProfessorId(profName);
        if (professorIdResponse) {
            const professorId = professorIdResponse.data.newSearch.teachers.edges[0].node.id;
            const professorData = await fetchProfessorData(professorId);
            const filePath = await writeProfessorDataToFile(professorId, professorData);
            console.log(`Professor data saved to: ${filePath}`);
        } else {
            console.log("Professor not found.");
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
};

// Example usage
queryProfessorData("Liran Ma");