const AUTHORIZATION_TOKEN = "Basic dGVzdDp0ZXN0";

const PROFESSOR_ID_QUERY = `
    query ($query: TeacherSearchQuery!) {
        newSearch {
            teachers(query: $query) {
                edges {
                    node {
                        id
                        firstName
                        lastName
                        legacyId
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

    const SCHOOL_ID = "U2Nob29sLTEwMDg=";
    console.log(profName, "from ID Fall Back Loo");

    raw_response = await fetch("https://www.ratemyprofessors.com/graphql", {
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
    });

    response = await raw_response.json();

    // normalize helper
    const normalize = (s) => (s || "").trim().toLowerCase();

    // parse incoming profName into first/last (supports "First Last", "Last", "First Middle Last")
    const parts = (profName || "").trim().split(/\s+/).filter(Boolean);
    let wantedFirst = "";
    let wantedLast = "";
    if (parts.length === 1) {
      wantedLast = parts[0];
    } else {
      wantedFirst = parts[0];
      wantedLast = parts[parts.length - 1];
    }

    const edges =
      (response &&
        response.data &&
        response.data.newSearch &&
        response.data.newSearch.teachers &&
        response.data.newSearch.teachers.edges) ||
      [];

    if (edges.length === 0) {
      resolve(response);
      return;
    }

    // try exact first+last match (case-insensitive), otherwise match last name only
    const matched = edges.find((e) => {
      const node = e.node || {};
      const fn = normalize(node.firstName);
      const ln = normalize(node.lastName);
      if (wantedFirst) {
        return ln === normalize(wantedLast) && fn === normalize(wantedFirst);
      }
      return ln === normalize(wantedLast);
    });

    if (matched) {
      // keep the shape the rest of your code expects, but narrow it to the matched edge
      const filteredResponse = JSON.parse(JSON.stringify(response));
      filteredResponse.data.newSearch.teachers.edges = [matched];
      resolve(filteredResponse);
      return;
    }

    // no precise match — return original response
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
    const profDataFetch = fetch("https://www.ratemyprofessors.com/graphql", {
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
    });
    profDataCache.set(profID, profDataFetch);
  }
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
