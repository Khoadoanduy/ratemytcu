window.addEventListener("load", waitForFirstLoad, false);

function waitForFirstLoad() {
  let tableTimer = setInterval(checkForTableInDOM, 50);

  function checkForTableInDOM() {
    if (document.getElementsByClassName("results").length > 0) {
      clearInterval(tableTimer);
      startObserver();
    }
  }
}

function startObserver() {
  // console.log("Page fully loaded");
  // trigger first time
  onRenderHandler();
}
function onRenderHandler() {
  // check if there is h1 tag with content "No classes found"
  if ($('span:contains("No matching classes were found")').length > 0) {
    // console.log("NONE");
    return;
  }
  // console.log("FOUND");

  // Set up RMP column
  var classListForColumns = [
    "class",
    "course",
    "note",
    "sec/ses",
    "type",
    "core/code",
    "title",
    "rmp",
    "startDate",
    "instruction",
    "day",
    "room",
    "status",
    "maxEnr",
    "waitlist",
    "courseMat",
  ];
  addRMPCol();
  addClassToElements(".results th", classListForColumns);

  var classListBody = ["general", "classTableInfo"];
  addClassToElements("tbody", classListBody);

  addClassToRows();
  addClassToBox();
  addBox();
  processScore();
  // for each row, get each row, fetch data, append data
}

function addClassToElements(selector, classNames) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (element, index) {
    if (classNames[index]) {
      element.classList.add(classNames[index]);
    }
  });
}

// Usage example with different class names for each th

function addRMPCol() {
  if ($(".results th.rmp").length > 0) {
    $(".results th.rmp").first().text("RMP");
    return;
  }

  const nativeRmpHeader = $(".results th").filter(function () {
    return $(this).text().trim() === "RMP";
  });

  if (nativeRmpHeader.length > 0) {
    const columnIndex = nativeRmpHeader.first().index();
    nativeRmpHeader.first().remove();
    $(".results tbody tr").each(function () {
      $(this).children("td").eq(columnIndex).remove();
    });
  }

  let placeholderHeader = $("<th>").addClass("rmp").text("RMP");
  const titleHeader = $(".results th.title").length
    ? $(".results th.title").first()
    : $(".results th").eq(6);
  titleHeader.after(placeholderHeader);

  // let tableRows = $(".course");
  // for (row of tableRows) {
  // 	$(row).css("grid-column-start", "1");
  // }
}

function addClassToRows() {
  var rows = document.querySelectorAll(".classTableInfo tr");
  var classNames = Array.from(
    { length: rows.length },
    (_, index) => "class" + (index + 1)
  );

  rows.forEach(function (row, index) {
    row.classList.add(classNames[index]);
  });
}

// Call the function

function addClassToBox() {
  var rows = document.querySelectorAll(".classTableInfo tr");

  rows.forEach(function (row) {
    var tds = row.querySelectorAll("td");
    tds.forEach(function (td, index) {
      td.classList.add("box" + (index + 1));
    });
  });
}

function addBox() {
  var rows = document.querySelectorAll(".classTableInfo tr");
  rows.forEach(function (row) {
    var tds = row.querySelectorAll("td");
    if (!row.querySelector(".rmpRes")) {
      let placeholderBox = $("<td>").addClass("rmpRes").text("loading");
      $(row).find(".box7").after(placeholderBox);
    }
  });
}
function addBoxLogin() {
  $(".classTableInfo tr").each(function () {
    var row = $(this);
    if (!row.find(".rmpRes").length) {
      var anchorElement = $("<a>")
        .attr("href", "javascript:__doPostBack('lgvInstructor$ctl01','')")
        .text("login");
      var placeholderBox = $("<td>").addClass("rmpRes").append(anchorElement);
      row.find(".box7").after(placeholderBox);
    }
  });
}

function getProfessorNamesFromSearch() {
  var professorNames = [];
  var tableRows = document.querySelectorAll("table.results tbody tr");

  tableRows.forEach(function (row) {
    var courseInfoCell = row.querySelector("td.box7");
    if (courseInfoCell) {
      var courseInfoLines = courseInfoCell.innerHTML
        .split(/<br\s*\/?>/i)
        .map(function (line) {
          var element = document.createElement("span");
          element.innerHTML = line;
          return element.textContent.trim();
        })
        .filter(Boolean);
      var courseInfo = courseInfoLines[courseInfoLines.length - 1] || "";

      if (/\bstaff\b/i.test(courseInfo)) {
        professorNames.push("Staff");
        return;
      }

      var parts = courseInfo.split(",");
      if (parts.length >= 2) {
        var lastName = parts[0].trim();
        var firstName = parts
          .slice(1)
          .join(" ")
          .trim()
          .split(/\s+/)[0];
        professorNames.push([firstName, lastName].filter(Boolean).join(" "));
      } else {
        professorNames.push(undefined);
      }
    }
  });
  return professorNames;
}
async function processScore() {
  var names = getProfessorNamesFromSearch(); // names is an array
  if (
    names.length > 4 &&
    names[0] === undefined &&
    names[1] === undefined &&
    names[2] === undefined
  ) {
    // review = $("<a>").attr("href", "javascript:__doPostBack('lgvInstructor$ctl01','')").text("login");
    // Step 1: Create the anchor element
    $(".rmpRes").text("");
    var anchorElement = document.createElement("a");

    // Step 2: Set the href attribute
    anchorElement.setAttribute(
      "href",
      "javascript:__doPostBack('lgvInstructor$ctl01','')"
    );

    // Step 3: Set the text content
    anchorElement.textContent = "login";

    // Step 4: Find the <td> element with class "rmpRes"

    // Step 5: Append the anchor element to the <td> element
    $(".rmpRes").append(anchorElement);
    return;
  } else {
    let profReviewPromises = names.map(async function (profName) {
      let review;
      if (profName === "Staff" || profName === undefined) {
        review = "N/A";
      } else {
        review = await getReview(profName);
      }
      return review;
    });

    // Wait for all promises to resolve
    let profReviewList = await Promise.all(profReviewPromises);

    // Insert score into DOM
    for (const [index, profReview] of profReviewList.entries()) {
      if (names[index] === "Staff" || names[index] === undefined) {
        $(".rmpRes").eq(index).text("N/A");
      } else {
        $(".rmpRes").eq(index).empty();
        if (profReview !== null && !(profReview instanceof jQuery)) {
          let HydratedProfScoreComp = ProfReviewComp(profReview);
          $(".rmpRes").eq(index).append(HydratedProfScoreComp);
        } else if (profReview instanceof jQuery) {
          $(".rmpRes").eq(index).append(profReview);
        } else {
          $(".rmpRes").eq(index).text("N/A");
        }
      }
    }
  }
}

function ProfReviewComp(profData, hasNext) {
  if (profData.numRatings === 0) {
    return `<a target="_blank" href="https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${profData.legacyId}">N/R</a>`;
  }

  let colorCode = "#03C03C";
  if (profData.avgRating < 2.5) colorCode = "#FF9C9C";
  else if (profData.avgRating < 3.5) colorCode = "#FFD700";

  let addComma = hasNext ? ", " : " ";
  const rmpUrl = `https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${profData.legacyId}`;

  return `
    <div class="prof-container">
      <a style="text-decoration: none;" target="_blank" href="${rmpUrl}">
        <span class="prof-anchor" style="color:${colorCode}; font-size:1.5em; font-weight: bold;">
          ${profData.avgRating}
        </span>
        <span style="color:black;">${addComma}</span>
      </a>
      
      <div class="prof-info">
        <div class="prof-name">
          <strong>${profData.firstName} ${profData.lastName}</strong>
        </div>
        
        <div class="ratings-box-container">
          <div class="rating-box">
            <span class="rating-val" style="color:${colorCode};">${
    profData.avgRating
  }</span>
            <span class="rating-label">Overall Rating</span>
          </div>
          <div class="rating-box">
            <span class="rating-val">${profData.avgDifficulty}</span>
            <span class="rating-label">Difficulty</span>
          </div>
        </div>

        <div class="prof-stats">
          ${profData.wouldTakeAgainPercent.toFixed(0)}% would take again
        </div>

        <div class="prof-link-row">
          <a class="prof-rmp-link" target="_blank" href="${rmpUrl}">
            View ${profData.numRatings} rating${
    profData.numRatings === 1 ? "" : "s"
  } on RateMyProfessors
          </a>
        </div>
      </div>
    </div>
  `;
}

async function getReview(profName) {
  let profID = await fetchProfIDFromName(profName);
  let profReview = await fetchProfReviewFromID(profID);
  return profReview;
}
//FETCHING
async function fetchProfIDFromName(name) {
  try {
    let response = await sendMessage({
      contentScriptQuery: "queryProfID",
      profName: name,
    });
    const edges = response?.data?.newSearch?.teachers?.edges || [];
    const profID = edges[0]?.node?.id;
    if (!profID) {
      return null;
    }
    return profID;
  } catch (error) {
    return null;
  }
}

async function fetchProfReviewFromID(ID) {
  if (ID === null) {
    return null;
  }
  try {
    let response = await sendMessage({
      contentScriptQuery: "queryProfData",
      profID: ID,
    });
    let profData = response.data.node;
    return profData;
  } catch (error) {
    return null;
  }
}

function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (res) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(res);
    });
  });
}
