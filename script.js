document.addEventListener("DOMContentLoaded", function() {
    const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1C4w0y7DJBe3mE8Ejys5M1QJ0BlfOrz8D2iJjctj9Ot4/gviz/tq?tqx=out:csv';

    // Fetch the CSV data from Google Sheets
    fetch(googleSheetUrl)
        .then(response => response.text())
        .then(csvData => {
            console.log("Fetched CSV Data:", csvData);  // Log the raw CSV data to console

            // Now parse the CSV data into rows and columns
            const rows = csvData.split("\n");  // Split into rows by new lines

            // Define how many rows go into each table
            const table1Rows = rows.slice(1, 4); // Rows 1 to 3 go to table1
            const table2Rows = rows.slice(4, 7); // Rows 4 to 6 go to table2
            const table3Rows = rows.slice(7, 10); // Rows 7 to 9 go to table3

            // Populate Table 1
            table1Rows.forEach(row => {
                const cells = row.split(","); // Split into columns
                populateTableRow('table1', cells); // Populate Table 1
            });

            // Populate Table 2
            table2Rows.forEach(row => {
                const cells = row.split(","); // Split into columns
                populateTableRow('table2', cells); // Populate Table 2
            });

            // Populate Table 3
            table3Rows.forEach(row => {
                const cells = row.split(","); // Split into columns
                populateTableRow('table3', cells); // Populate Table 3
            });

            // Add more tables similarly if needed
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
