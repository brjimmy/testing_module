document.addEventListener("DOMContentLoaded", function() {
    const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1C4w0y7DJBe3mE8Ejys5M1QJ0BlfOrz8D2iJjctj9Ot4/gviz/tq?tqx=out:csv';

    // Fetch the CSV data from Google Sheets
    fetch(googleSheetUrl)
        .then(response => response.text())
        .then(csvData => {
            console.log("Fetched CSV Data:", csvData);  // Log the raw CSV data to console

            // Now parse the CSV data into rows and columns
            const rows = csvData.split("\n");  // Split into rows by new lines

            // Assuming we want to divide rows across multiple tables
            let tableIndex = 1;  // Start with table 1
            const rowsPerTable = 3;  // Set how many rows should go into each table

            rows.forEach((row, index) => {
                const cells = row.split(",");  // Split each row into columns

                // Skip the first row if it's the header, otherwise populate the current table
                if (index > 0 && cells.length === 3) {  // Assuming 3 columns
                    // Determine which table to populate based on row index
                    const currentTableId = `table${tableIndex}`;
                    populateTableRow(currentTableId, cells);

                    // Move to the next table after a certain number of rows
                    if ((index % rowsPerTable) === 0) {
                        tableIndex++;
                    }
                }
            });
        })
        .catch(error => {
            console.error("Error fetching Google Sheet:", error);
            document.getElementById('uploadStatus').innerText = "Error loading data.";
        });

    // Function to populate table rows dynamically
    function populateTableRow(tableId, rowData) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        const row = document.createElement('tr');  // Create a new row
        rowData.forEach(cellData => {
            const cell = document.createElement('td');  // Create a new cell
            cell.textContent = cellData.replace(/"/g, "");  // Remove any extra quotes
            row.appendChild(cell);  // Append cell to row
        });
        tableBody.appendChild(row);  // Append row to the table body
    }
});
