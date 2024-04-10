
// function waitForFirstLoad() {
// 	let tableTimer = setInterval(checkForTableInDOM, 50);

// 	function checkForTableInDOM() {
// 		if (document.getElementsByClassName("class-results").length > 0) {
// 			clearInterval(tableTimer);
// 			startObserver();
// 		}
// 	}
// }

// function log(message) {
// 	// console.log(`%cRMAP`, "color: #26bfa5;", message);
// }

// function startObserver() {
// 	log("Page fully loaded");
// 	// trigger first time
// 	onRenderHandler();

// 	// Set mutation observer on loading spinner to wait for table reload
// 	// TODO: Check for table on page load
// 	const observer = new MutationObserver((mutations) => {
// 		mutations.forEach((mutation) => {
// 			// check if a node is removed in this mutation
// 			if (mutation.removedNodes.length > 0) {
// 				// check if the removed node is the loading spinner
// 				if (
// 					mutation.removedNodes[0].className?.includes(
// 						"spinner-button"
// 					)
// 				) {
// 					log("Loading spinner removed");
// 					// wait for table to load
// 					setTimeout(() => {
// 						log("Table loaded");
// 						onRenderHandler();
// 					}, 100);
// 				}
// 			}
// 		});
// 	});

// 	const reactRootDOM = document.getElementById("root");

// 	observer.observe(reactRootDOM, { subtree: true, childList: true });
// }
document.body.style.backgroundColor = '#ccc';



function onRenderHandler() {
	// check if there is h1 tag with content "No classes found"
	if ($('span:contains("No matching classes were found.")').length > 0) {
		log("NONE");
		return;
	}
	log("FOUND");

	// Set up RMP column
	addRMPCol();

	// for each row, get each row, fetch data, append data
	processResultTable();
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
var classListForColumns = ["class", "course", "note", "sec/ses", "type", "core/code", "title", "startDate", "instruction", "day", "room", "status", "maxEnr", "waitlist","courseMat"];
addClassToElements(".results th", classListForColumns);

var classListBody = ["general","classTableInfo"]
addClassToElements("tbody" , classListBody)



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
addRMPCol();


function addClassToRows() {
    var rows = document.querySelectorAll('.classTableInfo tr');
    var classNames = Array.from({ length: rows.length }, (_, index) => 'class' + (index + 1));

    rows.forEach(function(row, index) {
        row.classList.add(classNames[index]);
    });
}

// Call the function
addClassToRows();

function addClassToBox(){
    var rows = document.querySelectorAll('.classTableInfo tr');

    rows.forEach(function(row) {
        var tds = row.querySelectorAll('td');
        tds.forEach(function(td, index) {
            td.classList.add('box' + (index + 1));
        });
    });
}
addClassToBox();


function addBox() {
    var rows = document.querySelectorAll('.classTableInfo tr');
    rows.forEach(function(row) {
        var tds = row.querySelectorAll('td');
        if (!row.querySelector('.rmpRes')) {
            let placeholderBox = $("<td>").addClass("rmpRes").text("loading");
            $(".box7").after(placeholderBox);
        }
    });
}

addBox();


//FETCHING
async function fetchProfIDFromName(name) {
	try {
		let response = await sendMessage({
			contentScriptQuery: "queryProfID",
			profName: name,
		});
		let profID = response.data.newSearch.teachers.edges[0].node.id;
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