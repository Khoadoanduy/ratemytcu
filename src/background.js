
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

const fetchProfIDFallbackLoop = (profName) => {
	return new Promise(async (resolve, reject) => {
		let response = null;
		let raw_response = null;
		for (let i = 0; i < SCHOOL_IDS.length; i++) {
			const SCHOOL_ID = SCHOOL_IDS[i];
			raw_response = await fetch(
				"https://www.ratemyprofessors.com/graphql",
				{
					method: "POST",
					headers: {
						Authorization: AUTHORIZATION_TOKEN,
					},
					body: JSON.stringify({
						query: PROFESSOR_ID_QUERY,
						variables: {
							query: { text: profName, schoolID: SCHOOL_ID },
						},
					}),
				}
			);

			response = await raw_response.json();
			if (response.data.newSearch.teachers.edges.length !== 0) {
				resolve(response);
				return;
			}
		}

		resolve(response);
		return;
	});
};

const profIDCache = new Map();
const fetchProfID = async (profName) => {
	if (!profIDCache.has(profName)) {
		const profIDFetch = fetchProfIDFallbackLoop(profName);
		profIDCache.set(profName, profIDFetch);
	}
	return profIDCache.get(profName);
};

const queryProfID = async function queryProfIDAsync(profName, sendResponse) {
	try {
		const response = await fetchProfID(profName);
		sendResponse(response);
	} catch (error) {
		sendResponse(new Error(error));
	}
};

const profDataCache = new Map();
const fetchProfData = (profID) => {
	if (!profDataCache.has(profID)) {
		const profDataFetch = fetch(
			"https://www.ratemyprofessors.com/graphql",
			{
				method: "POST",
				headers: {
					Authorization: AUTHORIZATION_TOKEN,
				},
				body: JSON.stringify({
					query: PROFESSOR_DATA_QUERY,
					variables: {
						id: profID,
					},
				}),
			}
		);
		console.log(profDataFetch)
		// return profDataFetch;
		profDataCache.set(profID, profDataFetch);
	} // Debugging purposes
	return profDataCache.get(profID);
};

const queryProfData = async function queryProfDataAsync(profID, sendResponse) {
	try {
        console.log("starting fetching");
		const raw_response = await fetchProfData(profID);
		const response = await raw_response.clone().json();

		sendResponse(response);
	} catch (error) {
		sendResponse(new Error(error));
	}
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.contentScriptQuery) {
		case "queryProfID":
            console.log("received ID query");
			queryProfID(request.profName, sendResponse);
			return true;

		case "queryProfData":
            console.log("received review query");
			queryProfData(request.profID, sendResponse);
			return true;

		default:
			return true;
	}
});
