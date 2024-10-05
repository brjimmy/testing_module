document.addEventListener("DOMContentLoaded", function() {
    const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1C4w0y7DJBe3mE8Ejys5M1QJ0BlfOrz8D2iJjctj9Ot4/gviz/tq?tqx=out:csv';

    // Fetch the CSV data from Google Sheets
    fetch(googleSheetUrl)
        .then(response => response.text())
        .then(csvData => {
            // Here, parse the CSV data and populate the tables
            console.log(csvData); // For now, log the CSV data to the console
            const rows = csvData.split("\n");  // Split CSV rows
            rows.forEach((row, index) => {
                const cells = row.split(",");  // Split cells by comma
                // Populate your HTML table as per your structure
                if (index > 0 && cells.length === 3) { // Skip the header row, assuming 3 columns
                    populateTableRow('table1', cells); // Assuming you are filling 'table1', adjust as needed
                }
            });
        })
        .catch(error => {
            console.error("Error fetching Google Sheet:", error);
        });

    // Function to populate a specific table row
    function populateTableRow(tableId, rowData) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        const row = document.createElement('tr');
        rowData.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    }
});



