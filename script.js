document.addEventListener("DOMContentLoaded", function() {
    const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1C4w0y7DJBe3mE8Ejys5M1QJ0BlfOrz8D2iJjctj9Ot4/gviz/tq?tqx=out:csv';

    // Fetch the CSV data from Google Sheets
    fetch(googleSheetUrl)
        .then(response => response.text())
        .then(csvData => {
            console.log("Fetched CSV Data:", csvData);  // Log the raw CSV data to console

            // Temporary: Display fetched CSV data on the page for debugging
            document.getElementById('uploadStatus').innerText = csvData;

            // For now, just split rows and log to check the structure
            const rows = csvData.split("\n"); 
            rows.forEach((row, index) => {
                console.log("Row", index, row);  // Log each row to inspect its contents
            });
        })
        .catch(error => {
            console.error("Error fetching Google Sheet:", error);
            document.getElementById('uploadStatus').innerText = "Error loading data.";
        });
});
