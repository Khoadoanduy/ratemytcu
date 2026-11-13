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

const normalizeName = (name) =>
  (name || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getNameParts = (name) => {
  const normalized = normalizeName(name);
  if (!normalized) {
    return { first: "", last: "" };
  }

  const commaParts = name.split(",");
  if (commaParts.length >= 2) {
    return {
      first: normalizeName(commaParts.slice(1).join(" ")).split(" ")[0] || "",
      last: normalizeName(commaParts[0]),
    };
  }

  const parts = normalized.split(" ");
  return {
    first: parts[0] || "",
    last: parts[parts.length - 1] || "",
  };
};

const isExactProfessorMatch = (requestedName, professor) => {
  const requested = getNameParts(requestedName);
  const first = normalizeName(professor.firstName);
  const last = normalizeName(professor.lastName);

  if (!requested.first || !requested.last || !first || !last) {
    return false;
  }

  // TCU uses "Last, First", while the content script sends "First Last".
  return (
    (requested.first === first && requested.last === last) ||
    (requested.first === last && requested.last === first)
  );
};

const fetchProfIDFallbackLoop = async (profName) => {
  const SCHOOL_ID = "U2Nob29sLTEwMDg=";
  const rawResponse = await fetch("https://www.ratemyprofessors.com/graphql", {
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
  const response = await rawResponse.json();
  const edges = response?.data?.newSearch?.teachers?.edges || [];
  const matched = edges.find((edge) =>
    isExactProfessorMatch(profName, edge.node || {})
  );

  // Never return an unrelated first result when validation fails.
  return {
    ...response,
    data: {
      ...response.data,
      newSearch: {
        ...response.data?.newSearch,
        teachers: {
          ...response.data?.newSearch?.teachers,
          edges: matched ? [matched] : [],
        },
      },
    },
  };
};

const profIDCache = new Map();
const fetchProfID = async (profName) => {
  const cacheKey = normalizeName(profName);
  if (!profIDCache.has(cacheKey)) {
    const profIDFetch = fetchProfIDFallbackLoop(profName);
    profIDCache.set(cacheKey, profIDFetch);
  }
  return profIDCache.get(cacheKey);
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
