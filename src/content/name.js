const { queryProfessorData } = require('../background');
function getProfessorNames() {
    var professorNames = [];
    var tableRows = document.querySelectorAll('table.results tbody tr');
    
    tableRows.forEach(function(row) {
        var courseInfoCell = row.querySelectorAll('td:nth-child(7)')[0];
        if (courseInfoCell) {
            var courseInfo = courseInfoCell.textContent.trim();
            console.log(courseInfo);
            var reversed = courseInfo.split('').reverse().join('');
            console.log(reversed);
            if( reversed.substring(0,5) === "ffatS"){ 
                professorNames.push('Staff');
            }
            else{
                professorNames.push(courseInfo.split(',')[1]);
            }
            // console.log(reversed)
            // // var professorName = courseInfo.split(',')[1];
            // professorNames.push(reversed);
        }
    });
    
    return professorNames;
}

// Example usage:
var names = getProfessorNames();
console.log(names);



for(const profName of names){
    queryProfessorData(profName)
    .then((result) => {
        console.log(result.data.node.legacyId);
    })
    .catch((error) => {
        console.error("An error occurred:", error.message);
    });
}
