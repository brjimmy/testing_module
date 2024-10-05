document.addEventListener("DOMContentLoaded", function() {
    const excelFileUrl = './tables_data.xlsx'; // Relative path to the Excel file in the same directory

    // Automatically fetch the Excel file when the page loads
    fetch(excelFileUrl)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });

            // Assuming the tables are in sheets Table1 to Table5
            for (let tableNum = 1; tableNum <= 5; tableNum++) {
                const worksheet = workbook.Sheets[`Table${tableNum}`];
                if (worksheet) {
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    populateTable(jsonData, `table${tableNum}`);
                }
            }
            document.getElementById('uploadStatus').textContent = "Tables updated successfully!";
        })
        .catch(error => {
            document.getElementById('uploadStatus').textContent = "Error loading Excel file!";
            console.error("Error fetching Excel file:", error);
        });

    // Function to populate the table with the parsed Excel data
    function populateTable(data, tableId) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        tableBody.innerHTML = "";  // Clear existing table content
        data.forEach(rowData => {
            const row = document.createElement('tr');
            rowData.forEach(cellData => {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
    }
});
