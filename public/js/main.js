// globals
let grid = document.getElementById('test');


function main() {
    loadJokes();
}
main();

function loadJokes() {
// dropped /
    window.location.href = "https://dumbjokeservice.herokuapp.com"; 
    
    let url = window.location.href + 'api/jokes';

    fetch(url)
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data);
        buildTable(data);
    })
    .catch(error => console.log(error));
}

function buildTable(data) {
    for (let i = 0; i < data.length; i++) {
        let row = createElement('div');
        row.classList.add('grid-row');
        row.dataset.row = i;
        let rowRecords = data[i];
        grid.appendChild(row);
        for (let key in rowRecords) {
            let gridCell = createElement('div');
            gridCell.classList.add('grid-column');
            gridCell.innerHTML = rowRecords[key];
            gridCell.dataset.row = i;
            gridCell.dataset.column = key;
            row.appendChild(gridCell);
            if (rowRecords[key] === 0) {
                gridCell.classList.add('delete-column');
                gridCell.innerHTML = 'X';
                gridCell.dataset.row = i;
                gridCell.dataset.column = key;
                row.appendChild(gridCell);
            }
        }
    }

    addClickEvent();
}
function createElement(element) {
    return document.createElement(element);
}