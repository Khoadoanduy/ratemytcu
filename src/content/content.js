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
	var classListForColumns = ["class", "course", "note", "sec/ses", "type", "core/code", "title", "startDate", "instruction", "day", "room", "status", "maxEnr", "waitlist","courseMat"];
	addClassToElements(".results th", classListForColumns);

	var classListBody = ["general","classTableInfo"]
	addClassToElements("tbody" , classListBody)

	addRMPCol();
	addClassToRows();
	addClassToBox();
	addBox();
	processScore();
	// for each row, get each row, fetch data, append data
	
}




function addClassToElements(selector, classNames) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function(element, index) {
        if (classNames[index]) {
            element.classList.add(classNames[index]);
        }
    });
}

// Usage example with different class names for each th




function addRMPCol() {

	if ($("th .rmp").length == 0) {
		let placeholderHeader = $("<th>")
			.addClass("rmp")
			.text("RMP");
		$(".title").after(placeholderHeader);
	}

	// let tableRows = $(".course");
	// for (row of tableRows) {
	// 	$(row).css("grid-column-start", "1");
	// }
}



function addClassToRows() {
    var rows = document.querySelectorAll('.classTableInfo tr');
    var classNames = Array.from({ length: rows.length }, (_, index) => 'class' + (index + 1));

    rows.forEach(function(row, index) {
        row.classList.add(classNames[index]);
    });
}

// Call the function


function addClassToBox(){
    var rows = document.querySelectorAll('.classTableInfo tr');

    rows.forEach(function(row) {
        var tds = row.querySelectorAll('td');
        tds.forEach(function(td, index) {
            td.classList.add('box' + (index + 1));
        });
    });
}



function addBox() {
    var rows = document.querySelectorAll('.classTableInfo tr');
    rows.forEach(function(row) {
        var tds = row.querySelectorAll('td');
        if (!row.querySelector('.rmpRes')) {
            let placeholderBox = $("<td>").addClass("rmpRes").text("loading");
            $(row).find(".box7").after(placeholderBox);
        }
    });
}




function getProfessorNamesFromSearch() {
    var professorNames = [];
    var tableRows = document.querySelectorAll('table.results tbody tr');
    
    tableRows.forEach(function(row) {
        var courseInfoCell = row.querySelector('td.box7');
        if (courseInfoCell) {
            var courseInfoLines = courseInfoCell.innerHTML.trim().split('<br>');
            var courseInfo = courseInfoLines[courseInfoLines.length - 1]; // Taking the last line
            var reversed = courseInfo.split('').reverse().join('');
            if (reversed.substring(0, 5) === "ffatS") { 
                professorNames.push('Staff');
            } else {
                var parts = courseInfo.split(',');
                if (parts.length === 2) {
                    var names = parts[1].trim().split(' ');
                    var fullName = parts[0].trim() + ' ' + names[0];
                    var trimmed = fullName.trim().replace("</font>", "")
                    professorNames.push(trimmed);
                } else {
                    professorNames.push(parts[1]);
                }
            }
        }
    });
    
    return professorNames;
}


async function processScore() {
    var names = getProfessorNamesFromSearch();

    let profReviewPromises = names.map(async function (profName) {
        let review;
        if (profName === "Staff" && profName === undefined) {
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
        } 
		else {
			$(".rmpRes").eq(index).empty();
			if(profReview!==null){
				let HydratedProfScoreComp = ProfReviewComp(profReview);
            	$(".rmpRes").eq(index).append(HydratedProfScoreComp);	
			}
			else $(".rmpRes").eq(index).text("N/A");
            
        }
    }
}
function ProfReviewComp(profData, hasNext) {
	if (profData.numRatings === 0) {
		return `<a target="_blank" href="https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${profData.legacyId}">N/R</a>`;
	}
	let colorCode = "";
	if (profData.avgRating < 2.5) {
		colorCode = "#FF9C9C";
	} else if (profData.avgRating < 3.5) {
		colorCode = "#FFD700";
	} else {
		colorCode = "#03C03C";
	}

	if (hasNext) {
		addComma = ", ";
	} else {
		addComma = " ";
	}

	const divFormat = `
	<div class="prof-container">
	<a style="text-decoration: none;" target="_blank" href="https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${
		profData.legacyId
	}">
	<div>
          <span class="prof-anchor" style="color:${colorCode}; font-size:1.5em; font-weight: bold;">${
		profData.avgRating
	}</span><span style="color:black;">${addComma}</span>
    </div>
	</a>
	<div class="prof-info" >
	<div class="prof-namebox">${
		profData.name
	} <span style="color:${colorCode}; font-weight: bold;">${
		profData.avgRating
	}</span>/5</div>
	<div>${profData.avgDifficulty} difficulty</div>
	<div>${profData.wouldTakeAgainPercent.toFixed(0)}% would take again</div>
	<div>${profData.numRatings} rating(s)</div>
	</div>
	</div>
  `;

	return divFormat;
}
async function getReview(profName) {
	let profID = await fetchProfIDFromName(profName);
	// console.log(profID);
	let profReview = await fetchProfReviewFromID(profID);
	// console.log(profReview);
	return profReview;
}
//FETCHING
async function fetchProfIDFromName(name) {
	try {
		let response = await sendMessage({
			contentScriptQuery: "queryProfID",
			profName: name,
		});
		const profID = response.data.newSearch.teachers.edges[0].node.id;
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
	return new Promise((resolve, _) => {
		chrome.runtime.sendMessage(message, (res) => {
			resolve(res);
		});
	});
}
