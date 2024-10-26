const table = document.querySelector('table');

const tableRows = table.querySelectorAll('tr');
const tableRowsArray = Array.from(tableRows);

const tableHeaders = table.querySelectorAll('th');
const tableHeadersArray = Array.from(tableHeaders);

tableRowsArray.forEach(row => {

    for (let i = 0; i < tableHeadersArray.length; i++) {
        const td = document.createElement('td');
        if (row != tableRowsArray[0]) {
            row.appendChild(td);
        }
    }

    const cols = row.querySelectorAll('td');
    const colsArray = Array.from(cols);

    colsArray.forEach(col => {
        const colIndex = colsArray.indexOf(col);
        if(colIndex != 0) {
            col.innerText = `${colsArray.indexOf(col)}.${tableRowsArray.indexOf(row)}`;
        } else {
            col.innerText = tableRowsArray.indexOf(row);
        }
    })
});